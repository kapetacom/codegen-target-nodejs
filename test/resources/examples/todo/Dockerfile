FROM node:19

ADD package.json /application/package.json
ADD package-lock.json /application/package-lock.json

WORKDIR /application

RUN npm install

ADD kapeta.yml /application/kapeta.yml
ADD index.ts /application/index.ts
ADD src /application/src

RUN npm run build

CMD [ "npm", "start" ]
