import argparse
import json
import pymongo
from pymongo import MongoClient

parser = argparse.ArgumentParser()
parser.add_argument("-g", "--server_id", help="Server ID for which the playlist is to be removed")
parser.add_argument("-n", "--name", help="Name of the Playlist to be removed")

args = parser.parse_args()

client = MongoClient()
db = client["Rhapsody"]

try:
    server_list = db["info"]

    playlist_id = args.server_id + "-" + args.name
    server_info = server_list.find_one({"_id" : args.server_id})

    if args.name in server_info["list_playlists"]:

        server_info["num_playlists"] -= 1
        server_info["list_playlists"].remove(args.name)

        server_list.update_one({"_id" : args.server_id}, {"$set" : server_info})

        playlist = db[playlist_id]
        playlist.drop()

        print(json.dumps({
            "guildid": args.server_id,
            "name": args.name
        }))


    else:
        print(json.dumps({
            "ecode": "E-2001"
        }))
        
        exit()

except pymongo.errors.PyMongoError as e:

    print(json.dumps({
        "ecode": "E-2003"
    }))