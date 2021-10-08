FROM node:14.16.0
LABEL maintainer="Murilo Laface"
COPY  . /var/www
WORKDIR /var/www
RUN npm i
RUN npm ci
RUN yarn test:function
RUN yarn test:unit
ENTRYPOINT yarn start:dev