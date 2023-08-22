FROM node:alpine as dev

RUN npm install -g pnpm --registry=https://registry.npm.taobao.org/

WORKDIR /usr/src/app

COPY package*.json .npmrc ./

RUN pnpm install --registry=https://registry.npm.taobao.org/

COPY . .

EXPOSE 3000

RUN npm run build

FROM node:alpine as prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_/ENV}

WORKDIR /usr/src/app
COPY --from=dev /usr/src/app/.next ./.next
COPY --from=dev /usr/src/app/package.json .

CMD ["npm", "run", "start"]

