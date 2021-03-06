import argparse
import json
import pymongo
from pymongo import MongoClient

import re

parser = argparse.ArgumentParser()
parser.add_argument("-g", "--server_id", help="Server ID for which the playlist is to be removed")
parser.add_argument("-n", "--name", help="Name of the Playlist to be removed")

args = parser.parse_args()

client = MongoClient()
db = client["rhapsody"]

try:
    server_list = db["info"]

    playlist_id = args.server_id + "-" + args.name
    server_info = server_list.find_one({"_id" : args.server_id})

    if len(list(filter(re.compile(f"(?i){args.name}").match, server_info["list_playlists"]))) > 0:
        actual_name = list(filter(re.compile(f"(?i){args.name}").match, server_info["list_playlists"]))[0]
        server_info["list_playlists"].remove(actual_name)
        server_info["num_playlists"] -= 1

        server_list.update_one({"_id" : args.server_id}, {"$set" : server_info})

        playlist = db[playlist_id.lower()]
        playlist.drop()

        print(json.dumps({
            "guildid": args.server_id,
            "name": actual_name
        }))


    else:
        print(json.dumps({
            "ecode": "E-2001"
        }))
        
        exit()

except Exception as e:
    print(e)
    print(json.dumps({
        "ecode": "E-2002",
        "error": str(e)
    }))
