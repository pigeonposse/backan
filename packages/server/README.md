# BACKAN - Server

<!-- PIGEONPOSSE START HEADER -->

[![HEADER](https://raw.githubusercontent.com/pigeonposse/backan/main/docs/public/banner.png)](https://backan.pigeonposse.com/)

[![Web](https://img.shields.io/badge/Web-grey?style=for-the-badge&logoColor=white)](https://pigeonposse.com)
[![About Us](https://img.shields.io/badge/About%20Us-grey?style=for-the-badge&logoColor=white)](https://pigeonposse.com?popup=about)
[![Donate](https://img.shields.io/badge/Donate-pink?style=for-the-badge&logoColor=white)](https://pigeonposse.com/?popup=donate)
[![Github](https://img.shields.io/badge/Github-black?style=for-the-badge&logo=github&logoColor=white)](https://github.com/pigeonposse)
[![Twitter](https://img.shields.io/badge/Twitter-black?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/pigeonposse_)
[![Instagram](https://img.shields.io/badge/Instagram-black?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/pigeon.posse/)
[![Medium](https://img.shields.io/badge/Medium-black?style=for-the-badge&logo=medium&logoColor=white)](https://medium.com/@pigeonposse)

[![License](https://img.shields.io/github/license/pigeonposse/backan?color=green&style=for-the-badge&logoColor=white)](/LICENSE)
[![Version](https://img.shields.io/npm/v/backan?color=blue&style=for-the-badge&label=Version)](https://www.npmjs.com/package/backan)

[**BACKAN**](https://backan.pigeonposse.com/) Create endpoints with type validations and OpenApi documentation, safely and quickly.


<!-- PIGEONPOSSE END HEADER -->

> This package contains **_BACKAN_** Server library

<!-- PIGEONPOSSE START DOCS -->
Build the `backan` server with zero config.

## 🔑 Installation

```bash [npm]
npm install @backan/server 
```
```bash [pnpm]
pnpm i @backan/server
```
```bash [yarn]
yarn add @backan/server 
```

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
<!-- PIGEONPOSSE END DOCS -->

<!-- PIGEONPOSSE START INDEX -->

## More from Backan

- [Documentation](https://backan.pigeonposse.com/)
	- 📚 [Library](https://backan.pigeonposse.com/guide/core)
	- 🏁 [Create (setup)]( https://backan.pigeonposse.com/guide/create )
	- 🗄️ [Server]( https://backan.pigeonposse.com/guide/server )
	- 📦 [Builder]( https://backan.pigeonposse.com/guide/builder )
- [Installation](https://backan.pigeonposse.com/guide/core/#installation)
<!-- PIGEONPOSSE END INDEX -->

<!-- PIGEONPOSSE START ORG -->
## 👨‍💻 Development

**BACKAN** is an open-source project and its development is open to anyone who wants to participate.

[![Issues](https://img.shields.io/badge/Issues-grey?style=for-the-badge)](https://github.com/pigeonposse/backan/issues)
[![Pull requests](https://img.shields.io/badge/Pulls-grey?style=for-the-badge)](https://github.com/pigeonposse/backan/pulls)
[![Read more](https://img.shields.io/badge/Read%20more-grey?style=for-the-badge)](https://backan.pigeonposse.com/)

## ☕ Donate

Help us to develop more interesting things.

[![Donate](https://img.shields.io/badge/Donate-grey?style=for-the-badge)](https://pigeonposse.com/?popup=donate)

## 📜 License

This software is licensed with **[GPL-3.0](/LICENSE)**.

[![Read more](https://img.shields.io/badge/Read-more-grey?style=for-the-badge)](/LICENSE)

## 🐦 About us

*PigeonPosse* is a ✨ **code development collective** ✨ focused on creating practical and interesting tools that help developers and users enjoy a more agile and comfortable experience. Our projects cover various programming sectors and we do not have a thematic limitation in terms of projects.

[![More](https://img.shields.io/badge/Read-more-grey?style=for-the-badge)](https://github.com/pigeonposse)

### Collaborators

|                                                                                    | Name        | Role         | GitHub                                         |
| ---------------------------------------------------------------------------------- | ----------- | ------------ | ---------------------------------------------- |
| <img src="https://github.com/angelespejo.png?size=72" alt="Angelo" style="border-radius:100%"/> | Angelo |   Author & Development   | [@Angelo](https://github.com/angelespejo) |
| <img src="https://github.com/PigeonPosse.png?size=72" alt="PigeonPosse" style="border-radius:100%"/> | PigeonPosse | Collective | [@PigeonPosse](https://github.com/PigeonPosse) |

<br>
<p align="center">

[![Web](https://img.shields.io/badge/Web-grey?style=for-the-badge&logoColor=white)](https://pigeonposse.com)
[![About Us](https://img.shields.io/badge/About%20Us-grey?style=for-the-badge&logoColor=white)](https://pigeonposse.com?popup=about)
[![Donate](https://img.shields.io/badge/Donate-pink?style=for-the-badge&logoColor=white)](https://pigeonposse.com/?popup=donate)
[![Github](https://img.shields.io/badge/Github-black?style=for-the-badge&logo=github&logoColor=white)](https://github.com/pigeonposse)
[![Twitter](https://img.shields.io/badge/Twitter-black?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/pigeonposse_)
[![Instagram](https://img.shields.io/badge/Instagram-black?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/pigeon.posse/)
[![Medium](https://img.shields.io/badge/Medium-black?style=for-the-badge&logo=medium&logoColor=white)](https://medium.com/@pigeonposse)

</p>
<!-- PIGEONPOSSE END ORG -->

<!-- PIGEONPOSSE START MARK -->
<!--
██████╗ ██╗ ██████╗ ███████╗ ██████╗ ███╗   ██╗   
██╔══██╗██║██╔════╝ ██╔════╝██╔═══██╗████╗  ██║   
██████╔╝██║██║  ███╗█████╗  ██║   ██║██╔██╗ ██║   
██╔═══╝ ██║██║   ██║██╔══╝  ██║   ██║██║╚██╗██║   
██║     ██║╚██████╔╝███████╗╚██████╔╝██║ ╚████║   
╚═╝     ╚═╝ ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝   
                                                  
██████╗  ██████╗ ███████╗███████╗███████╗         
██╔══██╗██╔═══██╗██╔════╝██╔════╝██╔════╝         
██████╔╝██║   ██║███████╗███████╗█████╗           
██╔═══╝ ██║   ██║╚════██║╚════██║██╔══╝           
██║     ╚██████╔╝███████║███████║███████╗         
╚═╝      ╚═════╝ ╚══════╝╚══════╝╚══════╝         
                                                  
                                                  
                                                  
█████╗█████╗█████╗█████╗█████╗█████╗█████╗        
╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝        
                                                  
                                                  
                                                  
██████╗  █████╗  ██████╗██╗  ██╗ █████╗ ███╗   ██╗
██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔══██╗████╗  ██║
██████╔╝███████║██║     █████╔╝ ███████║██╔██╗ ██║
██╔══██╗██╔══██║██║     ██╔═██╗ ██╔══██║██║╚██╗██║
██████╔╝██║  ██║╚██████╗██║  ██╗██║  ██║██║ ╚████║
╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝
                                                                      
                                                
REPOSITORY: https://github.com/pigeonposse/backan
AUTHORS: 
	- Angelo (https://github.com/angelespejo)

DEVELOPED BY Angelo 🐦🌈

-->
<!-- PIGEONPOSSE END MARK -->
