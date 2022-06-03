import argparse

import pymongo
from pymongo import MongoClient

import json

import base64

parser = argparse.ArgumentParser()
parser.add_argument("-g", "--server_id", help="Server ID for the server in which the playlist of the song is in")
parser.add_argument("-n", "--name", help="The playlist in which the song is in")
parser.add_argument("-s", "--song_index", help="The index of the song in the playlist")

args = parser.parse_args()

client = MongoClient()
db = client["rhapsody"]

playlist_name = args.server_id + "-" + args.name

playlist = db[playlist_name]
song_idx = int(args.song_index)

try:
    ### Find song in playlist collection
    song = playlist.find_one({"_id": song_idx})
    song_b64 = song["base64"]

    ### Response
    res = {
        "guild_id": args.server_id,
        "playlist": args.name,
        "song": song_b64
    }

    res = json.dumps(res)
    print(res)

except Exception as e:
    print(json.dumps({

        "ecode": "E-6001",
        "error": str(e)

    }))