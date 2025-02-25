
import { Route }  from 'backan'
import { stream } from 'backan/utils'

const id    = 'loop'
const route = new Route( { path: id } )
const {
	validation: v, response,
} = route
route.add(
	{
		method    : 'post',
		path      : '/',
		request   : { body: { content: { 'application/json': { schema: v.object( { loop: v.number() } ) } } } },
		responses : {
			200 : response.responseStreamSuccess( v.string() ),
			400 : response.responseJSONError400,
			500 : response.responseJSONError500,
		},
		tags : [ id ],
	},
	// @ts-ignore
	async c => {

		try {

			const json = c.req.valid( 'json' )

			return await stream(
				c,
				async stream => {

					const write = async ( data: string, success = true ) => {

						await stream.writeln(
							JSON.stringify( {
								success,
								data,
							} ),
						)

					}

					stream.onAbort( async () =>
						await write( 'aborted', false ),
					)

					for ( let i = 0; i < json.loop; i++ ) {

						await write( i.toString() )

					}

					await stream.close()

				},
				async ( e, stream ) => {

					await stream.writeln(
						JSON.stringify( response.add400ErrorObject( e ) ),
					)

				},
			)

		}
		catch ( e ) {

			return response.add400Error( c, e )

		}

	},
)

export default route
