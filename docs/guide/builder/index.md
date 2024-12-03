# *Backan* `Builder`

The backan builder library allows you to build multiple things. Among others:

- [**Executables / binaries**](#build-binaries)
- [**client library**](#create-client)
- [**JSON schema file**](#build-json-types-schema)
- [**TypeScript definitions file**](#build-json-types-schema)
- [**Markdown documentation**](#build-markdown-documentation)

## 🔑 Installation

::: code-group

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

:::

[![NPM Version](https://img.shields.io/npm/v/@backan/builder?style=for-the-badge&color=yellow)](https://www.npmjs.com/package/@backan/builder)

## Build `binaries`

Package your Node.js project into an executable that can be run even on devices without Node.js installed.

The construction of the binary allows compilation on `arm` and `x64` architecture.
> If you compile on an `x64` system it will not create the binaries for `arm`, but if you compile on `arm` it will create the binaries for both architectures.

This library works thanks to [ncc](https://github.com/vercel/ncc), [pkg](https://github.com/yao-pkg/pkg) and [esbuild](https://esbuild.github.io), which facilitate this process.

Using  *Backan* `Builder` is simple and will work in most cases, but that may not be the case. If so, we recommend using other alternatives such as [ncc](https://github.com/vercel/ncc) or [pkg](https://github.com/yao-pkg/pkg).

### 📈 usage

::: code-group

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

:::

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
