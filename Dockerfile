# #  Stage 1 - build
# base image
FROM node:alpine as build

# Create app directory
WORKDIR /app

# Install app dependencies
COPY . /app/
# RUN apk --no-cache add nodejs yarn --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community
# RUN apk add --update npm
# RUN npm install --global yarn
RUN yarn install --prefer-offline --frozen-lockfile --network-timeout=400000
RUN yarn add react-scripts -g
RUN yarn run build

# # stage 2 - deploy
FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]