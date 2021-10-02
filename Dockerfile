FROM node

WORKDIR /usr/src/app
COPY package*.json ./
COPY nodemon.json ./
COPY tsconfig.json ./

EXPOSE 80

CMD npm install \
    && npm run start
