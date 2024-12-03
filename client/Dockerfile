FROM node:20.14-alpine as build

WORKDIR /client

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 4000

CMD ["yarn", 'dev']