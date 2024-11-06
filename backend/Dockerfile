# Usar una imagen base de Python
FROM python:3.9-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Instala FFmpeg
RUN apt-get update && apt-get install -y ffmpeg

# Copiar el archivo de requerimientos y el archivo .env
COPY requirements.txt ./
# COPY .env ./

# Instalar las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto
EXPOSE 8000

# Comando para iniciar la aplicación
# CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]
CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0"]