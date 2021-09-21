from flask import Blueprint
from flask import request
from flask import render_template
from flask import jsonify

import mongo_methods
from request_methods import GetResults

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

#get the id of the currently playing channel
@routes.route("/getChannelId")
def getChannelId():

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

#stop playing in a channel
@routes.route("/destroyPlayer")
def destroyPlayer():

	try:
		response = ***REMOVED***
			"status": 200,
			"channelId": "test"
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

	try:
		response = ***REMOVED***
			"status": 200,
			"queue":[["title", "url", "thumbnail"]]
		***REMOVED***

		return jsonify(response)

	except Exception as e:
		response = ***REMOVED***
			"status": 500
		***REMOVED***

		return jsonify(response)

#searches and adds song to queue
@routes.route("/addToQueue")
def addToQueue():

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

#removes a song from the queue
@routes.route("/removeFromQueue")
def removeFromQueue():

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

#returns the next song in the queue
@routes.route("/advanceQueue")
def advanceQueue():

	try:
		response = ***REMOVED***
			"status": 200,
			"nowPlaying": ["title", "url", "thumbnail"]
		***REMOVED***

		return jsonify(response)

	except Exception as e:
		response = ***REMOVED***
			"status": 500
		***REMOVED***

		return jsonify(response)
