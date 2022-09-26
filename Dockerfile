# #  Stage 1 - build
# base image
FROM alpine:latest as build

# Create app directory
WORKDIR /app

# Install app dependencies
COPY . /app/
RUN apk add --update npm
RUN npm install --global yarn
RUN set -ex; \
  yarn install --network-timeout=400000 --frozen-lockfile --production; \
  yarn run build; \
  yarn cache clean; \
  yarn run build

# # stage 2 - deploy
FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]