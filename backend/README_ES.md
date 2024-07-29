# Descarga Música de Spotify

Este proyecto es una herramienta de línea de comandos que permite descargar tus canciones guardadas de Spotify como archivos MP3. Utiliza la API de Spotify para obtener los datos de las canciones y luego descarga las canciones de YouTube. También añade metadatos a los archivos MP3, como el título de la canción, el artista, el álbum, el número de pista y la portada del álbum.

## Cómo usar

1. Clona este repositorio en tu máquina local.

```
git clone 
```
2. Instala las dependencias del proyecto.
```
pip install -r requirements.txt
```
3. Configura tus credenciales de Spotify. Necesitarás un `SPOTIPY_CLIENT_ID`, `SPOTIPY_CLIENT_SECRET` y `SPOTIPY_REDIRECT_URI`. Puedes obtener estos creando una aplicación en el Dashboard de Desarrolladores de Spotify. Luego, añade tus credenciales a un archivo `.env` en la raíz del proyecto.

```
SPOTIPY_CLIENT_ID=
SPOTIPY_CLIENT_SECRET=
SPOTIPY_REDIRECT_URI=
```
4. Configura las rutas de guardado para la música y los vídeos en el archivo `.env`.
```
PATH_SAVE_MUSIC=
PATH_SAVE_VIDEO_MUSIC=
```
5. Ejecuta el script principal.
```
py main.py
```

El script descargará las canciones guardadas en tu biblioteca de Spotify, las convertirá a MP3 y añadirá los metadatos correspondientes.


## Aviso Legal y Exención de Responsabilidad

Este proyecto se ha desarrollado con fines educativos y de aprendizaje. No se recomienda ni respalda su uso para la comercialización, distribución no autorizada de música o cualquier actividad ilegal. La utilización de este proyecto está sujeta a las leyes de derechos de autor y condiciones de servicio de las plataformas involucradas, como Spotify y YouTube.

El creador y los contribuyentes de este proyecto no asumen ninguna responsabilidad por el uso indebido, ilegal o no autorizado de esta herramienta por parte de terceros. Cualquier acción tomada con base en el código, la información proporcionada o las funcionalidades de este proyecto se realiza bajo la responsabilidad individual del usuario.

Además, se exime de cualquier responsabilidad derivada de daños, pérdidas o consecuencias legales que puedan surgir por el uso de este software de manera inapropiada o en violación de los términos y condiciones establecidos por las plataformas de terceros involucradas.

Por lo tanto, al utilizar este proyecto, el usuario acepta plenamente la responsabilidad de cumplir con todas las leyes y regulaciones aplicables y utilizarlo únicamente de acuerdo con los términos de servicio de las plataformas pertinentes y la legislación vigente en su jurisdicción.

