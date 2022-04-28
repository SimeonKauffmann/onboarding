FROM node:12-alpine as build
WORKDIR /app
COPY ./package.json /app
RUN npm install
COPY . /app
RUN npm run build
FROM socialengine/nginx-spa
COPY --from=build /app/build /app