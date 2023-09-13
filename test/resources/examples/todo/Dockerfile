FROM node:19 as build-env

ADD package.json /application/package.json
ADD package-lock.json /application/package-lock.json

WORKDIR /application

RUN npm install

ADD db /application/db
ADD tsconfig.json /application/tsconfig.json
ADD kapeta.yml /application/kapeta.yml
ADD index.ts /application/index.ts
ADD src /application/src

RUN npm run build
ADD src /application/src

FROM gcr.io/distroless/nodejs20-debian11
COPY --from=build-env /application /application
WORKDIR /application

HEALTHCHECK --interval=5s --timeout=15s --start-period=5s --retries=10 CMD curl --fail http://localhost:80/__kapeta/health || exit 1

CMD [ "npm", "start" ]
