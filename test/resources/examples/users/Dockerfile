FROM node:19

ADD package.json /application/package.json

WORKDIR /application

RUN npm install

ADD kapeta.yml /application/kapeta.yml
ADD index.ts /application/index.ts
ADD src /application/src

CMD [ "npm", "start" ]
