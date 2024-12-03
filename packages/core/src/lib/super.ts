import { OpenAPIHono } from '@hono/zod-openapi'

import {
	ERROR_ID,
	RESPONSE_MESSAGES,
} from './const'
import * as response from './response'
import { validate }  from './validate'

import type { Route }   from './route'
import type { Context } from 'hono'

export class AppSuper<Env extends object> {

	constructor() {}

	/**
	 * Validation option works with zod library.
	 * @see https://zod.dev/
	 * @example const stringSchema = validation.string()
	 */
	validation = validate

	RESPONSE_MESSAGES = RESPONSE_MESSAGES

	/**
	 * Predefined error IDs used for consistent error identification in responses.
	 * These are used throughout the application to ensure uniform error handling.
	 *
	 */
	ERROR_ID = ERROR_ID

	/**
	 * Contains methods to generate and handle responses, including error handling.
	 *
	 * This object allows adding success responses, 500 errors, and 400 errors with predefined structures.
	 */
	response = {
		...response,
		addSuccessResponse : response.addSuccessResponse,
		add500ErrorObject  : response.add500ErrorObject,
		add500Error        : ( c: Context, e: unknown ) => {

			const data = {
				id    : this.ERROR_ID.SERVER_FETCH,
				error : e,
			}
			this.logger( JSON.stringify( response.add500ErrorObject( data ) ) )
			return response.add500Error( c, data )

		},
		add400ErrorObject : ( e: unknown ) => {

			return response.add400ErrorObject( {
				id      : e && typeof e == 'object' && 'message' in e ? e.message as string : this.ERROR_ID.BAD_REQUEST,
				message : this.RESPONSE_MESSAGES.ERROR_400,
				error   : e,
			} )

		},
		add400Error : ( c: Context, e: unknown ) => {

			const res =  this.response.add400ErrorObject( e )
			// console.log( res )
			this.logger( JSON.stringify( res ) )
			return response.add400Error( c, res )

		},
	}

	protected app = new OpenAPIHono<Env>( { defaultHook : ( res, c ) => {

		if ( !res.success )
			return this.response.add400Error( c, {
				id      : this.ERROR_ID.VALIDATION,
				message : this.RESPONSE_MESSAGES.ERROR_400,
				error   : res.error.issues,
			} )

		return res

	} } )

	/**
	 * Logs a string of data, determining if it's JSON and formatting accordingly.
	 * This method can be overridden to customize how logging is handled within the application.
	 * By default, it logs data to the console, parsing JSON strings if necessary.
	 * @param {string} data - The string to log. If it's JSON, it will be parsed and logged as an object.
	 * @example
	 *
	 * // Customizing logger
	 * app.logger = (data: string) => {
	 *   // Custom logging logic, e.g., writing to a file
	 *   fs.appendFileSync('app.log', data + '\n');
	 * };
	 */
	logger = ( data: string ) => {

		const isJsonString = ( str: string ) => {

			try {

				JSON.parse( str )
				return true

			}
			catch ( _e ) {

				return false

			}

		}

		const isJSON    = isJsonString( data )
		const timestamp = new Date().toISOString()

		console.log( isJSON
			? {
				...JSON.parse( data ),
				time : timestamp,
			}
			: data )

	}

	/**
	 * Adds a route to the BACKAN application instance.
	 * @param {Route} route - The route to add, containing the path and the associated app.
	 * @example
	 */
	addRoute<R extends Route<Env, string>>( route: R ) {

		this.app.route( route.path, route.app )

	}

	// eslint-disable-next-line jsdoc/require-param
	/**
	 * Registers an OpenAPI component within the app's OpenAPI registry.
	 * @returns {void}
	 */
	addComponent<T extends Parameters<typeof this.app.openAPIRegistry.registerComponent>[0]>(
		type: T,
		name: string,
		component: Parameters<typeof this.app.openAPIRegistry.registerComponent<T>>[2],
	) {

		return this.app.openAPIRegistry.registerComponent<T>( type, name, component )

	}

	/**
	 * Retrieves a list of unique paths from the application's routes.
	 * @returns {string[]} - An array of unique paths as strings.
	 */
	getPaths() {

		const uniquePaths = new Set(
			this.app.all().routes
				.filter( d => d.path && !d.path.endsWith( '*' ) )
				.map( d => d.path ),
		)

		return Array.from( uniquePaths )

	}

}
