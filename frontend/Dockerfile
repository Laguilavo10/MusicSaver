# Usar una imagen base ligera de Node
FROM node:18.19.1-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Instalar solo dependencias de producción
ENV NODE_ENV=production

# Copiar solo archivos de dependencias primero para optimizar el caché
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production && \
    npm cache clean --force

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto 4200
EXPOSE 4200

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]
