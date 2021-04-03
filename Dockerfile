FROM alpine

RUN apk update && apk upgrade
RUN apk add nodejs npm
RUN npm i -g yarn

COPY ./src /app/src
COPY ./static /app/static
COPY ./package.json /app/package.json
COPY ./tsconfig.json /app/tsconfig.json
COPY ./webpack.config.js /app/webpack.config.js
COPY ./yarn.lock /app/yarn.lock
WORKDIR /app

RUN yarn

RUN yarn build


CMD ["yarn", "start"]