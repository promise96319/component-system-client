# 组件库管理系统客户端

使用技术：

- 框架：Next.js
- 请求：SWR
- 组件库：@qt/design（公司内部组件库）

## 启动

```bash
# 安装依赖
# 建议使用 yarn，因为 pnpm 偶尔会出一些奇怪的问题，暂未解决。
yarn
# 启动
yarn run dev
```

在浏览器中打开 [http://localhost:3001](http://localhost:3001) 查看效果。

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## 开发

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
