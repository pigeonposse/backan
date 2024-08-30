# Setup `backan` project 

A `CLI` for creating new [Backan](https://backan.pigeonposse.com) project. 

[![NPM Version](https://img.shields.io/npm/v/create-backan?style=for-the-badge&color=yellow)](https://www.npmjs.com/package/create-backan)

<!-- ![backan-image](/backan-create.png) -->

<video src="/backan-create.webm" controls autoplay />

## CLI

```bash 
# using NPM
npm create backan@latest
# using PNPM
pnpm create backan@latest
# using YARN
yarn create backan@latest
```

## API

You can also use `create-backan` programmatically

```js
import { create } from 'create-backan';

await create( {
	input    : '.',
	name     : 'my-app-name',
	template : 'demo', 
	install  : false, 
	open     : 'code',
});
```

## Parameters

```ts
export type CreateParams = {
    /**
     * Directory to build.
     *
     * @default .
     */
	input?: string
    /**
     * The name of the project & dirmane.
     */
	name?: string
    /**
     * The template to use for the project.
     *
     * @default demo
     */
	template?: typeof TEMPLATES[keyof typeof TEMPLATES]
    /**
     * Whether to automatically install dependencies after creating the project.
     *
     * @default false
     */
	install?: typeof INSTALL_OPTS[keyof typeof INSTALL_OPTS]
    /**
     * Specifies whether to open the project in an IDE or text editor after creation.
     * Can be `false` for no IDE, or specify an IDE/editor to open.
     * Supported options include:
     * - `'code'`: Visual Studio Code
     * - `'subl'`: Sublime Text
     * - `'webstorm'`: WebStorm.
     *
     * @default false
     */
	open?: typeof OPEN_OPTS[keyof typeof OPEN_OPTS]
}
```

## Examples

```bash
npm create backan@latest --name=my-app-name --template='skeleton' --open='code' --install='npm'
```

```bash
pnpm create backan@latest --name=my-app-name --template='skeleton' --open='code' --install='pnpm'
```

## library

Now it's time to start with `backan`. [Read more](../core/app.md)
