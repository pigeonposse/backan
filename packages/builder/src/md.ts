import { buildSchema } from './schema'
import {
	exec,
	getDirname,
	joinPath,
	removePathIfExist,
} from './utils'

import type { BuilderMDParams } from './types'
import type { App }             from '@backan/core'

/**
 * Builds a Markdown file from Backan app.
 * @param   {object}        params        - The parameters for building the Markdown file.
 * @param   {App<object>}   params.app    - The instance of the Backan application used to generate the OpenAPI schema.
 * @param   {string}        params.output - The path where the resulting Markdown file will be saved.
 * @returns {Promise<void>}               - A promise that resolves when the Markdown file is successfully built.
 * @throws {Error} Throws an error if any of the operations fail, including schema generation, file execution, or file removal.
 * @see https://backan.pigeonposse.com/guide/builder/
 */
export const buildMD = async <Env extends object>( {
	app, output,
}: BuilderMDParams<Env> ) => {

	try {

		output             = output.endsWith( '.md' ) ? output : output + '.md'
		const outputDir    = getDirname( output )
		const outputSchema = joinPath( outputDir, 'schema.json' )

		const binPath = joinPath(
			new URL( '.', import.meta.url ).pathname,
			'..',
			'node_modules',
			'.bin',
			'openapi-to-md',
		)

		await buildSchema( {
			app,
			output : outputSchema,
		} )

		await exec( `${binPath} ${outputSchema} ${output}` )
		await removePathIfExist( outputSchema )

	}
	catch ( e ) {

		throw new Error( `Markdown build failed: ${e instanceof Error ? e.message : 'Unknown error'}` )

	}

}
