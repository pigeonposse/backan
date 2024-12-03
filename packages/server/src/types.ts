/* eslint-disable @stylistic/object-curly-newline */
import type { SERVER_ERROR } from './const'
import type { App }          from '@backan/core'

/**
 * Data info of server.
 *
 */
export type ServerInfo = {
	/**
	 * The server hostname.
	 *
	 */
	hostname : string
	/**
	 * The server port.
	 *
	 */
	port     : number
	/**
	 * The server protocol.
	 *
	 */
	protocol : string
	/**
	 * The server url: `${protocol}://${hostname}:${port}`.
	 *
	 */
	url      : string
}
export type ServerError = typeof SERVER_ERROR[keyof typeof SERVER_ERROR]

export type ServerOpts<Env extends object> = {
	/**
	 * The fetch handler for the server.
	 *
	 */
	app         : InstanceType<typeof App> | App<Env>
	/**
	 * The port to start the server on.
	 * @default 80
	 */
	port?       : number
	/**
	 * The hostname to bind the server.
	 * @default 'localhost'
	 */
	hostname?   : string
	/**
	 * The protocol to use. Defaults to 'http' unless the port is 443.
	 * Note: This will be available soon. Currently this does not modify the port, the service is always on http.
	 * @default 'http'
	 */
	protocol?   : 'http' | 'https'
	/**
	 * If true, automatically find an available port if the specified port is in use.
	 * @default false
	 */
	autoPort?   : boolean
	/**
	 * If true, You can pass the parameters {port,autoPort,hostname,protocol} as flags. Example: ---port=1312 --autoPort.
	 * @default false
	 */
	allowFlags? : boolean
	/**
	 * Optional callback invoked when the server starts successfully.
	 */
	onSuccess?  : ( info: ServerInfo ) => Promise<void>
	/**
	 * Optional callback invoked when an error occurs.
	 */
	onError?: ( opts: {
		/**
		 * Server error id.
		 */
		id    : ServerError
		/**
		 * Error catched in process.
		 */
		error : unknown
		/**
		 * Data info of server.
		 */
		data  : ServerInfo
	} ) => Promise<void>
	onExit?: ( opts: {
		/**
		 * Data info of server.
		 */
		data : ServerInfo
	} ) => Promise<void>
}
