# Build stage
FROM node:lts as build-stage

WORKDIR /frontend

COPY . .

RUN npm install

RUN npm link @quasar/cli

RUN quasar build

# production stage
FROM nginx:stable as production-stage
COPY --from=build-stage /frontend/dist/spa /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
