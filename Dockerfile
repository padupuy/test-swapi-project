FROM node:12.4.0-alpine as build-deps

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --no-cache
COPY . ./
RUN yarn build

FROM nginx:1.17.0-alpine

COPY ./.cloud/docker/resources/ /
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
