FROM node:12.18.1-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install .
RUN npm install tsc -g
COPY . .


EXPOSE 3000

CMD [ "npm", "start" ]