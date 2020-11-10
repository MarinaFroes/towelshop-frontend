FROM node:12.19.0-alpine3.10 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . . 

RUN npm run build


FROM nginx:1.16.0-alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
