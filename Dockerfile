FROM node:alpine as dev

RUN npm install -g pnpm --registry=https://registry.npm.taobao.org/

WORKDIR /usr/src/app

COPY package*.json .npmrc ./

RUN pnpm install --registry=https://registry.npm.taobao.org/

COPY . .

EXPOSE 3000

RUN pnpm run build

CMD ["pnpm", "run", "start"]

