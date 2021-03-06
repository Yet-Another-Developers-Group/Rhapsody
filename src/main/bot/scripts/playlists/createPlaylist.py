import argparse

import pymongo
from pymongo import MongoClient

import json

parser = argparse.ArgumentParser()
parser.add_argument("-g", "--server_id", help="Server ID for which the new playlist is to be created")
parser.add_argument("-n", "--name", help="Name of the new Playlist to be created")

args = parser.parse_args()

client = MongoClient()
db = client["rhapsody"]

server_list = db["info"]

try:
    if server_list.count_documents({"_id" : args.server_id}, limit = 1) != 0:
        old_doc = server_list.find_one({"_id" : args.server_id})

        num_playlists = old_doc["num_playlists"] + 1
        
        list_playlists = old_doc["list_playlists"]

        if args.name in list_playlists:
            print(json.dumps({"ecode":"E-1003"}))
            exit()

        list_playlists.append(args.name)

        server_list.update_one({"_id" : args.server_id}, {"$set" : {"num_playlists" : num_playlists}})
        server_list.update_one({"_id" : args.server_id}, {"$set" : {"list_playlists" : list_playlists}})


    else:
        new_doc = {"_id" : args.server_id,
                "num_playlists" : 1,
                "list_playlists" : [args.name]}

        server_list.insert_one(new_doc)

    playlist_id = args.server_id + "-" + args.name.lower()
    playlist = db[playlist_id]

    info_doc = {"_id" : "info",
                "playlist_id" : playlist_id,
                "name" : args.name,
                "server_id" : args.server_id,
                "num_songs" : 0,
                "list_songs" : []}

    playlist.insert_one(info_doc)

    res = {
        "guildid": args.server_id,
        "name":args.name
    }

    res = json.dumps(res)

    print(res)

except pymongo.errors.PyMongoError as e:
    print(json.dumps({"ecode": "E-1001",
                      "error": str(e)}))

except Exception as e:
    print(json.dumps({"ecode": "E-1002",
                      "error": str(e)}))