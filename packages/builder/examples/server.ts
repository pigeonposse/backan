import { App }    from '@backan/core'
import { server } from '../../server/dist/main.js'

export const app = new App( {
	version     : '1.0.0',
	title       : 'BACKAN Example app',
	description : 'API documentation for BACKAN Example',
} )

server( {
	app,
	port : 1312,
} )
