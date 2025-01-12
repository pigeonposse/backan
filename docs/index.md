---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
hero:
  name: "BACKAN"
  text: "All in one web API builder"
  tagline: Create endpoints with type validations and OpenApi documentation, safely and quickly
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
  - title: Client
    icon: 🌐
    details: Create the BACKAN app client.
    link: guide/server
  - title: Builder
    icon: 🔢
    details: Create binaries, JSON openapi schema type definitions...
    link: guide/builder
  - title: Markdown docs
    icon: 📖
    details: Create markdown documentation of your BACKAN application.
    link: guide/builder#build-markdown-documentation

---

## Install

<!--@include: ./partials/install.md-->

## Starter app

<!--@include: ./partials/create.md-->
