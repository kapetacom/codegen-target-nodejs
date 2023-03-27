FROM node:19

ADD package.json /application/package.json

WORKDIR /application

RUN npm config set @kapeta:registry "https://europe-npm.pkg.dev/kapeta-cloud/kapeta-npm-public/"
RUN npm install

ADD kapeta.yml /application/kapeta.yml
ADD index.js /application/index.js
ADD src /application/src

CMD [ "npm", "start" ]
