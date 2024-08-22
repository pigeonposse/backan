import type { HealthRouteOptions }   from './health/types'
import type { cors as corsFunction } from 'hono/cors'

/**
 * Parameters for configuring the App.
 */
export type AppParameters = {
	/** The version of the application. */
	version: string;

	/** The title of the application. */
	title: string;

	/** A brief description of the application. */
	description: string;

	/** Contact information for the application. */
	contact?: {
		/** The URL for contact information. */
		url?: string;

		/** The email address for contact. */
		mail?: string;
	};

	/** Whether to format JSON responses prettily. */
	jsonResponse?: boolean;

	/**
	 * CORS (Cross-Origin Resource Sharing) configuration. 
	 *
	 * This extends from `hono` cors params.
	 *
	 * @see https://hono.dev/docs/middleware/builtin/cors
	 * @example 
	 * {
	 *   origin       : '*',
	 *   allowMethods : [ 'GET'],
	 * }
	 */
	cors?: Parameters<typeof corsFunction>[0];

	/** Documentation configuration. */
	docs?: {
		/**
		 * The path where documentation is served.
		 *
		 * @default '/docs'
		 */
		path?: string;

		/**
		 * Whether the documentation is active. 
		 *
		 * @default true
		 */
		active?: boolean;
	};

	/** Health check route configuration. */
	health?: {
		/** The path where the health check route is served. */
		path?: string;

		/** Whether the health check route is active. */
		active?: boolean;

		/** Additional options for the health route. */
		opts?: HealthRouteOptions;
	};
}

export type RouteParams<Path extends string> = {
	/**
	 * The path of the route.
	 *
	 * @example 'users'
	 */
	path: Path
	// /**
	//  * Optional custom messages.
	//  */
	// msg?: {
	// 	/**
	// 	 * Custom message for 400 Bad Request errors.
	// 	 *
	// 	 * @example 'Invalid request parameters'
	// 	 */
	// 	error400?: string
	// }
}
