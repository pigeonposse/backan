/**
 * Vite config.
 *
 * @description Vite config.
 * @see https://vitejs.dev/guide
 */

import { defineConfig } from 'vite'
import dts              from 'vite-plugin-dts'
import devServer        from '@hono/vite-dev-server'

const target = 'node20'
export const port = 1312

export default defineConfig( {
	esbuild : { 
		platform : 'node',
		target,
	},
	server : {
		host : '0.0.0.0', 
		port,
	},
	preview : {
		port,
	},
	build : {
		ssr : true,
		target,
		lib : {
			entry : [
				'src/app', // build app only
				'src/server', // build server
			],  
			formats : [
				'es', 
			],
		},
	},
	plugins : [ 
		dts( {
			rollupTypes : true,
		} ),
		devServer({
			entry: 'src/app', // The file path of your application.
		}),
	],
} )
