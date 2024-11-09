# Usar una imagen base ligera de Node
FROM node:18.19.1-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Instalar solo dependencias de producción
# ENV NODE_ENV=production

# Instalar Angular CLI globalmente
RUN npm install -g @angular/cli

# Copiar solo archivos de dependencias primero para optimizar el caché
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto 4200
EXPOSE 4200

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]
# CMD ["npm", "run", "dev", "--", "--port", "4200", "-c", "production"]
