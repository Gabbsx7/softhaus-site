FROM nginx:alpine

# Copiar arquivos do site
COPY . /usr/share/nginx/html/

# Copiar configuração do nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expor porta 80
EXPOSE 80

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"] 