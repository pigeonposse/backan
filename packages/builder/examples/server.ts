import { App }    from '@backan/core'
import { server } from '@backan/server'

export const app = new App( {
	version     : '1.0.0',
	title       : 'BACKAN Example app',
	description : 'API documentation for BACKAN Example',
} )

server( {
	app,
	port : 1312,
} )
