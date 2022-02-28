import argparse

from pymongo import MongoClient

parser = argparse.ArgumentParser()
parser.add_argument("-s", "--server_id", help="Server ID for which the playlist is to be removed")
parser.add_argument("-n", "--name", help="Name of the Playlist to be removed")

args = parser.parse_args()

client = MongoClient()
db = client["Rhapsody"]

server_list = db["info"]

playlist_id = args.server_id + "-" + args.name
server_info = server_list.find_one({"_id" : args.server_id})

if args.name in server_info["list_playlists"]:

    server_info["num_playlists"] -= 1
    server_info["list_playlists"].remove(args.name)

    server_list.update_one({"_id" : args.server_id}, {"$set" : server_info})

    playlist = db[playlist_id]
    playlist.drop()


else:
    print(f"The Playlist {args.name} does not exist in this server")
    exit()