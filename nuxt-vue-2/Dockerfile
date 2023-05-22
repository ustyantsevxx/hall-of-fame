FROM node:lts-alpine
WORKDIR /usr/src/app
RUN apk add curl
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn build
EXPOSE 3000
CMD [ "yarn", "start" ]