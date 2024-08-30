import { App } from '@backan/core'

type AppEnv = {DB: object}
export const app = new App<AppEnv>( {
	version     : '1.0.0',
	title       : 'BACKAN Example app',
	description : 'API documentation for BACKAN Example',
} )
