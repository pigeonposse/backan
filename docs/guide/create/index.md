# Setup `backan` project

A `CLI` for creating new [Backan](https://backan.pigeonposse.com) project.

[![NPM Version](https://img.shields.io/npm/v/create-backan?style=for-the-badge&color=yellow)](https://www.npmjs.com/package/create-backan)

![backan-image](/create-banner.png)

<video src="/backan-create.webm" controls autoplay />

## CLI

<!--@include: ../../partials/create.md-->

```bash
Usage: create-backan [options]

Options:
      --output      Set the path where you want to create your project        [string]
      --name        Set the name of the project                               [string]
      --input       Select project template                                   [string]
                    [choices: "demo", "demo-ts", "skeleton", "skeleton-ts"]
      --install     Select the package manager to install the dependencies    [string]
                    [choices: "npm", "pnpm", "yarn", "deno", "none"]
      --openEditor  Select the text editor to open the project                [string]
                    [choices: "subl", "code", "webstorm", "none"]
      --debug       Set Debug mode                                            [boolean]
  -h, --help        Show help                                                 [boolean]
  -v, --version     Show version number                                       [boolean]

```

## API

You can also use `create-backan` programmatically

```js twoslash
import { create } from 'create-backan';

await create( {
 output     : './my-project',
 name       : 'my-app-name',
 input      : 'demo',
 install    : false,
 openEditor : 'code',
});
```

## Parameters

```ts twoslash
import type { CreateParams } from 'create-backan';
```

## Examples

```bash
npm create backan@latest --name my-app-name --input 'skeleton' --install 'npm'
```

```bash
pnpm create backan@latest --name my-app-name --input 'skeleton' --install 'pnpm'
```

## library

Now it's time to start with `backan`. [Read more](../core/app.md)
