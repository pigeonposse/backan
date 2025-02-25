/**
 * Vite config.
 * @description Vite config.
 * @see https://vitejs.dev/guide
 */
import { target }       from '@backan/config/consts'
import devServer        from '@hono/vite-dev-server'
import { defineConfig } from 'vite'
import dts              from 'vite-plugin-dts'

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
	preview : { port },
	build   : {
		ssr : true,
		target,
		lib : {
			entry   : [ 'src/main.ts', 'src/utils.ts' ],
			formats : [ 'es' ],
		},
	},
	// @ts-ignore
	plugins : [ dts( { rollupTypes: true } ), devServer( { entry: 'examples/app.ts' } ) ],
} )
