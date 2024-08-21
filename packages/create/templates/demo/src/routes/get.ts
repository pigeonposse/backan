/**
 * Backan Route: [get-example].
 *
 * @see https://backan.pigeonposse.com/guide/core/route/get
 */

import { Route }         from 'backan'
import { getRandomFact } from './_utils'

const id    = 'get-example'
const route = new Route( {
	path : id,
} )

route.add( 
	{
		method  : 'get',
		path    : '/',
		summary : 'Get random facts from [uselessfacts] api',
		request : {
			query : route.validation.object( {
				lang : route.validation.union([
					route.validation.literal( 'en' ),
					route.validation.literal( 'de' ),
				])
					.optional()
					.default( 'en' )
					.describe( 'Select language: en | de' ),
			} ),
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

			const { lang } = c.req.valid( 'query' )

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
