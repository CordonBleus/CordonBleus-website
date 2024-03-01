FROM alpine:3.19

RUN apk update
RUN apk add curl bash
RUN curl https://getcomposer.org/download/2.7.1/composer.phar -o /usr/bin/composer
RUN chmod +x /usr/bin/composer
RUN apk add php83 php83-bcmath php83-dom php83-ctype php83-curl php83-iconv php83-mbstring php83-openssl php83-phar \
    php83-pdo_pgsql php83-session php83-tokenizer php83-xml
RUN ln -sv /usr/bin/php83 /usr/bin/php
RUN curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.alpine.sh' | bash -
RUN apk add symfony-cli

WORKDIR /app
COPY . .

RUN composer install
CMD [ "symfony", "serve" ]