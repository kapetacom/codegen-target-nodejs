FROM node:20

ADD package.json /application/package.json

WORKDIR /application

RUN npm install

ADD kapeta.yml /application/kapeta.yml
ADD index.js /application/index.js
ADD src /application/src

CMD [ "npm", "start" ]
