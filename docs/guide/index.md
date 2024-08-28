# What is BACKAN?

![HEADER](/banner.png)

**`BACKAN`** is a library designed to build **REST API** applications quickly and easily.

> [!IMPORTANT]
> Currently in phase `Beta`
> The library can be used perfectly in production, but could undergo changes and new features until version `1`.
> To avoid ongoing maintenance issues, we recommend installing a fixed version (without `^`) in your project.

## Project intention

Our project is not intended to be a substitute for any web framework. Our library aims to cover a specific use case, that of building APIs, simplifying this process as much as possible and creating APIs in a robust way.

The creation of this project is also due to the need of our [collective](htpps://pigeonposse.com) to create APIs with good documentation and in a simple way, an example of this is the Api section of [`bepp`](https://github.com/pigeonposse/bepp/tree/main/packages/api) (a web extension packager).

## Contains

- ✅ Simple `data validation`, so that your endpoints are as secure as possible and reduce repetitive code (boilerplate).
- ✅ Built-in and almost `automatic OpenAPI documentation`, improving the visibility of our API without the need to import other projects.

In addition, **BACKAN** also provides:

- A backan project creator with templates of greater and lesser complexity. [Read more](./core/index.md#setup)
- Configuration to create your [Node server](./server/index.md), perfect for running your application without having to configure anything. [Read more](./server/index.md)
- Tool to build the binary of your application, ideal for running the app without the need for a Node.js environment. [Read more](./builder/index.md)

> [!note]
> The documentation is under construction. Soon, we will write all the points it contains

## Todo

- 💡 Typing for make your frontend projects more easy.

[Read more](../todo/v1.md)

## What is `backan` built with?

Our library is built under the `hono` framework, which is why you will see references to it in our documentation and our code. **BACKAN** is an implementation that aims to simplify the construction of apirest for specific use cases.

You want to build an apirest quickly and safely and without thinking about third-party implementations, well here we propose our [alternative](./core/index.md).

## 🏁 Get started with `Backan`

Start building your restAPI app now 🌈.

[Read more](./core/index.md)

## 🗄️ Get started with `Backan` server

[Read more](./server/index.md)

## 📦 Build your project

- Build your app documentation in a `markdown file`.
- Export to `openapi schema` to a `json file`.
- Build `binaries` of your project for all **systems** and **architectures**.

[Read more](./builder/index.md)
