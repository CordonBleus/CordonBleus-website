FROM alpine:3.19

RUN apk update
# Install Bash
RUN apk add bash

# Install cURL
RUN apk add curl

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
