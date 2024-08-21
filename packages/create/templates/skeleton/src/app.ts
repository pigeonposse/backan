/**
 * Backan server.
 *
 * @description Vite config.
 * @see https://backan.pigeonposse.com/guide/server
 */

import { App } from '@backan/core'

import getRoute    from './routes/get'
import postRoute   from './routes/post'
import streamRoute from './routes/stream'

import {
	version, 
	name, 
} from '../package.json'
import { port } from '../vite.config.mjs'

const app = new App( {
	version,
	title       : name,
	description : `${name} API documentation`,
	port,
} )

app.addRoute( getRoute )
app.addRoute( postRoute )
app.addRoute( streamRoute )

export default app
