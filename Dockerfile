# #  Stage 1 - build
# base image
FROM node:12-alpine as build

# Create app directory
WORKDIR /app

# Install app dependencies
COPY . /app/
# RUN apk --no-cache add nodejs yarn --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community
    
RUN apk --no-cache --virtual build-dependencies add \
      python3 \
      make \
      g++ \
  && yarn install --production \
  && yarn run build \
  && apk del build-dependencies

# # stage 2 - deploy
FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]