# #  Stage 1 - build
# base image
FROM node:16-alpine3.14 as build

# Create app directory
WORKDIR /app

# Install app dependencies
COPY . /app/

RUN yarn install
RUN yarn add react-scripts -g
RUN yarn run build

# # stage 2 - deploy
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]