FROM node:20.14-alpine  as builder

WORKDIR /server

COPY package*.json yarn.lock ./

RUN yarn install

COPY prisma ./prisma/

COPY . .

RUN npx prisma generate 

FROM builder as development 
 
ENV NODE_ENV=development


EXPOSE 3000

CMD ["yarn", "dev"]


