import type { App }                 from '@backan/core'
import { writeFile }                from './utils'
import type { BuilderSchemaParams } from './types'
import type { OpenAPI3 }            from 'openapi-typescript'
import openapiTS, { astToString }   from 'openapi-typescript'

/**
 * Builds the OpenAPI schema and saves it to a file from the Backan app.
 *
 * @param   {BuilderSchemaParams} props        - The properties needed to build and save the schema.
 * @param   {App}                 props.app    - The instance of the application used to get the OpenAPI object.
 * @param   {string}              props.output - The path to the file where the schema will be saved.
 * @param   {boolean}             props.dts    - Generate dts file. Default: true.
 * @returns {Promise<void>}                    - A promise that resolves when the file writing operation completes.
 * @throws {Error} Throws an error if there is a problem during the file writing operation.
 * @see https://backan.pigeonposse.com/guide/builder/
 */
export const buildSchema = async <Env extends object> ( { app, output, dts = true }: BuilderSchemaParams<Env> ) => {

	try{

		// json schema
		const jsonOutput = output.endsWith( '.json' ) ? output : output + '.json'
		const openApi    = app.getOpenApiObject()
		await writeFile(
			jsonOutput,
			JSON.stringify( openApi, null, 2 ),
		)

		if( dts === false ) return

		// type schema
		const dtsOutput = output.endsWith( '.json' ) ? output.replace( '.json', '.d.ts' ) : output + '.d.ts'
		const ast       = await openapiTS( openApi as OpenAPI3 )
		const contents  = astToString( ast )

		await writeFile(
			dtsOutput,
			contents,
		)
	
	}catch( e ){

		console.error( {
			message : 'Error on build schema',
			data    : e,
		} )

		throw e
	
	}

}

