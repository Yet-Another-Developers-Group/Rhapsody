from flask import Blueprint
from flask import request
from flask import render_template
from flask import jsonify

import mongo_methods
from request_methods import GetResults

routes = Blueprint(__name__, "routes")

@routes.route("/")
def home():
	return "home page"

@routes.route("/search")
def getResult():
	args = request.args
	search_term = args.get("t")

	result = GetResults.getResult(search_term) 

	response = {
		"result": result
	}

	return jsonify(response)


@routes.route("/addToQueue")
def addToQueue():
	pass

@routes.route("/getQueue")
def getQueue():
	pass

@routes.route("/removeQueue")
def addToQueue():
	pass

@routes.route("/addGuildChannel")
def addGuildChannel():
	pass

@routes.route("/addSongToQueue")
def addToQueue():
	pass

@routes.route("/addSongToQueue")
def addToQueue():
	pass