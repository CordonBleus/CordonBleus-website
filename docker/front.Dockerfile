FROM alpine:3.19

RUN apk update
RUN apk add nodejs yarn

WORKDIR /app
COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

CMD [ "yarn", "dev" ]
