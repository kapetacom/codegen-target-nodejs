FROM node:13.12

ADD package.json /application/package.json

WORKDIR /application

RUN npm config set @blockware:registry "https://europe-npm.pkg.dev/blockware-cloud/blockware-npm-public/"
RUN npm install

ADD blockware.yml /application/blockware.yml
ADD index.js /application/index.js
ADD src /application/src

CMD [ "npm", "start" ]
