
# native
import requests
from io import BytesIO
import json

# fastapi
from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
# from starlette.middleware.authentication import AuthenticationMiddleware

# pytube and mutagen
from pytubefix import YouTube, Search
from pydub import AudioSegment
from mutagen.mp3 import MP3
from mutagen.id3 import ID3, APIC, TIT2, TRCK, TCON, TALB, TPE1, TPE2, TYER

# utils
from utils.search_track import search_track


app = FastAPI()

origins = [
    "http://localhost:5173"
]
# app.add_middleware(AuthenticationMiddleware)


@app.middleware("http")
async def extract_code(req: Request, call_next):
    try:
        req.state.access_token = req.headers['authorization'].split()[1]
        response = await call_next(req)
        return response
    except Exception as e:
        return Response(status_code=404, content=f"No token provided:{e}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Track(BaseModel):
    trackId: str

@app.post("/search/track")
async def search_song(body: Track, req: Request):
    try:
        token = req.state.access_token
        id= body.trackId
        track = search_track(token=token, track_id=id)
        searchedSong = Search(
            f'cancion {track["title"]} - {track["artist"]}')
        videoId = searchedSong.results[0].video_id
        options  = {
            "id": id,
            "title": track["title"],
            "videoId": videoId
        }
        return Response(status_code=200, content=json.dumps(options), media_type="application/json")
    except Exception as error:
        print('Ha habido un error : ', error)
        return Response(status_code=500, content=f"Error:{error}")


class Tracks(BaseModel):
    tracksId: list[str]


@app.post("/download")
async def search_song(body: Tracks, req: Request):
    try:
        token = req.state.access_token
        for id in body.tracksId:
            track = search_track(token=token, track_id=id)
            buffer = BytesIO()
            searchedSong = Search(
                f'{track["title"]} - {track["artist"]} letra')
            video_id = searchedSong.videos[0].video_id
            # In pytubefix 8.0.0 the client parameter is required to avoid bot detection
            video = YouTube(f"https://www.youtube.com/watch?v={video_id}",client='MWEB')
            videoStream = video.streams.get_audio_only()
            videoStream.stream_to_buffer(buffer)
            buffer.seek(0)
            # Convert the buffer to an AudioSegment
            audio = AudioSegment.from_file(buffer, format="mp4")
            # Create a buffer for the MP3 file
            mp3_buffer = BytesIO()
            # Export the AudioSegment as an MP3 file
            audio.export(mp3_buffer, format="mp3")
            # Ensure the buffer is at the correct position for reading
            mp3_buffer.seek(0)

            audio_mp3 = MP3(mp3_buffer, ID3=ID3)
            # Add the metadata to the MP3 file
            audio_mp3.tags.add(TIT2(encoding=3, text=track["title"]))  # title
            audio_mp3.tags.add(
                TPE1(encoding=3, text=track["artist"]))  # artists
            audio_mp3.tags.add(
                TPE2(encoding=3, text=track["album_artist"]))  # album artist
            audio_mp3.tags.add(TALB(encoding=3, text=track["album"]))  # album
            audio_mp3.tags.add(
                TRCK(encoding=3, text=track["tracknumber"]))  # tracknumber
            audio_mp3.tags.add(
                TYER(encoding=3, text=track["date"]))  # yeardate
            audio_mp3.tags.add(TCON(encoding=3, text=track["genre"]))  # genre

            cover = track["cover"]
            response = requests.get(cover)
            imagedata = response.content
            audio_mp3.tags.add(APIC(
                enconding=3,  # 3 is for utf-8
                mime='image/jpeg',  # image/jpeg
                type=3,  # 3 is for the cover image
                data=imagedata
            )
            )

            audio_mp3.save(mp3_buffer, v2_version=3)
            mp3_buffer.seek(0)

            return StreamingResponse(mp3_buffer, media_type="audio/mp3")

    except Exception as error:
        print("error", error)
        return Response(status_code=400, content=f"Error:{error}")

# #############
# # source env/Scripts/activate
# # uvicorn main:app --reload
