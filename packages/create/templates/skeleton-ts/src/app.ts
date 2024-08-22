/**
 * Backan server.
 *
 * @description Vite config.
 * @see https://backan.pigeonposse.com/guide/server
 */

import { App } from 'backan'

import {
	version, 
	name, 
} from '../package.json'

const app = new App( {
	version,
	title       : name,
	description : `${name} API documentation`,
} )

export default app
