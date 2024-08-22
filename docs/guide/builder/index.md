# *Backan* `Builder`

Compile your `backan` server into multiple binaries, available for each **platform** and **architecture**.

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
:::

[![NPM Version](https://img.shields.io/npm/v/@backan/builder?style=for-the-badge&color=yellow)](https://www.npmjs.com/package/@backan/builder)

## Build `binaries` 

The construction of the binary allows compilation on `arm` and `x64` architecture.
> If you compile on an `x64` system it will not create the binaries for `arm`, but if you compile on `arm` it will create the binaries for both architectures.

This library works thanks to [ncc](https://github.com/vercel/ncc), [pkg](https://github.com/yao-pkg/pkg) and [esbuild](https://esbuild .github.io), which facilitate this process.

Using  *Backan* `Builder` is simple and will work in most cases, but that may not be the case. If so, we recommend using other alternatives such as [ncc](https://github.com/vercel/ncc) or [pkg](https://github.com/yao-pkg/pkg).


### 📈 usage

::: code-group

```js
import {build} from '@backan/builder'

await build( {
	input  : 'src/server.ts', // JS or TS file
	name   : 'my-app-name', // default is input filename
} )
```

```bash
backan-builder --input=src/server.ts --name=backan
```
:::

### ⚙️ Configuration
Todas estas opciones estan disponibles con el comando `backan-builder` añadiendole el sufijo `--` y seguidos de un `=` y su valor. Por ejemplo:  `--input=src/server.ts --name=backan --onlyOs`

```ts
type BuilderParams = {
	/**
	 * The input file for the build process.
	 */
	input: string, 
	/**
	 *
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

## Build `JSON` schema

```js
import {buildSchema} from '@backan/builder'
import {app} from './your-backan-app.js' 

buildSchema( {
	app    : app,
	output : 'example-openapi.json',
} )
```

### Parameters

```ts
export type BuilderSchemaParams = {
	/**
	 * The instance of the Backan application used to generate the OpenAPI schema.
	 */
	app: App<object>,
	/**
	 * The path where the resulting `json` file will be saved.
	 */
	output: string 
}
```

## Build `markdown` documentation

```js
import {buildMD} from '@backan/builder'
import {app} from './your-backan-app.js' 

buildMD( {
	app    : app,
	output : 'example-openapi.md',
} )
```

### Parameters

```ts
type BuilderMDParams = {
	/**
	 * The instance of the Backan application used to generate the OpenAPI schema.
	 */
	app: App<object>,
	/**
	 * The path where the resulting `Markdown` file will be saved.
	 */
	output: string 
}
```
