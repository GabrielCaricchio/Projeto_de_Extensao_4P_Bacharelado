# ==========================================
# Estágio 1: Build da aplicação Angular (Node 22)
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copia dependências primeiro para cache do Docker
COPY frontend/package*.json ./
RUN npm install

# Copia código-fonte e executa o build de produção
COPY frontend/ ./
RUN npm run build -- --configuration production

# ==========================================
# Estágio 2: Servidor Web Nginx
# ==========================================
FROM nginx:alpine

# Remove configuração padrão do Nginx
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# Copia arquivo de configuração customizado com roteamento SPA
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos compilados do Angular
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html

# Expõe a porta 80 e 4200
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

