FROM alpine:3.19

RUN apk update
# Install Bash
RUN apk add bash

# Install cURL
RUN apk add curl

# Install PHP 8.3 and extensions
RUN apk add php83 php83-bcmath php83-dom php83-ctype php83-curl php83-iconv php83-mbstring php83-openssl \
    php83-phar php83-pdo_pgsql php83-session php83-tokenizer php83-xml
RUN ln -sv /usr/bin/php83 /usr/bin/php

# Install Symfony CLI
RUN curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.alpine.sh' | bash -
RUN apk add symfony-cli

# Install NodeJS
RUN apk add nodejs

# Install Yarn
RUN apk add yarn

COPY <<-"EOF" /bin/docker-entrypoint.sh
#!/bin/bash
umask 0000
/bin/bash
EOF
RUN chmod +x /bin/docker-entrypoint.sh

WORKDIR /app

ENTRYPOINT [ "/bin/docker-entrypoint.sh" ]