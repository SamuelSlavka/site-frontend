# base image
FROM node:16-alpine3.14

# Create app directory
WORKDIR /usr/src
# Install app dependencies
COPY package*.json ./

RUN yarn install --production=false

# add app
WORKDIR /app
COPY . /app

EXPOSE 3000

CMD ["yarn", "start", "dev"]