// Create `PATCH` endpoint

import { App } from '../src/main'

const id    = 'patch'
const route = new App( )

const {
	validation: v,
	response,
} = route

route.add(
	{
		method  : 'patch',
		path    : '/:id',
		summary : 'Update partial resource by ID',
		request : {
			params : v.object( { id: v.string() } ),
			body   : { content : { 'application/json' : { schema : v.object( {
				name  : v.string().optional(),
				value : v.number().optional(),
			} ) } } },
		},
		responses : {
			200 : response.responseJSONSuccess(
				v.object( {
					updated       : v.boolean(),
					id            : v.string(),
					updatedFields : v.array( v.string() ), // List of updated fields
				} ),
			),
			400 : response.responseJSONError400,
			404 : response.responseJSONError404,
			500 : response.responseJSONError500,
		},
		tags : [ id ],
	},
	async c => {

		try {

			const { id }  = c.req.valid( 'param' )
			const updates = c.req.valid( 'json' )

			console.log( `Updating resource ${id} with updates:`, updates )

			const updatedFields = Object.keys( updates )

			// Simulate partial update success
			return response.addSuccessResponse( c, {
				updated : true,
				id,
				updatedFields,
			} )

		}
		catch ( e ) {

			// Uncomment if needed
			// if (e instanceof SomeValidationError) {
			//   return response.add400Error(c, e);
			// }

			return response.add500Error( c, e )

		}

	},
)

export default route
