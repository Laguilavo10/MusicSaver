from moviepy.editor import *
from utils.config import pathSaveVideos, pathSaveMusic

def mp4_to_mp3(name):
    video = VideoFileClip(pathSaveVideos+name+'.mp4')
    audio = video.audio
    audio.write_audiofile(pathSaveMusic+name+'.mp3', logger=None, bitrate='128k', fps=44100)
    audio.close()
    video.close()

