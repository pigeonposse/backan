import { App } from '../src/main'

const id    = 'delete'
const route = new App( )

route.add(
	{
		method    : 'delete',
		path      : '/:id',
		summary   : 'Delete resource by ID',
		request   : { params: route.validation.object( { id: route.validation.string() } ) },
		responses : {
			200 : route.response.responseJSONSuccess(
				route.validation.object( {
					deleted : route.validation.boolean(),
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

			console.log( `Deleting resource with ID: ${id}` )

			// Simulate deletion
			return route.response.addSuccessResponse( c, {
				deleted : true,
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
