# Backan - Builder

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

> This package contains **_BACKAN_** Builder library

<!-- PIGEONPOSSE START DOCS -->
The backan builder library allows you to build multiple things. Among others:

- [**Executables / binaries**](#build-binaries)
- [**client library**](#create-client)
- [**JSON schema file**](#build-json-types-schema)
- [**TypeScript definitions file**](#build-json-types-schema)
- [**Markdown documentation**](#build-markdown-documentation)

## 🔑 Installation

```bash [npm]
npm install @backan/builder
```

```bash [pnpm]
pnpm i @backan/builder
```

```bash [yarn]
yarn add @backan/builder
```

```bash [bun]
bun add @backan/builder
```

[![NPM Version](https://img.shields.io/npm/v/@backan/builder?style=for-the-badge&color=yellow)](https://www.npmjs.com/package/@backan/builder)

## Build `binaries`

Package your Node.js project into an executable that can be run even on devices without Node.js installed.

The construction of the binary allows compilation on `arm` and `x64` architecture.
> If you compile on an `x64` system it will not create the binaries for `arm`, but if you compile on `arm` it will create the binaries for both architectures.

This library works thanks to [ncc](https://github.com/vercel/ncc), [pkg](https://github.com/yao-pkg/pkg) and [esbuild](https://esbuild.github.io), which facilitate this process.

Using  _Backan_ `Builder` is simple and will work in most cases, but that may not be the case. If so, we recommend using other alternatives such as [ncc](https://github.com/vercel/ncc) or [pkg](https://github.com/yao-pkg/pkg).

### 📈 usage

```js twoslash
import {build} from '@backan/builder'

await build( {
 input  : 'src/server.js', // JS or TS file
 name   : 'app-name', // default is input filename
} )
```

```bash
backan-builder --input=src/server.js --name=app-name
```

### ⚙️ Configuration

All of these options are available with the `backan-builder` command by adding the suffix `--` and followed by an `=` and its value.

```ts
type BuilderParams = {
 /**
  * The app server input file.
  *
  * The input can be provided without an extension.
  * If the extension is omitted, the system will automatically look for the following extensions: `.ts`, `.js`, `.mjs`, `.mts`.
  */
 input: string,
 /**
  * Binary name.
  */
 name?: string,
 /**
  * Directory for the output build.
  *
  * @default './build'
  */
 outDir?: string,
 /**
  * Build only binary for your current OS.
  *
  * @default false
  */
 onlyOs?: boolean
 /**
  * The build type Result [all|cjs|bin].
  *
  * @default 'all'
  */
 type?: 'all'|'cjs'|'bin'

}
```

## Build `JSON` | `Types` schema

```js twoslash
// @filename: app.js
import { App } from 'backan';

const app = new App( {
 version     : '1.0.0',
 title       : 'BACKAN Example app',
})

export  {app}
// ---cut---
import {buildSchema} from '@backan/builder'
import {app} from './app.js'

buildSchema( {
 app    : app,
 output : 'openapi-schema.json',
} )
```

### Parameters

```ts
export type BuilderSchemaParams = {
 /**
  * The instance of the Backan application used to generate the OpenAPI schema.
  */
 app: App<Env>,
 /**
  * The path where the resulting `json` file will be saved.
  */
 output: string
 /**
  * Generate dts file.
  *
  * @default true
  */
 dts?: boolean
}
```

## Build `Markdown` documentation

```js twoslash
// @filename: app.js
import { App } from 'backan';

const app = new App( {
 version     : '1.0.0',
 title       : 'BACKAN Example app',
})

export  {app}
// ---cut---
import {buildMD} from '@backan/builder'
import {app} from './app.js'

buildMD( {
 app    : app,
 output : 'api-documentation.md',
} )
```

### Parameters

```ts
type BuilderMDParams = {
 /**
  * The instance of the Backan application used to generate the OpenAPI schema.
  */
 app: App<Env>,
 /**
  * The path where the resulting `Markdown` file will be saved.
  */
 output: string
}
```

## Create client

Create a client for your `backan` API and make your frontend app able to access your API easily and with type. To achieve this, backan makes use of the [`openapi-featch`](https://openapi-ts.dev/openapi-fetch/) library.

```ts twoslash
// @noErrors
import { createClient } from '@backan/builder'
import type { paths }   from './openapi.d.ts' // Generate with buildSchema

const client = createClient<paths>( {
 baseUrl : 'http://localhost:1312/',
} )

export {client}

```

### Example of call

```ts twoslash
// @filename: client.js
import { createClient } from '@backan/builder'
// @noErrors
import type { paths }   from './openapi.d.ts' // Generate with buildSchema

const client = createClient<paths>( {
 baseUrl : 'http://localhost:1312/',
} )

export {client}

// ---cut---
import {client} from './client.js'
const response = await client.GET( '/random/child', {
 params : {
  query : {
   value : 'myValue',
  },
 },
} )

console.log( response )
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

_PigeonPosse_ is a ✨ **code development collective** ✨ focused on creating practical and interesting tools that help developers and users enjoy a more agile and comfortable experience. Our projects cover various programming sectors and we do not have a thematic limitation in terms of projects.

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
