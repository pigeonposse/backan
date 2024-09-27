# Create BACKAN project

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

> This package contains **_BACKAN_** Create library

<!-- PIGEONPOSSE START DOCS -->
A `CLI` for creating new [Backan](https://backan.pigeonposse.com) project. 

[![NPM Version](https://img.shields.io/npm/v/create-backan?style=for-the-badge&color=yellow)](https://www.npmjs.com/package/create-backan)

<!-- ![backan-image](https://backan.pigeonposse.com/backan-create.png) -->



## CLI

```bash 
# using NPM
npm create backan@latest
# using PNPM
pnpm create backan@latest
# using YARN
yarn create backan@latest
# using BUN
bun create backan@latest
```

## API

You can also use `create-backan` programmatically

```js twoslash
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

Now it's time to start with `backan`. [Read more](https://backan.pigeonposse.com/guide/core/app)
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
