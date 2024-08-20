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

	/**
	 * The port on which the application should run. 
	 *
	 * Note: This cannot modify the server port. The use of this variable is to establish more precise user information. It is recommended to set it.
	 */
	port?: number;

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
		 * @default '/dcos'
		 */
		path?: string;

		/**
		 * Whether the documentation is active. 
		 *
		 *  @default true
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

	/** Custom error messages for the application. */
	msg?: {
		/** Custom message for a 400 Bad Request error. */
		error400?: string;
	}
}
