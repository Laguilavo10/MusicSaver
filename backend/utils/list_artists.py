def list_artists(array):
    artist_string = ''
    i = 0
    for artist in array:
        if(i == 1):
            artist_string = artist_string.rstrip(', ')
            artist_string += ' ft. '

        artist_string += artist['name'] + ', '
        i += 1
    artist_string = artist_string.rstrip(', ')
    return artist_string