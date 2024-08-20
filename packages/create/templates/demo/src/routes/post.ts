/**
 * Backan Route: [post-example].
 *
 * @see https://backan.pigeonposse.com/guide/core/route/post
 */

import { Route }         from '@backan/core'
import { getRandomFact } from './_utils'

const id    = 'post-example'
const route = new Route( {
	path : id,
} )

route.add( 
	{
		method  : 'post',
		path    : '/',
		summary : 'Get random facts from [uselessfacts] api with post request',
		request : {
			body : {
				content : {
					'application/json' : {
						schema : route.validate.object( {
							lang : route.validate.union(
								route.validate.literal( 'en' ),
								route.validate.literal( 'de' ),
							)
								.optional()
								.default( 'en' )
								.describe( 'Select language: en | de' ),
						} ),
					},
				},
			},
		},
		responses : {
			200 : route.response.responseJSONSuccess( route.validation.object( {
				fact : route.validation.string(),
			} ) ),
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
			
			const fact = await getRandomFact( lang )

			return route.response.addSuccessResponse( c, {
				fact,
			} ) 
	
		} catch ( e ) {

			return route.response.add500Error( c, e )
	
		}

	}, 
)

export default route
