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
		response = ***REMOVED***
			"status": 200
		***REMOVED***

		return jsonify(response)

	except Exception as e:
		response = ***REMOVED***
			"status": 500
		***REMOVED***

		return jsonify(response)

#test case for searching songs
@routes.route("/search")
def getResult():
	args = request.args
	search_term = args.get("t")

	result = GetResults.getResult(search_term) 

	response = ***REMOVED***
		"result": result
	***REMOVED***

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

		response = ***REMOVED***
			"status": 200
		***REMOVED***

		return jsonify(response)

	except Exception as e:		
		print(e)

		response = ***REMOVED***

			"status": 500
		***REMOVED***

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

			response = ***REMOVED***
				"status": 200,
				"channelId": result
			***REMOVED***

		elif result == False:

			response = ***REMOVED***
				"status": 404,
			***REMOVED***

		return jsonify(response)

	except Exception as e:

		print(e)

		response = ***REMOVED***
			"status": 500
		***REMOVED***

		return jsonify(response)

#stop playing in a channel
@routes.route("/destroyPlayer")
def destroyPlayer():

	args = request.args
	guild_id = args.get("g")

	try:

		connector = MongoConnector()
		connector.destroyPlayer(guild_id)

		response = ***REMOVED***
			"status": 200,
		***REMOVED***

		return jsonify(response)

	except Exception as e:
		response = ***REMOVED***
			"status": 500
		***REMOVED***

		return jsonify(response)

#return the queue
@routes.route("/getQueueList")
def getQueueList():

	args = request.args
	guild_id = args.get("g")

	try:
		connector = MongoConnector()
		queue = connector.getQueueList(guild_id)

		response = ***REMOVED***
			"status": 200,
			"queue":queue
		***REMOVED***

		return jsonify(response)

	except Exception as e:

		print(e)

		response = ***REMOVED***
			"status": 500
		***REMOVED***

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

		response = ***REMOVED***
			"status": 200
		***REMOVED***

		return jsonify(response)

	except Exception as e:
	
		print(e)

		response = ***REMOVED***
			"status": 500
		***REMOVED***

		return jsonify(response)

#removes a song from the queue
@routes.route("/removeFromQueue")
def removeFromQueue():

	args = request.args
	guild_id = args.get("g")
	index = args.get("pos")

	try:
		connector = MongoConnector()
		result = connector.removeFromQueue(guild_id, index)

		response = ***REMOVED***
			"status": result
		***REMOVED***

		return jsonify(response)

	except Exception as e:

		print(e)

		response = ***REMOVED***
			"status": 500
		***REMOVED***

		return jsonify(response)

#returns the next song in the queue
@routes.route("/advanceQueue")
def advanceQueue():

	args = request.args
	guild_id = args.get("g")

	try:

		connector = MongoConnector()
		result = connector.advanceQueue(guild_id)

		if result != "404":
			response = ***REMOVED***
				"status": 200,
				"nowPlaying": result
			***REMOVED***

		elif result == "404":
			response = ***REMOVED***
				"status": 404
			***REMOVED***

		return jsonify(response)

	except Exception as e:

		print(e)

		response = ***REMOVED***
			"status": 500
		***REMOVED***

		return jsonify(response)
