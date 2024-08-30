# *Backan* `Server`

Build the `backan` server with zero config.

## 🔑 Installation

::: code-group
```bash [npm]
npm install @backan/server 
```
```bash [pnpm]
pnpm i @backan/server
```
```bash [yarn]
yarn add @backan/server 
```
:::

[![NPM Version](https://img.shields.io/npm/v/@backan/server?style=for-the-badge&color=yellow)](https://www.npmjs.com/package/@backan/server)

## 📈 usage

```js
import {server} from '@backan/server'
import {App} from 'backan' 

// create backan app
const app = new App( {
	version     : '1.0.0',
	title       : 'BACKAN sample application',
})

// create server for backan
server({ app })

```

## ⚙️ Configuration

The `backan` server comes ready to use without any configuration, but this does not mean that we can configure certain aspects of the server if we want.

Here is a list of the available options.

```ts
/**
 * Options for server function. 
 * 
 */
type ServerOpts = {
	/**
	 * The `backan` app instance. 
	 *
	 */
	app: App<Env>,
	/**
	 * The port to start the server on.
	 *
	 * @default 80
	 */
	port?: number
	/**
	 * The hostname to bind the server.
	 *
	 * @default 'localhost'
	 */
	hostname?: string
	/**
	 * The protocol to use. Defaults to 'http' unless the port is 443.
	 * Note: This will be available soon. Currently this does not modify the port, the service is always on http.
	 *
	 * @default 'http'
	 */
	protocol?: 'http' | 'https',
	/**
	 * If true, automatically find an available port if the specified port is in use.
	 *
	 * @default false
	 */
	autoPort?: boolean
	/**
	 * If true, You can pass the parameters {port,autoPort,hostname,protocol} as flags. Example: ---port=1312 --autoPort.
	 *
	 * @default false
	 */
	allowFlags?: boolean
	/**
	 * Optional callback invoked when the server starts successfully.
	 */
	onSuccess?: ( info: ServerInfo ) => Promise<void>
	/**
	 * Optional callback invoked when an error occurs.
	 */
	onError?: ( opts: {
		/**
		 * Server error id.
		 */
		id: ServerError, 
		/**
		 * Error catched in process.
		 */
		error: unknown, 
		/**
		 * Data info of server.  
		 */
		data: ServerInfo
	} ) => Promise<void>
	onExit?: ( opts: {
		/**
		 * Data info of server.  
		 */
		data: ServerInfo
	} ) => Promise<void>
}

/**
 * Data info of server.
 *
 */
type ServerInfo = {
	/**
	 * The server hostname.
	 *
	 */
	hostname: string
	/**
	 * The server port.
	 *
	 */
	port: number
	/**
	 * The server protocol.
	 *
	 */
	protocol: string
	/**
	 * The server url: `${protocol}://${hostname}:${port}`.
	 *
	 */
	url: string
}
```

## 💡 Examples

### Zero config

```js
/**
 * Start a server with zero config for BACKAN
 *
 * @see https://backan.pigeonposse.com/guide/server
 */

import { server } from '@backan/server'
import app        from './app.js' // your backan app

await server({ app })

```

### Fully customized

```js
/**
 * Start a fully customized server for BACKAN
 *
 * @see https://backan.pigeonposse.com/guide/server
 */

import { server } from '@backan/server'
import app        from './app.js' // your backan app

await server( {
	app        : app,
	hostname   : 'localhost',
	protocol   : 'http',
	port       : 1312,
	autoPort   : true,
	allowFlags : true,
	onError    : async ( { id, error } ) => {
		
		if( id === 'UNEXPECTED' ) console.error( '🐦💔 UNEXPECTED Error' )
		else if( id === 'PORTS-NOT-AVAILABLE' ) console.error( '🐦💥🚢 No ports availables' )
		else if( id === 'PORT-NOT-AVAILABLE' ) console.error( '🐦💥🚢 No port available' )
		else if( id === 'HOSTNAME-NOT-VALID' ) console.error( '🐦💥🌐 Hostname not available' )
		console.error( '\n',error )
	
	},
	onSuccess : async ( info ) => {

		console.info( '🐦✅ Server info', info )
	
	},
	onExit : async () => {

		console.warn( '\n\n🐦👋 Fly High Pigeon\n' )
	
	},
} )

```
