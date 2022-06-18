import argparse
import re

import pymongo
from pymongo import MongoClient

import json

import base64

parser = argparse.ArgumentParser()
parser.add_argument("-g", "--server_id", help="Server ID for the server in which the playlist of the song is in")
parser.add_argument("-n", "--name", help="The playlist in which the song is in")

args = parser.parse_args()

client = MongoClient()
db = client["rhapsody"]

playlist_name = args.server_id + "-" + args.name

playlist = db[playlist_name.lower()]

song_list = []
actual_name = ""
try:
    ### Find song in playlist collection
    for song in playlist.find():
        if song["_id"] == "info":
            actual_name = song["name"]
            continue

        else:
            song_list.append(song["base64"])

    ### Response
    res = {
        "guild_id": args.server_id,
        "playlist": actual_name,
        "queue": song_list
    }

    res = json.dumps(res)
    print(res)

except Exception as e:
    print(json.dumps({"ecode": "E-5001",
                      "error": str(e)}))