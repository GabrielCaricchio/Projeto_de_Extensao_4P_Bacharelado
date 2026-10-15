# ==========================================
# Estágio 1: Build da aplicação Angular (Node 22)
# ==========================================
FROM nginx:alpine

# Nginx encaminha páginas e APIs ao Spring, que serve o Angular.
RUN rm -f /etc/nginx/conf.d/default.conf
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

