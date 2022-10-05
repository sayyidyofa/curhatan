FROM node:slim

WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN yarn install
RUN yarn build

EXPOSE 80

CMD ["node", "dist/server.js"]
