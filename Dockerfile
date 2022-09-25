# #  Stage 1 - build
# base image
FROM arm64v8/ubuntu:latest as build

# Create app directory
WORKDIR /app

# Install app dependencies
COPY . /app/
RUN apt update
RUN apt -y install nodejs npm
RUN npm install yarn

RUN yarn install --network-timeout=40000
RUN yarn add react-scripts -g
RUN yarn run build

# # stage 2 - deploy
FROM arm64v8/nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]