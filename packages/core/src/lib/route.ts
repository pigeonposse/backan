// import { createRoute } from '@hono/zod-openapi'
import { AppSuper } from './super'

import type { RouteParams } from './types'

/**
 * Represents a route in the application.
 * Provides methods to add and create routes with OpenAPI integration.
 * @description Add and manage routes with OpenAPI validation and configuration.
 * @example
 * const route = class Route({
 *   path: 'id'
 * })
 * route.add(
 * 	// configuration
 * )
 * route.create(
 * 	// configuration
 * )
 * console.log(
 * 	route.path,
 * 	route.validation
 * )
 * @example https://github.com/BimaAdi/Integrate-hono-with-openapi/blob/main/src/index.ts
 * @see  https://backan.pigeonposse.com/guide/core/route
 * @deprecated
 */
export class Route<Env extends object, Path extends string> extends AppSuper<Env> {

	/**
	 * The path of the route.
	 */
	readonly path

	/**
	 * Method to add OpenAPI configuration to the route.
	 */
	add : AppSuper<Env>['app']['openapi']

	constructor( params: RouteParams<Path> ) {

		super()

		this.path = params.path
		this.add  = this.app.openapi

	}

}
