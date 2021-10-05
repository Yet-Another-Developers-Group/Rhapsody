from flask import Blueprint
from flask import request
from flask import jsonify

from ..essentials.MongoConnector import MongoConnector
from ..essentials import GetResults

queueRoutes = Blueprint("queueRoutes", __name__)

#test case for searching songs
@queueRoutes.route("/search")
def getResult():
	args = request.args
	search_term = args.get("t")

	result = GetResults.getResult(search_term) 

	response = {
		"result": result
	}

	return jsonify(response)

#return the queue
@queueRoutes.route("/getQueueList")
def getQueueList():

	args = request.args
	guild_id = args.get("g")

	try:
		connector = MongoConnector()
		queue = connector.getQueueList(guild_id)

		response = {
			"status": 200,
			"queue":queue
		}

		return jsonify(response)

	except Exception as e:

		print(e)

		response = {
			"status": 500
		}

		return jsonify(response)

#searches and adds song to queue
@queueRoutes.route("/addToQueue")
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
@queueRoutes.route("/removeFromQueue")
def removeFromQueue():

	args = request.args
	guild_id = args.get("g")
	index = args.get("pos")

	try:
		connector = MongoConnector()
		result = connector.removeFromQueue(guild_id, index)

		response = {
			"status": result
		}

		return jsonify(response)

	except Exception as e:

		print(e)

		response = {
			"status": 500
		}

		return jsonify(response)

#returns the next song in the queue
@queueRoutes.route("/advanceQueue")
def advanceQueue():

	args = request.args
	guild_id = args.get("g")

	try:

		connector = MongoConnector()
		result = connector.advanceQueue(guild_id)

		if result != "404":
			response = {
				"status": 200,
				"nowPlaying": result
			}

		elif result == "404":
			response = {
				"status": 404
			}

		return jsonify(response)

	except Exception as e:

		print(e)

		response = {
			"status": 500
		}

		return jsonify(response)
