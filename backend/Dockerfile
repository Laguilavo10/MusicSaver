# Usar una imagen base más ligera para Python
FROM python:3.9-slim-buster

# Definir el directorio de trabajo
WORKDIR /app

# Instalar ffmpeg y limpiar la caché de apt para reducir tamaño de la imagen
RUN apt-get update && \
    apt-get install -y --no-install-recommends ffmpeg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copiar solo requirements para instalar dependencias primero (optimiza el caché de Docker)
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto
EXPOSE 8000

# Comando por defecto
CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]
