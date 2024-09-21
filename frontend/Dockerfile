# Usar una imagen base ligera
FROM node:18.19.1-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar solo los archivos de dependencias primero
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto de los archivos del proyecto
COPY . .

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]