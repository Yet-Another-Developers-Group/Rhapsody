import argparse

import pymongo
from pymongo import MongoClient

import json

import base64

### Prelims
parser = argparse.ArgumentParser()
parser.add_argument("-g", "--server_id", help="Server ID for which the playlist to add the song to has been added")
parser.add_argument("-n", "--name", help="The playlist to which the song to has been added")
parser.add_argument("-s", "--song_position", help="The position of the song, that has to be removed, in the playlist")

args = parser.parse_args()

client = MongoClient()
db = client["rhapsody"]

playlist_name = args.server_id + "-" + args.name

playlist = db[playlist_name]

pos = int(args.song_position) 

try:

    ### Get required info
    info_doc = playlist.find_one({"_id":"info"})
    list_songs = info_doc["list_songs"]
    num_songs = info_doc["num_songs"]

    song = list_songs[pos]

    ### Remove song from info doc
    list_songs.remove(list_songs[pos])
    num_songs -= 1

    ### Delete song object
    playlist.delete_one({"_id": pos})

    ### Update _id of all other songs
    for song in list_songs:
        playlist.update_one({"uri": song[2]}, {"$set":{"_id": list_songs.index(song)}})

    ### Update info doc
    playlist.update_one({"_id": "info"}, {"$set":{"list_songs": list_songs}})
    playlist.update_one({"_id": "info"}, {"$set":{"num_songs": num_songs}})

    ### Response
    res = {
        "guild_id": args.server_id,
        "name": args.name,
        "track": song[0]
    }

    res = json.dumps(res)
    print(res)

except Exception as e:
    print(e)