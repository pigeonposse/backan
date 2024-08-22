---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
hero:
  name: "BACKAN"
  text: "All in one web API builder."
  tagline: Create endpoints with type validations and OpenApi documentation, safely and quickly.
  image:
      src: /logo.png
      alt: BACKAN
  actions:
    - theme: brand
      text: Get started
      link: /guide
    - theme: alt
      text: View on GitHub
      link: https://github.com/pigeonposse/backan

features:

  - title: Get started
    icon: 👋
    details: Start your project now
    link: guide/
  - title: Library
    icon: 📚
    details: Learn and check the documentation.
    link: guide/core
  - title: Server
    icon: 🗄️
    details: Set up a BACKAN server with zero configuration.
    link: guide/server
  - title: Builder
    icon: 🔢
    details: Create binaries, JSON openapi schema and markdown documentation of your BACKAN application.
    link: guide/builder

---

::: code-group
```bash [npm]
npm install backan
```
```bash [pnpm]
pnpm install backan
```
```bash [yarn]
yarn add backan
```
:::
