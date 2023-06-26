# 组件库管理系统客户端

使用技术：

- 框架：Next.js
- 请求：SWR
- 组件库：@qt/design（公司内部组件库）

## 启动

```bash
# 安装依赖
# 建议使用 yarn，因为用 pnpm 会出一些问题，暂未排查相关原因。
yarn
# 启动
yarn run dev
```

在浏览器中打开 [http://localhost:3001](http://localhost:3001) 查看效果。

## 开发

### 目录

`src` 目录下的文件结构如下：

```js
.
├── app
│   ├── _components // layout 对应的组件
│   ├── admin  // 管理模块
│   ├── auth   // 登录模块
│   ├── docs   // 文档模块
│   ├── error  // 错误模块
│   ├── favicon.ico
│   ├── globals.scss // 全局样式
│   └── layout.tsx  // 布局组件
├── assets  // 静态资源
├── components // 全局公用组件
├── hooks // 通用 hooks
├── services // 请求服务
│   ├── index.ts
│   ├── api-doc.ts
│   ├── component.ts
│   ├── demand.ts
│   ├── design-doc.ts
│   ├── discussion.ts
│   ├── index.ts
│   ├── user.ts
│   ├── version.ts
│   └── common // 通用内容
│       ├── fetch.client.ts // 客户端请求函数
│       ├── fetch.server.ts // 服务端请求函数
│       └── type.d.ts  // 数据库模型对应的类型
└── utils // 通用工具函数
```

### 请求方法

项目内请求分为两种：

- 一种请求是用于服务端组件，通过 `serverFetch` 方法进行请求数据，直接返回相应的结果。。
- 另一种请求适用于客户端组件，通过 `swr` 封装，使用 `useFetch` 钩子进行请求，返回 `data` 和 `error` 等信息。

在 `service` 文件中定义接口时，注意区分这两种请求。

### 请求数据类型

为了方便开发，在 `service` 里定义了 `type.d.ts` 文件，该文件是服务端项目通过 `npx prisma generate` 生成的类型文件。

### 路由

该项目采用的是 `Next.js` 的 `App Router`，详细使用方法见 [官方路由文档](https://nextjs.org/docs/app/building-your-application/routing)

## 部署

```bash
docker-compose up -d
```

默认会部署到 `37021` 端口。

## 资料

- [SWR](https://swr.vercel.app/)
- [Server Component](https://nextjs.org/docs/getting-started/react-essentials)

