import { Route } from '../src/main'

const id    = 'update'
const route = new Route( { path: id } )

route.RESPONSE_MESSAGES.ERROR_400 = 'Error processing request'
route.RESPONSE_MESSAGES.ERROR_404 = 'Resource not found'

// PUT Route - Update Data
route.add(
	{
		method  : 'put',
		path    : '/:id',
		summary : 'Update resource by ID',
		request : {
			params : route.validation.object( { id: route.validation.string() } ),
			body   : { content : { 'application/json' : { schema : route.validation.object( {
				name  : route.validation.string(),
				value : route.validation.number(),
			} ) } } },
		},
		responses : {
			200 : route.response.responseJSONSuccess(
				route.validation.object( {
					updated : route.validation.boolean(),
					id      : route.validation.string(),
				} ),
			),
			400 : route.response.responseJSONError400,
			404 : route.response.responseJSONError404,
			500 : route.response.responseJSONError500,
		},
		tags : [ id ],
	},
	async c => {

		try {

			const { id } = c.req.valid( 'param' )
			const {
				name, value,
			} = c.req.valid( 'json' )

			console.log( `Updating resource ${id} with name: ${name} and value: ${value}` )

			// Simulate success
			return route.response.addSuccessResponse( c, {
				updated : true,
				id,
			} )

		}
		catch ( e ) {

			// if ( e instanceof SomeValidationError ) {

			// 	return route.response.add400Error( c, e )

			// }

			return route.response.add500Error( c, e )

		}

	},
)

export default route
