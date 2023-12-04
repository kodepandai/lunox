# LUNOX MONOREPO

This is Lunox Monorepo created using pnpm workspace. There are two main workspace

- packages: all lunox related packages developed in this folder. Including Lunox Framework Core.
- presets: this workspace is to create lunox application sekeleton preset. For example preset svelte and react. This workspace is mainly used for testing lunox packages.

## What is LUNOX

Lunox is Laravel-Flavoured NodeJs Framework. What is Laravel?
Laravel is a web application framework with expressive, elegant syntax [see the official website](https://laravel.com). Lunox goals is to bring the Laravel Flavour to nodejs environment.

## Creating Lunox App
```
pnpm create lunox-app
```

## Documentation

Lunox Documentation can be accessed [here](https://kodepandai.github.io/lunox/)

## Development

### Basic Pnpm Workspace Command

- install modules in all workspace, run this command in root repo

```
pnpm install
```

- add modules to specific workspace, for example we want to add svelte to `lunox-svelte` (see package name in package.json)

```
pnpm --filter lunox-svelte add svelte@latest
```

- run script on specific workspace, for example we want to run eslint on `lunox-svelte`

```
pnpm --filter lunox-svelte lint
```

- run script on all workspace, just add -r (recursive)

```
pnpm -r lint
```

## Contribution

Lunox has three main repo

1. [Lunox](https://github.com/kodepandai/lunox) - Lunox Monorepo, contains lunox packages and presets.
2. [Lunox Framework](https://github.com/kodepandai/lunox-framework) - ~main source code of Lunox Framework~ (DEPRECATED: merged to this repo).
3. [Lunox Website](https://github.com/kodepandai/lunox-website) - Documentation of Lunox Framework.

This framework still in development, PR are welcome, but please open issue or discussion before adding new feature.
