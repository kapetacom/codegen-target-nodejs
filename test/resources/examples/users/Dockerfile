FROM node:13.12

ADD package.json /application/package.json

WORKDIR /application

RUN npm install

ADD block.yml /application/block.yml
ADD index.js /application/index.js
ADD src /application/src

CMD [ "npm", "start" ]
