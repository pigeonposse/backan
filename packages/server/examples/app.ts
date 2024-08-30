
import {
	Route, 
	App, 
} from '@backan/core'

import { bugs }    from '../../../package.json'
import { version } from '../package.json'

type AppEnv = {DB: object}
const app = new App<AppEnv>( {
	version,
	title       : 'BACKAN Example app',
	description : 'API documentation for BACKAN Example',
	cors        : {
		origin       : '*',
		allowMethods : [
			'GET', 
		],
	},
	docs : {
		path   : '/docs',
		active : true,
	},
	health : {
		path   : '/health',
		active : true,
		opts   : {
			additionalResponseValues : {
				customValue : true,
			},
		},
	}, 
	contact : bugs,
} )

const id                                = 'random'
const healthRoute                       = new Route<AppEnv, typeof id>( {
	path : id,
} )
healthRoute.RESPONSE_MESSAGES.ERROR_400 = 'Error getting random data'
healthRoute.add( 
	{
		method    : 'get',
		path      : '/',
		summary   : 'Test route with response json',
		responses : {
			200 : healthRoute.response.responseJSONSuccess( healthRoute.validation.object( {
				fact : healthRoute.validation.string(),
			} ) ),
			400 : healthRoute.response.responseJSONError400,
			500 : healthRoute.response.responseJSONError500,
		},
		tags : [
			id,
		],
	},
	async c => {

		try {

			const getRandomFact = async () => {

				try {

					const response = await fetch( 'https://uselessfacts.jsph.pl/random.json?language=en' )
	
					if ( !response.ok ) throw new Error( 'Network response was not ok' )
			
					const data = await response.json()
					return data.text
				
				} catch ( error ) {

					console.error( 'Error fetching the random fact:', error )
					return 'Could not fetch a random fact at this time.'
				
				}
			
			}
			return healthRoute.response.addSuccessResponse( c, {
				fact : await getRandomFact(),
			} ) 
	
		} catch ( e ) {

			return healthRoute.response.add500Error( c, e )
	
		}

	}, 
)

app.addRoute( healthRoute )

export default app
