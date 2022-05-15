import argparse

import pymongo
from pymongo import MongoClient

import json

import base64

parser = argparse.ArgumentParser()
parser.add_argument("-g", "--server_id", help="Server ID for which the playlist to add the song to has been added")
parser.add_argument("-n", "--name", help="The playlist to which the song to has been added")
parser.add_argument("-s", "--song_track_object", help="The lavalink track object of the track to be added to the playlist")

args = parser.parse_args()

client = MongoClient()
db = client["rhapsody"]

playlist_name = args.server_id + "-" + args.name.strip()

playlist = db[playlist_name]

song_doc = json.loads(base64.urlsafe_b64decode(args.song_track_object).decode())
song_doc["base64"] = args.song_track_object

try:

    ### Prelims
    info_doc = playlist.find_one({"_id":"info"})
    if info_doc is None:
            print(json.dumps({"ecode":"E-3001"}))
            exit()
    ### Updating info doc
    num_songs = info_doc["num_songs"] + 1
    list_songs = info_doc["list_songs"]

    song_doc["_id"] = num_songs - 1

    song_info = [song_doc["info"]["title"], song_doc["info"]["author"], song_doc["info"]["length"]]

    if song_info in list_songs:
        print(json.dumps({"ecode":"E-3004"}))
        exit()

    else:
        list_songs.append(song_info)

    playlist.update_one({"_id" : "info"}, {"$set" : {"num_songs" : num_songs}})
    playlist.update_one({"_id" : "info"}, {"$set" : {"list_songs" : list_songs}})

    ### Add song object to playlist
    playlist.insert_one(song_doc)

    res = {
        "guild_id": args.server_id,
        "name": args.name,
        "track": song_info[0]
    }

    res = json.dumps(res)
    print(res)

except Exception as e:
    print(e)