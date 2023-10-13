FROM node:alpine as dev

RUN npm install -g pnpm --registry=https://registry.npm.taobao.org/

WORKDIR /usr/src/app

COPY package*.json .npmrc ./

RUN pnpm install --registry=https://registry.npm.taobao.org/

COPY . .

EXPOSE 3000

RUN pnpm run build

RUN rm -rf node_modules

RUN pnpm install --registry=https://registry.npm.taobao.org/ --production --frozen-lockfile --offline

FROM node:alpine as prod

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --from=dev /usr/src/app/node_modules ./node_modules
COPY --from=dev /usr/src/app/.next ./.next
COPY --from=dev /usr/src/app/package.json ./package.json
COPY --from=dev /usr/src/app/public ./public

RUN npm install -g pnpm --registry=https://registry.npm.taobao.org/

CMD ["pnpm", "run", "start"]

