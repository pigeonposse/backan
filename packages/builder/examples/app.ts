import { App }         from '@backan/core'
import { route }       from './route'
import type { AppEnv } from './env'

const app = new App<AppEnv>( {
	version     : '1.0.0',
	title       : 'BACKAN Example app',
	description : 'API documentation for BACKAN Example',
} )
app.addRoute( route )

export { app }
