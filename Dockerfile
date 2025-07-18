FROM nginx:alpine

# Copiar arquivos do site
COPY . /usr/share/nginx/html/

# Copiar configuração nginx customizada
COPY nginx.conf /etc/nginx/nginx.conf

# Expor porta 80
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"] 