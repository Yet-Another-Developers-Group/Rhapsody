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
db = client["Rhapsody"]

playlist_name = args.server_id + "-" + args.name

playlist = db[playlist_name]

song = json.loads(base64.urlsafe_b64decode(args.song_track_object).decode())

try:
    info_doc = playlist.find_one({"_id":"info"})

    num_songs = info_doc["num_songs"] + 1
    list_songs = info_doc["list_songs"]

    song["_id"] = num_songs - 1

    song_info = [song["info"]["title"], song["info"]["author"], song["info"]["uri"]]

    if song_info in list_songs:
        print("Duplicate Song")
        exit()

    else:
        list_songs.append(song_info)

    playlist.update_one({"_id" : "info"}, {"$set" : {"num_songs" : num_songs}})
    playlist.update_one({"_id" : "info"}, {"$set" : {"list_songs" : list_songs}})


    playlist.insert_one(song)

except Exception as e:
    print(e)