import spotipy
from utils.list_artists import list_artists

def search_track(token:str, track_id:str):
    sp = spotipy.Spotify(auth=token)
    results = sp.track(track_id=track_id)
    data = {
        "title": results['name'],
        "artist": list_artists(results['artists']),
        "album_artist": results['artists'][0]['name'], # "Jhay Wheeler ft. Mora
        "album": results['album']['name'],
        "tracknumber": str(results['track_number']),
        "date": str(results['album']['release_date'][:4]),
        "genre": "Latin",
        "cover": results['album']['images'][0]['url']
    }
    return data
