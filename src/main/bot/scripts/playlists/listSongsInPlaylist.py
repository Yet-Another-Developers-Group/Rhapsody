import argparse

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

playlist = db[playlist_name]

try:
    ### Find song in playlist collection
    info = playlist.find_one({"_id": "info"})

    ### Response
    res = {
        "guild_id": args.server_id,
        "playlist": args.name,
        "song": info["list_songs"]
    }

    res = json.dumps(res)
    print(res)

except Exception as e:
    print(e)