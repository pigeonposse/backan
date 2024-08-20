import { App }    from '@backan/core'
import { server } from '../../server/dist/main.js'

const app = new App( {
	version     : '1.0.0',
	title       : 'BACKAN Example app',
	description : 'API documentation for BACKAN Example',
	port        : 1312,
} )
server( {
	fetch : app.fetch,
	port  : app.port,
} )
