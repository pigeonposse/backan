/**
 * Backan server.
 *
 * @description Vite config.
 * @see https://backan.pigeonposse.com/guide/server
 */

import { App } from '@backan/core'

import {
	version, 
	name, 
} from '../package.json'
import { port } from '../vite.config'

const app = new App( {
	version,
	title       : name,
	description : `${name} API documentation`,
	port,
} )

export { app }
