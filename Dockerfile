# https://docs.docker.com/develop/develop-images/multistage-build/#stop-at-a-specific-build-stage
# https://docs.docker.com/compose/compose-file/#target


# https://docs.docker.com/engine/reference/builder/#understand-how-arg-and-from-interact
ARG NODE_VERSION=14.18
ARG NGINX_VERSION=1.17


# "development" stage
FROM node:${NODE_VERSION} AS app_build

WORKDIR /usr/src/app

COPY . ./
RUN tar -xvzf public.tar.gz


# "nginx" stage
# depends on the "build" stage above
FROM nginx:${NGINX_VERSION}-alpine AS app_nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www/html

COPY --from=app_build /usr/src/app/public ./

EXPOSE 80
