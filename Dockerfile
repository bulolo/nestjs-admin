FROM node:12-alpine AS dependencies
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --production

FROM node:12-alpine
WORKDIR /usr/src/app
COPY package.json dist ./
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
EXPOSE 3000
CMD [ "node", "dist/main" ]