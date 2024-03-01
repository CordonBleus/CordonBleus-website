FROM alpine:3.19

RUN apk update
RUN apk add nodejs yarn

WORKDIR /app
COPY . .

RUN yarn install

CMD [ "yarn", "dev" ]