# vue3-base

[English](./README.md) | 简体中文

## 简介
该项目是一个基于 Vue3 完成的前端基础架构体系。基于该架构体系进行开发，前端开发人员可以更快、更工程化地投入业务开发。

## 包管理工具
目前项目采用 `pnpm` 作为包管理工具。

基于内部 Hard Link 机制，综合业务场景下，`pnpm` 比 `npm`/`yarn`提速将近 2 倍，根本上保障业务团队开发效率。

## 主要技术栈
### 项目基础框架
- Vue3
- Vue Router v4
- Pinia v2
- Vite v4
- Typescript v4.7.4

### UI样式相关
- ant-design-vue v3
- Tailwind v3
- LESS
- postcss-px-to-viewport

### HTTP请求库
- Axios

### Git 提交规范管控
- git-cz
- commitizen
- husky

### 代码规范管控
- ESLint
  - Airbnb
- Prettier
- Lint Staged
- Editor Config

### 包分析工具
- rollup-plugin-visualizer

### 多语言解决方案
- vue-i18n v9

### 自动加载配置
- 路由自动化加载
  - vite-plugin-pages
- 组件自动化加载
  - unplugin-vue-components

### 环境变量管控
- dotenv

### Mock
- mock.js

## 架构说明
### 路由配置
在本套框架体系中，您不需要关注任何的路由配置信息。您只需要将对应的页面放置于对应层级和名称的`@/views`文件夹中，框架便会进行自动化的路由构建和解析。

#### 路径解析

下面便是一个案例的目录结构所会被框架解析为的路由路径。

```
|-- views/
  |-- home/
  | |-- index.vue        👉  /
  |-- pageA/
  | |-- index.vue        👉  /pageA
  | |-- sub1.vue         👉  /pageA/sub1
  | |-- sub2/
  | | |-- index.vue      👉  /pageA/sub2
  |-- pageB/
  | |-- index.vue        👉  /pageB
  | |-- sub1.vue         👉  /pageB/sub1
  | |-- sub2/
  | | |-- index.vue      👉  /pageB/sub2
  |-- pageC/
  | |-- [id]/
  | | |-- index.vue      👉  /pageC/:id (e.g. /pageC/6)
  | | |-- detail.vue     👉  /pageC/:id/detail (e.g. /pageC/6/detail)
```

#### 参数配置
本套自动化的路由体系同样支持完善的路由参数配置。您只需要在指定页面的最外层添加自定义标签`<route>`即可。

```html
<route lang="yaml">
name: name-override
meta:
  requiresAuth: true
</route>
```

route标签内支持JSON方式的配置项传入，但我们依旧建议您使用YAML进行路由的配置，因为我们认为这将会比JSON更加简洁明了。

### 组件化
组件区分全局组件和局部组件两种类型。若您需要创建全局组件，则仅需要将组件放置至 `@/components` 文件夹中，按照大驼峰规范进行正确命名，该组件则将会自动注册至全局。

部分仅涉及到单一功能模块的局部组件，您需要务必将组件放置于对应 `view` 视图中的平行目录下的 `./components` 文件夹中（若不存在则需要您自行创建），放置于该文件夹中的组件不会被路由自动解析。

此外，参照该规则 [vue/multi-word-component-names](https://eslint.vuejs.org/rules/multi-word-component-names.html)，我们不建议开发者使用单个词作为组件名，即使我们已在ESLint配置中禁用了该规则。

### 静态资源
我们建议您，将所有的静态资源放置于 `@/assets` 中。

需注意的是，静态文件的放置请遵循分类原则，即类似字体文件需放置至`fonts`子目录下，图片文件需放置于`images`子目录下等。

### Hooks

> Hook Function 是 React 于 v16.8 中提出的概念，目前 Vue 生态也逐步接纳该设计理念。若需要了解详情，可参考[Introducing Hooks](https://reactjs.org/docs/hooks-intro.html)。

该文件夹内放置的为全局可复用的 `Hook`。项目中若有涉及到 `util` 相关的函数，则需要统一 hook 化。且开发者若已创建了一个新的hook，则需要开发者自行于 `index.ts` 中将该 hook 进行注册。且我们建议外部调用 hook 应仅引入 `index.ts` 文件，而非该 hook 文件本身。

#### useRequest
该 hook 用于进行 HTTP 请求。若需配置相应拦截器，请于 `interceptor` 文件夹中进行对应拦截器配置。

### 国际化
框架支持多语言化的相关配置。关于对应语言包的编写，我们分为全局语言包和局部语言包两种。

全局语言包内部放置的是常用语的语言翻译信息，该语言包您应该按照规范放置于 `@/i18n` 文件夹内。我们在框架内部给到了中英两种语言的语言包导入的案例。若您需要新增语言，则需要按照语言缩写于该文件夹内创建新的文件，并于该文件夹内的 `index.ts` 文件中进行语言包文件的注册。

局部语言包我们建议放置于对应 `view` 或 `component`的同级目录下，并通过 `<i18n>` 标签进行导入。

```html
<template></template>

<i18n src="./i18n.json"></i18n>
```

### 状态管理
框架同样提供了状态管理的相关能力，我们选用了 [Pinia](https://pinia.vuejs.org/)（Vue官方目前推荐的携带完整类型系统的数据仓库解决方案）作为了我们的中心化状态管理的实现方案。具体使用细节请参考 `Pinia` 官方文档。

Pinia 目前提供了 `Option Store` & `Setup Store` 两种 API 以供用户进行业务开发。**但我们依旧建议我们的框架使用者能使用 `Setup Store` 进行相关业务开发，就像我们案例中提供的那样。**

### 插件
为了保证 `main.ts` 文件的清洁和高可维护性，我们创立了 `plugin` 的概念。即涉及到需要导入至 `main.ts` 文件的部分，我们要求统一以 `plugin` 的方式进行实现。最后再以创建的 `plugin` 进行导入。

如你所见，我们现已内建了3个 `plugin`，这三个 `plugin` 和项目基建挂钩，我们不建议您轻易进行编辑或删除。

### Mock

框架提供了Mock数据请求的相关配置。Mock数据可以使前后端完全分离，并且通过随机数据，可以有效提高单元测试的真实性。

Mock请求的数据配置文件应放置于`/mock`文件夹中。并且，若后端项目采用微服务架构，我们建议您相同服务的接口放置于一个文件内。

### 全局样式
我们建议您将全局的样式文件放置于 `@/styles` 文件夹目录下，并在放置完成后，导入至 `main.less` 以注册它。我们不建议您直接将文件导入至 `main.ts` 文件中。这在项目规模逐渐增大后，可能会带来一定的项目管控成本。

### TypeScript配置
如您所见，我们将项目的 `tsconfig.json` 文件拆分成了4个文件，这四个文件所作用到的文件作用域都是不一样的，所作用域如下：
- tsconfig.json
  - 配置入口文件
- tsconfig.app.json
  - 作用于 `src` 目录下的所有文件，供业务开发使用
- tsconfig.vitest.json
  - 作用于 `vite.config.ts` 文件，用于 `vite` 的相关配置使用
- tsconfig.config.json
  - 同上

### 代码提交
为了统一 git commit 的提交文本的规范，因此，我们采用了 `git-cz` 作为统一的 commit 生成工具。您仅需运行以下命令即可使用流程化的 commit 提交。

```
pnpm commit
```

除此之外，我们已经于 `.czrc` 文件中配置了相关的流程可选项，我们认为，我们给到的配置项已经可以基本覆盖开发过程中的全部流程。若您对建议的配置项依旧不满意，您也可以按需修改 `.czrc` 文件以达成目的。


### 代码质量和风格管控
项目代码质量和风格管控我们选用了4个渠道的统一性。分别是 `ESLint`、`Prettier`、 `EditorConfig`、`.vscode`文件夹。这其中包含了代码质量、代码风格、编辑器配置等多维度的统一性，以保障团队成员的代码规范一致性。

开发人员在遇到上述工具的规范性报错，或配置的开发方式不符合个人习惯时，我们非常不建议直接修改相关配置项。您在遇到上述问题后，请于项目技术管理人员联系和协商，若最终评定合理，则需要全团队统一修改相关规范和配置文件。若自行修改相关配置文件，可能会导致个人代码不符合团队开发规范。

### 环境变量配置
当前项目我们采用 `dotenv` 作为环境变量配置工具。且目前项目中存在的 `.env` 存在三种类型，具体使用场景如下。

| 文件名                  |  是否可上传至GIT  | 是否可以包含敏感数据 | 是否作用于开发环境 | 是否作用于测试环境 | 是否作用于生产环境 |
| ---------------------- | --------------- | ----------------- | --------------- | --------------- | --------------- |
| .env                   | ⭕️              | ❌                | ⭕️              | ⭕️              | ⭕️              |
| .env.local             | ❌              | ⭕️                | ⭕️              | ⭕️              | ⭕️              |
| .env.development       | ⭕️              | ❌                | ⭕️              | ❌              | ❌              |
| .env.development.local | ❌              | ⭕️                | ⭕️              | ❌              | ❌              |
| .env.preview           | ⭕️              | ❌                | ❌              | ⭕️              | ❌              |
| .env.preview.local     | ❌              | ⭕️                | ❌              | ⭕️              | ❌              |
| .env.production        | ⭕️              | ❌                | ❌              | ❌              | ⭕️              |
| .env.production.local  | ❌              | ⭕️                | ❌              | ❌              | ⭕️              |


### CI/CD
[ ] GitHub Action
[ ] GitLab CI
[ ] Travis


## 项目指令
### 依赖安装
```
pnpm install
```

### 服务运行
#### 开发环境
> 以下指令二选一即可
```
pnpm serve
pnpm serve:develop
```

#### 测试环境
```
pnpm serve:preview
```

#### 生产环境
```
pnpm serve:product
```

### 服务构建
#### 开发环境
> 以下指令二选一即可
```
pnpm build
pnpm build:develop
```

#### 测试环境
```
pnpm build:preview
```

#### 生产环境
```
pnpm build:product
```

### 代码Lint
#### Lint修复
```
pnpm lint
```

#### Lint检查
```
pnpm lint:check
```

### 代码提交
```
pnpm commit
```
