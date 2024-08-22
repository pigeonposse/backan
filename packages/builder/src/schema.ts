import type { App }                 from '@backan/core'
import { writeFile }                from './utils'
import type { BuilderSchemaParams } from './types'

/**
 * Builds the OpenAPI schema and saves it to a file from the Backan app.
 *
 * @param   {BuilderSchemaParams} props        - The properties needed to build and save the schema.
 * @param   {App}                 props.app    - The instance of the application used to get the OpenAPI object.
 * @param   {string}              props.output - The path to the file where the JSON schema will be saved.
 * @returns {Promise<void>}                    - A promise that resolves when the file writing operation completes.
 * @throws {Error} Throws an error if there is a problem during the file writing operation.
 * @see https://backan.pigeonposse.com/guide/builder/
 */
export const buildSchema = async ( { app, output }: BuilderSchemaParams ) => {

	try{

		output = output.endsWith( '.json' ) ? output : output + '.json'
		await writeFile(
			output,
			JSON.stringify( app.getOpenApiObject(), null, 2 ),
		)
		
	}catch( e ){

		console.error( {
			message : 'Error on build schema',
			data    : e,
		} )
		throw e
	
	}

}
