/**
 * Vite config.
 *
 * @description Vite config.
 * @see https://vitejs.dev/guide
 */
import { defineConfig } from 'vite'
import dts              from 'vite-plugin-dts'
import devServer        from '@hono/vite-dev-server'
import { target }       from '@backan/config/consts'

export const port = 13125

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
				'src/main.ts',
				'src/stream.ts',
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
		devServer( {
			entry : 'examples/app.ts', // The file path of your application.
		} ),
	],
} )
