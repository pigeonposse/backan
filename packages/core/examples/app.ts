
import { bugs }    from '../../../package.json'
import { version } from '../package.json'
import deleteRoute from './delete'
import getRoute    from './get'
import patchRoute  from './patch'
import postRoute   from './post'
import putRoute    from './put'
import streamRoute from './stream'
import { App }     from '../src/main'

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
	contact       : bugs,
	trailingSlash : 'trim',

} )

app.route( 'get', getRoute )
app.route( 'post', postRoute )
app.route( 'stream', streamRoute )
app.route( 'delete', deleteRoute )
app.route( 'put', putRoute )
app.route( 'patch', patchRoute )

export default app
