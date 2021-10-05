from flask import Blueprint
from flask import request
from flask import jsonify

from ..essentials.MongoConnector import MongoConnector
from ..essentials import GetResults

playlistRoutes = Blueprint("playlistRoutes", __name__)

#Creates a playlist
@playlistRoutes.route("/createPlaylist")
def createPlaylist():
    args = request.args
    guild_id = args.get("g")
    playlistName = args.get("n")

    try:
        response = {
            "status": 200
        }

        return jsonify(response)

    except Exception as e:
        response = {
            "status": 500
        }