import {
	swaggerUI,
	prettyJSON,
	cache as cacheMW,
	cors as corsFunction,
	appendTrailingSlash,
	trimTrailingSlash,
	ipRestriction,
	poweredBy as poweredByMW,
} from './app-utils'
import { getHealthRoute } from './health/main'
import { add404Error }    from './response'
import { AppSuper }       from './super'

import type { AppParameters } from './types'
import type { Context }       from 'hono'

type OpenApiObject<Env extends object> = ReturnType<App<Env>['app']['getOpenAPIDocument']>
/**
 * Represents an application with configuration options and methods
 * for managing routes, OpenAPI documentation, and error handling.
 * @example
 * const app = new App({
 *   version: '1.0.0',
 *   title: 'BACKAN Example app',
 *   description: 'API documentation for BACKAN Example',
 *   cors: {
 *     origin: '*',
 *     allowMethods: ['GET'],
 *   },
 * });
 * @see https://backan.pigeonposse.com/guide/core/app
 */
export class App<Env extends object> extends AppSuper<Env> {

	/**
	 * The version of the application.
	 */
	version = ''
	/**
	 * The title of the application.
	 */
	title = ''
	/**
	 * A brief description of the application.
	 */
	description = ''
	/**
	 * Contact information for the application.
	 */
	contact

	#jsonResponse = true

	#docs = {
		path   : '/docs',
		active : true,
	}

	#health: AppParameters['health'] & {
		path   : string
		active : boolean
	} = {
			path   : '/health',
			active : true,
			opts   : undefined,
		}

	#openApiConfig

	#setNotFound() {

		this.app.notFound( c => {

			const url = this.getDocUrl( c )
			return add404Error( c, {
				id      : this.ERROR_ID.PAGE_NOT_FOUND,
				message : 'Page not found.',
				help    : url ? `Go to: ${url}` : this.ERROR_ID.NO_DOCS_PROVIDED,
			} )

		} )

	}

	#setDocs() {

		if ( !this.#docs.path || !this.#docs.active ) return

		const optsJson = `${this.#docs.path}.json`

		this.app.doc( optsJson, this.#openApiConfig )

		this.app.get( this.#docs.path, swaggerUI( { url: optsJson } ) )

	}

	#setHealthPath() {

		if ( !this.#health.path || !this.#health.active ) return
		const route = getHealthRoute( this.#health.path, this.#health.opts )
		// @ts-ignore
		this.addRoute( route )

	}

	constructor( {
		jsonResponse,
		cors,
		version,
		title,
		description,
		docs,
		health,
		contact,
		cache,
		trailingSlash,
		hook,
		poweredBy,
	}: AppParameters ) {

		super()

		if ( jsonResponse ) this.#jsonResponse = jsonResponse

		if ( version ) this.version = version
		if ( title ) this.title = title
		if ( contact ) this.contact = contact
		if ( description ) this.description = description

		if ( hook ) hook.beforeAll?.<Env>( this.app )

		if ( poweredBy !== false ) this.app.use(
			'*',
			poweredByMW( { serverName: poweredBy || 'backan' } ),
		)

		if ( trailingSlash ) this.app.use(
			'*',
			trailingSlash === 'trim'
				? trimTrailingSlash()
				: appendTrailingSlash(),
		)

		if ( this.#jsonResponse ) this.app.use( prettyJSON( { space: 4 } ) )
		if ( cors ) this.app.use( '*', corsFunction( cors ) )

		if ( docs?.active || docs?.active == false ) this.#docs.active = docs.active
		if ( docs?.path ) this.#docs.path = docs.path

		if ( health?.active || health?.active == false ) this.#health.active = health.active
		if ( health?.path ) this.#health.path = health.path
		if ( health?.opts ) this.#health.opts = {
			...this.#health.opts,
			...health.opts,
		}

		this.#openApiConfig = {
			openapi : '3.0.0',
			info    : {
				version     : this.version,
				title       : this.title,
				description : this.description,
				contact     : this.contact,
			},
		}

		if ( cache ) this.app.use( '*', cacheMW( cache ) )

		this.#setDocs()
		this.#setHealthPath()
		this.#setNotFound()

		this.fetch = this.app.fetch

	}

	setIpRestriction( {
		pattern = '*', getIP, rules, onError,
	}:{
		pattern? : string
		getIP    : Parameters<typeof ipRestriction>[0]
		rules?   : Parameters<typeof ipRestriction>[1]
		onError? : Parameters<typeof ipRestriction>[2]
	} ) {

		this.app.use(
			pattern,
			ipRestriction( getIP, rules || {}, onError ),
		)

	}

	/**
	 * The fetch method for the application.
	 *
	 * Will be entry point of your application..
	 * @type {Function}
	 */
	fetch

	/**
	 * Generates the full URL for the OpenAPI documentation endpoint.
	 * @param   {Context}            c - The Hono context object.
	 * @returns {string | undefined}   - The full URL for the OpenAPI documentation, or undefined if not configured.
	 */
	getDocUrl( c: Context ) {

		const url      = new URL( c.req.url )
		const protocol = url.protocol ? `${url.protocol}//` : ''
		const port     = url.port ? `:${url.port}` : ''
		return this.#docs.path && this.#docs.active ? `${protocol}${url.hostname}${port}${this.#docs.path}` : undefined

	}

	/**
	 * Retrieves the OpenAPI configuration object.
	 * @returns {object} - The OpenAPI document object.
	 */
	getOpenApiObject(): OpenApiObject<Env> {

		return this.app.getOpenAPIDocument( this.#openApiConfig )

	}

}
