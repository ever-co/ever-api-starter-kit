ARG NODE_OPTIONS
ARG NODE_ENV
ARG API_BASE_URL
ARG API_HOST
ARG API_PORT
ARG SENTRY_DSN
ARG DB_URI
ARG DB_HOST
ARG DB_NAME
ARG DB_PORT
ARG DB_USER
ARG DB_PASS
ARG DB_TYPE
ARG DB_SSL_MODE
ARG DB_CA_CERT
ARG DEMO
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION
ARG AWS_S3_BUCKET
ARG WASABI_ACCESS_KEY_ID
ARG WASABI_SECRET_ACCESS_KEY
ARG WASABI_REGION
ARG WASABI_SERVICE_URL
ARG WASABI_S3_BUCKET
ARG EXPRESS_SESSION_SECRET
ARG JWT_SECRET
ARG JWT_REFRESH_TOKEN_SECRET
ARG REFRESH_TOKEN_EXPIRATION_TIME
ARG MAIL_FROM_ADDRESS
ARG MAIL_HOST
ARG MAIL_PORT
ARG MAIL_USERNAME
ARG MAIL_PASSWORD
ARG FILE_PROVIDER
ARG UNLEASH_APP_NAME
ARG UNLEASH_API_URL
ARG UNLEASH_INSTANCE_ID
ARG UNLEASH_REFRESH_INTERVAL
ARG UNLEASH_METRICS_INTERVAL
ARG UNLEASH_API_KEY
ARG PM2_PUBLIC_KEY
ARG PM2_SECRET_KEY
ARG PM2_MACHINE_NAME
ARG IS_DISABLE_AUTH

FROM node:18-alpine3.16 AS dependencies

LABEL maintainer="ever@ever.co"
LABEL org.opencontainers.image.source https://github.com/ever-co/ever-ever-api-starter-kit

ENV CI=true

# Set Python interpreter for `node-gyp` to use
ENV PYTHON /usr/bin/python

RUN apk --update add bash && apk add libexecinfo libexecinfo-dev && npm i -g npm \
	&& apk add --no-cache --virtual build-dependencies curl jq py3-configobj py3-pip py3-setuptools python3 python3-dev build-base \
	snappy libheif dos2unix gcc g++ snappy-dev git libgcc libstdc++ linux-headers autoconf automake make nasm vips-dev vips

RUN npm install --quiet node-gyp@9.3.1 -g
RUN npm install yarn -g --force
RUN mkdir /srv/ever-api-starter-kit && chown -R node:node /srv/ever-api-starter-kit

COPY wait .deploy/api/entrypoint.prod.sh .deploy/api/entrypoint.compose.sh /
RUN chmod +x /wait /entrypoint.prod.sh /entrypoint.compose.sh && dos2unix /entrypoint.prod.sh && dos2unix /entrypoint.compose.sh

USER node:node

WORKDIR /srv/ever-api-starter-kit

COPY --chown=node:node package.json yarn.lock ./

# TODO: add --production and figure out why we are getting error about 'nest not found'
RUN yarn install --network-timeout 1000000 --frozen-lockfile && yarn cache clean

# development
FROM node:18-alpine3.16 AS development

USER node:node

WORKDIR /srv/ever-api-starter-kit

COPY --chown=node:node --from=dependencies /wait /entrypoint.prod.sh /entrypoint.compose.sh /
COPY --chown=node:node --from=dependencies /srv/ever-api-starter-kit .
COPY . .

# build
FROM node:18-alpine3.16 AS build

WORKDIR /srv/ever-api-starter-kit

RUN mkdir dist

COPY --chown=node:node --from=development /srv/ever-api-starter-kit .

ENV NODE_OPTIONS=${NODE_OPTIONS:-"--max-old-space-size=4000"}
ENV NODE_ENV=${NODE_ENV:-production}
ENV DEMO=${DEMO:-false}

ENV IS_DOCKER=true

RUN yarn build:prod

# production
FROM node:18-alpine3.16 AS production

WORKDIR /srv/ever-api-starter-kit

COPY --chown=node:node --from=dependencies /wait ./wait
COPY --chown=node:node --from=dependencies /entrypoint.prod.sh .
COPY --chown=node:node --from=dependencies /entrypoint.compose.sh .
COPY --chown=node:node --from=dependencies /srv/ever-api-starter-kit/node_modules ./node_modules/
COPY --chown=node:node --from=build /srv/ever-api-starter-kit/dist .

RUN npm install pm2@4.5.1 -g && \
	mkdir /import && chown node:node /import && \
	touch ormlogs.log && chown node:node ormlogs.log && chown node:node wait && \
	chmod +x wait && chown -R node:node ./

USER node:node

ENV NODE_OPTIONS=${NODE_OPTIONS:-"--max-old-space-size=4000"}
ENV NODE_ENV=${NODE_ENV:-production}
ENV API_HOST=${API_HOST:-api}
ENV API_PORT=${API_PORT:-3005}
ENV API_BASE_URL=${API_BASE_URL:-http://localhost:3005}
ENV SENTRY_DSN=${SENTRY_DSN}
ENV DB_URI=${DB_URI}
ENV DB_HOST=${DB_HOST:-db}
ENV DB_NAME=${DB_NAME:-postgres}
ENV DB_PORT=${DB_PORT:-5432}
ENV DB_USER=${DB_USER}
ENV DB_PASS=${DB_PASS}
ENV DB_TYPE=${DB_TYPE:-sqlite}
ENV DB_SSL_MODE=${DB_SSL_MODE}
ENV DB_CA_CERT=${DB_CA_CERT}
ENV DEMO=${DEMO:-false}
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
ENV AWS_REGION=${AWS_REGION}
ENV AWS_S3_BUCKET=${AWS_S3_BUCKET}
ENV WASABI_ACCESS_KEY_ID=${WASABI_ACCESS_KEY_ID}
ENV WASABI_SECRET_ACCESS_KEY=${WASABI_SECRET_ACCESS_KEY}
ENV WASABI_REGION=${WASABI_REGION}
ENV WASABI_SERVICE_URL=${WASABI_SERVICE_URL}
ENV WASABI_S3_BUCKET=${WASABI_S3_BUCKET}
ENV EXPRESS_SESSION_SECRET=${EXPRESS_SESSION_SECRET:-everSecret}
ENV JWT_SECRET=${JWT_SECRET:-secretKey}
ENV JWT_REFRESH_TOKEN_SECRET=${JWT_REFRESH_TOKEN_SECRET:-refreshSecretKey}
ENV REFRESH_TOKEN_EXPIRATION_TIME=${REFRESH_TOKEN_EXPIRATION_TIME:-86400}
ENV MAIL_FROM_ADDRESS=${MAIL_FROM_ADDRESS}
ENV MAIL_HOST=${MAIL_HOST}
ENV MAIL_PORT=${MAIL_PORT}
ENV MAIL_USERNAME=${MAIL_USERNAME}
ENV MAIL_PASSWORD=${MAIL_PASSWORD}
ENV FILE_PROVIDER=${FILE_PROVIDER}
ENV UNLEASH_APP_NAME=${UNLEASH_APP_NAME}
ENV UNLEASH_API_URL=${UNLEASH_API_URL}
ENV UNLEASH_INSTANCE_ID=${UNLEASH_INSTANCE_ID}
ENV UNLEASH_REFRESH_INTERVAL=${UNLEASH_REFRESH_INTERVAL}
ENV UNLEASH_METRICS_INTERVAL=${UNLEASH_METRICS_INTERVAL}
ENV UNLEASH_API_KEY=${UNLEASH_API_KEY}
ENV PM2_PUBLIC_KEY=${PM2_PUBLIC_KEY}
ENV PM2_SECRET_KEY=${PM2_SECRET_KEY}
ENV PM2_MACHINE_NAME=${PM2_MACHINE_NAME}
ENV IS_DISABLE_AUTH=${IS_DISABLE_AUTH}

EXPOSE ${API_PORT}

ENTRYPOINT [ "./entrypoint.prod.sh" ]

CMD [ "node", "main.js" ]
