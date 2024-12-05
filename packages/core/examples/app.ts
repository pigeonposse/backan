
// import { Route } from '../src/lib/route'
// import { App }   from '../src/lib/app'
import { bugs }    from '../../../package.json'
import { version } from '../package.json'
import {
	Route,
	App,
} from '../src/main'

const app = new App( {
	version,
	title       : 'BACKAN Example app',
	description : 'API documentation for BACKAN Example',
	cors        : {
		origin       : '*',
		allowMethods : [ 'GET' ],
	},
	docs : {
		path   : '/docs',
		active : true,
	},
	health : {
		path   : '/health',
		active : true,
		opts   : { additionalResponseValues: { customValue: false } },
	},
	contact : bugs,
} )

const id    = 'random'
const route = new Route( { path: id } )

route.RESPONSE_MESSAGES.ERROR_400 = 'Error getting random data'

route.add(
	{
		method    : 'get',
		path      : '/',
		summary   : 'Test route with response json',
		responses : {
			200 : route.response.responseJSONSuccess( route.validation.object( { fact: route.validation.string() } ) ),
			400 : route.response.responseJSONError400,
			500 : route.response.responseJSONError500,
		},
		tags : [ id ],
	},
	async c => {

		try {

			const getRandomFact = async () => {

				try {

					const response = await fetch( 'https://uselessfacts.jsph.pl/random.json?language=en' )

					if ( !response.ok ) throw new Error( 'Network response was not ok' )

					const data = await response.json()
					return data.text

				}
				catch ( error ) {

					console.error( 'Error fetching the random fact:', error )
					return 'Could not fetch a random fact at this time.'

				}

			}
			return route.response.addSuccessResponse( c, { fact: await getRandomFact() } )

		}
		catch ( e ) {

			return route.response.add500Error( c, e )

		}

	},
)

const childRoute                       = new Route( { path: 'child' } )
childRoute.RESPONSE_MESSAGES.ERROR_400 = 'Error getting child data'

childRoute.add(
	{
		method    : 'get',
		path      : '/',
		summary   : 'Test route with JSON response',
		request   : { query: route.validation.object( { value: route.validation.string( ) } ) },
		responses : {
			200 : route.response.responseJSONSuccess( route.validation.object( { child: route.validation.literal( true ) } ) ),
			400 : route.response.responseJSONError400,
			500 : route.response.responseJSONError500,
		},
		tags : [ id ],
	},
	async c => {

		try {

			return route.response.addSuccessResponse( c, { child: true as const } )

		}
		catch ( e ) {

			return route.response.add500Error( c, e )

		}

	},
)

route.addRoute( childRoute )

app.addRoute( route )

export default app
