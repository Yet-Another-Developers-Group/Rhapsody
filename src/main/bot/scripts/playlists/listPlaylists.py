import argparse
from flask import jsonify

import pymongo
from pymongo import MongoClient

import json

parser = argparse.ArgumentParser()
parser.add_argument("-g", "--server_id", help="Server ID for which the new playlist is to be created")

args = parser.parse_args()

client = MongoClient()
db = client["Rhapsody"]

server_list = db["info"]

try:
    if server_list.count_documents({"_id" : args.server_id}, limit = 1) != 0:
        doc = server_list.find_one({"_id" : args.server_id})

        list_of_playlists = doc["list_playlists"]

        print(json.dumps({
            "guildid": args.server_id,
            "playlists": list_of_playlists
        }))

    else:
        print(json.dumps({
            "ecodes": "E-6001"
        }))

except Exception as e:
    print(json.dumps({
        "ecodes": "E-6002"
    }))
 