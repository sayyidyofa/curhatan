FROM node

WORKDIR /usr/src/app
COPY package*.json ./
COPY nodemon.json ./
COPY tsconfig.json ./
RUN npm install -g yarn

EXPOSE 80

CMD yarn install \
    && yarn start
