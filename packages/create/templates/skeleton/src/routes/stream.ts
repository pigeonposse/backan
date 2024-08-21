/**
 * Backan Route: [stream-example].
 *
 * @see https://backan.pigeonposse.com/guide/core/route/stream
 */

import { Route }  from '@backan/core'
import { stream } from '@backan/core/stream'

import { getRandomFact } from './_utils'
const id    = 'stream-example'
const route = new Route( {
	path : id,
} )

route.add( 
	{
		method  : 'post',
		path    : '/',
		summary : 'Stream random facts from [uselessfacts] api',
		request : {
			body : {
				content : {
					'application/json' : {
						schema : route.validation.object( {
							lang : route.validation.union([
								route.validation.literal( 'en' ),
								route.validation.literal( 'de' ),
							])
								.optional()
								.default( 'en' )
								.describe( 'Select language: en | de' ),
						} ),
					},
				},
			},
		},
		responses : {
			200 : route.response.responseStreamSuccess( route.validation.string() ),
			400 : route.response.responseJSONError400,
			500 : route.response.responseJSONError500,
		},
		tags : [
			id,
		],
	},
	async c => {

		try {

			const { lang } = c.req.valid( 'json' )
			const fact     = await getRandomFact( lang )

			return await stream( c, async stream => {

				const write = async ( data: string | object, success:boolean = true ) =>{

					await stream.writeln( JSON.stringify( {
						success, 
						data,
					} ) )
				
				}

				stream.onAbort( async () => await write( 'aborted', false ) )

				const words = fact.split( ' ' )

				for ( const word of words ) {

					await write( word )
				
				}
	
				await stream.close()
			
			},
			async ( e, stream ) => {

				await stream.writeln( JSON.stringify( route.response.add400ErrorObject( e ) ) )

			} )
	
		} catch ( e ) {

			return route.response.add500Error( c, e )
	
		}

	}, 
)

export default route
