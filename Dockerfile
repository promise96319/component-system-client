FROM node:alpine as dev

WORKDIR /usr/src/app

COPY package*.json .npmrc ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

RUN npm run start

# FROM node:alpine as prod

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_/ENV}

# WORKDIR /usr/src/app
# COPY --from=dev /usr/src/app/.next ./.next
# COPY --from=dev /usr/src/app/package.json .

# CMD ["npm", "run", "start"]

