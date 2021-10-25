from flask import Blueprint
from flask import request
from flask import jsonify

from ..essentials.MongoConnector import MongoConnector

guildChannelRoutes = Blueprint("guildChannelRoutes", __name__)

#adding new channel to currently playing
@guildChannelRoutes.route("/addNewGuildChannel")
def addNewGuildChannel():

	args = request.args
	guild_id = args.get("g")
	channel_id = args.get("c")

	try:
		connector = MongoConnector()
		connector.addNewGuildChannel(guild_id, channel_id)

		response = {
			"status": 200
		}

		return jsonify(response)

	except Exception as e:		
		print(e)

		response = {

			"status": 500
		}

		return jsonify(response)

#get the id of the currently playing channel
@guildChannelRoutes.route("/getChannelId")
def getChannelId():
	
	args = request.args
	guild_id = args.get("g")

	connector = MongoConnector()
	
	try:

		result = connector.getChannelId(guild_id)

		if result != False:

			response = {
				"status": 200,
				"channelId": result
			}

		elif result == False:

			response = {
				"status": 404,
			}

		return jsonify(response)

	except Exception as e:

		print(e)

		response = {
			"status": 500
		}

		return jsonify(response)

#stop playing in a channel
@guildChannelRoutes.route("/destroyPlayer")
def destroyPlayer():

	args = request.args
	guild_id = args.get("g")

	try:

		connector = MongoConnector()
		connector.destroyPlayer(guild_id)

		response = {
			"status": 200,
		}

		return jsonify(response)

	except Exception as e:

		print(e)

		response = {
			"status": 500
		}

		return jsonify(response)
