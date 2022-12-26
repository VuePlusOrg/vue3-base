# vue3-base

## Introduction
This project is a front-end infrastructure system based on Vue3. Based on this architecture, front-end developers can be more quickly and more engineeringly engaged in business development.

## Package management tools
The project currently uses `pnpm` as a package management tool.

Based on the internal Hard Link mechanism, `pnpm` is almost 2 times faster than `npm`/`yarn` in integrated business scenarios, which fundamentally guarantees the development efficiency of business teams.

## Technology stack
### Project base framework
- Vue3
- Vue Router v4
- Pinia v2
- Vite v4
- Typescript v4.7.4

### UI style related
- ant-design-vue v3
- Tailwind v3
- LESS
- postcss-px-to-viewport

### HTTP request library
- Axios

### Git commit control
- git-cz
- commitizen
- husky

### Code specification control
- ESLint
  - Airbnb
- Prettier
- Lint Staged
- Editor Config

### Package analysis tools
- rollup-plugin-visualizer

### Multi-language solutions
- vue-i18n v9

### Automated configuration loading
- Routing automation loading
  - vite-plugin-pages
- Component automation loading
  - unplugin-vue-components

### Environment variable control
- dotenv

### Mock
- mock.js

### Architecture description
### Routing configuration
In this framework, you don't need to pay attention to any routing configuration information. You just need to place the corresponding page in the `@/views` folder at the corresponding level and name, and the framework will automate the route building and parsing.

The following is a sample directory structure that the framework will resolve to a route path.
```
|-- views
    |-- home
    |-- index.vue 👉 /
    |-- pageA
    |-- index.vue 👉 /pageA
    |-- sub1.vue 👉 /pageA/sub1
    |-- sub2
    |-- index.vue 👉 /pageA/sub2
    |-- pageB
    |-- index.vue 👉 /pageB
    |-- sub1.vue 👉 /pageB/sub1
    |-- sub2
    |-- index.vue 👉 /pageB/sub2
```

### Componentization
Components distinguish between two types of components: global components and local components. If you need to create a global component, you only need to place the component in the `@/components` folder, name it correctly according to the big hump specification, and the component will be automatically registered to the global.

For local components that involve only a single functional module, you need to make sure to place the component in the `./components` folder in the parallel directory of the corresponding `view` view (the /components` folder in the parallel directory of the corresponding `view` view (if it does not exist, you will have to create it yourself), as components placed in this folder will not be automatically resolved by the route.

Also, referring to the rule [vue/multi-word-component-names](https://eslint.vuejs.org/rules/multi-word-component-names.html), we do not recommend developers to use a single word as a component name, even if we have disabled it in the ESLint configuration to disable this rule.

### Static resources
We recommend that you place all static resources in `@/assets`.

Note that the placement of static files should follow the categorization principle, i.e. fonts should be placed in the `fonts` subdirectory, images should be placed in the `images` subdirectory, etc.

### Hooks

> Hook Function is a concept introduced by React in v16.8, and is being gradually adopted by the Vue ecosystem. For more information, see [Introducing Hooks](https://reactjs.org/docs/hooks-intro.html).

This folder contains globally reusable `Hooks`. If there are functions related to `util` in the project, they need to be hooked uniformly. If the developer has created a new hook, the developer has to register the hook in `index.ts`. It is recommended that external calls to the hook should only bring in the `index.ts` file and not the hook itself.

#### useRequest
This hook is used to make HTTP requests. If you need to configure the corresponding interceptor, please do so in the `interceptor` folder.

### Internationalization
The framework supports configuration for multilingualism. For writing language packages, we have two types of packages: global packages and local packages.

The global language package is placed inside the common language translation information, the language package you should follow the specifications placed in the `@/i18n` folder. We have given examples of importing language packs for both English and Chinese languages inside the framework. If you need to add a new language, you need to create a new file in that folder with the language abbreviation and register the language pack file in the `index.ts` file in that folder.

Local language packs are recommended to be placed in the same directory as `view` or `component` and imported via the `<i18n>` tag.

```html
<template></template>

<i18n src=". /i18n.json"></i18n>
```

### Stores
The framework also provides datacentering capabilities, and we have chosen [Pinia](https://pinia.vuejs.org/) (the official Vue recommended data warehouse solution that carries the full type of system) as our datacentering implementation. Please refer to the official `Pinia` documentation for details.

Pinia currently provides both `Option Store` & `Setup Store` APIs for business development. ** However, we still recommend our framework users to use the `Setup Store` for business development, as provided in our case. **

### Plugins
In order to keep the `main.ts` file clean and highly maintainable, we created the concept of `plugin`. That is, when it comes to the parts that need to be imported into the `main.ts` file, we require that they be implemented uniformly as `plugin`. Finally, the import is done with the `plugin` created.

As you can see, we have three `plugin`s built in, which are tied to the project infrastructure and we don't recommend you to edit or delete them easily.

### Global styles
We recommend that you place the global style file in the `@/styles` folder and import it to `main.less` to register it when you are done. We do not recommend that you import the files directly into the `main.ts` file. This may incur some project control costs as the project grows in size.

### TypeScript configuration
As you can see, we split the project `tsconfig.json` file into four files, all of which have different file scopes, as follows
- tsconfig.json
  - Configuration entry file
- tsconfig.app.json
  - acts on all files in the `src` directory for business development
- tsconfig.vitest.json
  - The `vite.config.ts` file, used for `vite` related configuration
- tsconfig.config.json
  - as above

### Code commits
In order to standardize the commit text of git commits, we have adopted `git-cz` as a uniform commit generation tool. You can use a process-based commit by simply running the following command.

```
pnpm commit
```

In addition to this, we have configured the process options in the `.czrc` file, and we believe that we have given you enough configuration items to basically cover the entire process of development. If you are still not satisfied with the proposed configuration, you can modify the `.czrc` file as needed to achieve your goal.


### Code quality and style control
For project code quality and style control we have chosen to use 4 channels of uniformity. They are `ESLint`, `Prettier`, `EditorConfig`, and `.vscode` folders. This contains multi-dimensional uniformity in code quality, code style, editor configuration, etc. to guarantee the consistency of code specification for team members.

Developers are highly discouraged from directly modifying the relevant configuration items when they encounter normative errors reported by the above tools, or when the configured development style does not match their personal habits. If you encounter the above problem, please contact and negotiate with the project technical management, and if the final assessment is reasonable, you will need to modify the relevant specification and configuration file uniformly for the whole team. If you modify the configuration file by yourself, it may lead to individual code not conforming to the team development specification.

### Environment variable configuration
For the current project, we use `dotenv` as the environment variable configuration tool. There are three types of `.env` in the project, and the specific usage scenarios are as follows.

| File name | Whether to upload to GIT | Whether to include sensitive data | Whether to use in development environment | Whether to use in test environment | Whether to use in production environment
| ---------------------- | --------------- | ----------------- | --------------- | --------------- | ---------------
| .env | ⭕️ | ❌ | ⭕️ | ⭕️ | ⭕️ | ⭕️ |
| .env.local | ❌ | ⭕️ | ⭕️ | ⭕️ | ⭕️ | ⭕️ |
| .env.development | ⭕️ | ❌ | ⭕️ | ❌ | ❌ | ❌ |
| .env.development.local | ❌ | ⭕️ | ⭕️ | ❌ | ❌ | ❌ |
| .env.preview | ⭕️ | ❌ | ❌ | ⭕️ | ❌ |
| .env.preview.local | ❌ | ⭕️ | ❌ | ⭕️ | ❌ |
| .env.production | ⭕️ | ❌ | ❌ | ❌ | ⭕️ |
| .env.production.local | ❌ | ⭕️ | ❌ | ❌ | ❌ | ⭕️ |


### CI/CD
[ ] GitHub Action
[ ] GitLab CI
[ ] Travis


## Project instructions
### Dependency installation
```
pnpm install
```

### Service run
#### development environment
> Just choose one of the following commands
```
pnpm serve
pnpm serve:develop
```

#### test environment
```
pnpm serve:preview
```

#### production environment
```
pnpm serve:product
```

### Service build
#### development environment
> Just choose one of the following commands
```
pnpm build
pnpm build:develop
```

#### test environment
```
pnpm build:preview
```

#### production environment
```
pnpm build:product
```

### Code Lint
#### Lint fixes
```
pnpm lint
```

#### Lint check
```
pnpm lint:check
```

### Code commit
```
pnpm commit
```
