from flask import Blueprint
from flask import request
from flask import render_template
from flask import jsonify

from MongoConnector import MongoConnector
import GetResults

routes = Blueprint(__name__, "routes")

#home
@routes.route("/")
def home():

	try:
		response = {
			"status": 200
		}

		return jsonify(response)

	except Exception as e:
		response = {
			"status": 500
		}

		return jsonify(response)

#test case for searching songs
@routes.route("/search")
def getResult():
	args = request.args
	search_term = args.get("t")

	result = GetResults.getResult(search_term) 

	response = {
		"result": result
	}

	return jsonify(response)

#adding new channel to currently playing
@routes.route("/addNewGuildChannel")
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
@routes.route("/getChannelId")
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
@routes.route("/destroyPlayer")
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
		response = {
			"status": 500
		}

		return jsonify(response)

#return the queue
@routes.route("/getQueueList")
def getQueueList():

	try:
		response = {
			"status": 200,
			"queue":[["title", "url", "thumbnail"]]
		}

		return jsonify(response)

	except Exception as e:
		response = {
			"status": 500
		}

		return jsonify(response)

#searches and adds song to queue
@routes.route("/addToQueue")
def addToQueue():
	
	args = request.args
	guild_id = args.get("g")
	term = args.get("n")

	try:
		
		connector = MongoConnector()
		connector.addToQueue(guild_id, term)

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

#removes a song from the queue
@routes.route("/removeFromQueue")
def removeFromQueue():

	try:
		response = {
			"status": 200
		}

		return jsonify(response)

	except Exception as e:
		response = {
			"status": 500
		}

		return jsonify(response)

#returns the next song in the queue
@routes.route("/advanceQueue")
def advanceQueue():

	args = request.args
	guild_id = args.get("g")

	try:

		connector = MongoConnector()
		result = connector.advanceQueue()

		response = {
			"status": 200,
			"nowPlaying": result
		}

		return jsonify(response)

	except Exception as e:

		print(e)

		response = {
			"status": 500
		}

		return jsonify(response)
