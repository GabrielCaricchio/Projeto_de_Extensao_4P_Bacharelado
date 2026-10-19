FROM node:22-alpine AS builder

WORKDIR /app

COPY front-end/package*.json ./
RUN npm ci

COPY front-end/ ./
RUN npm run build -- --configuration production

FROM nginx:alpine

RUN rm -f /etc/nginx/conf.d/default.conf
COPY front-end/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/front-end/browser/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
