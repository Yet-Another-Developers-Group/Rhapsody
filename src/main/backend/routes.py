from flask import Blueprint
from flask import request
from flask import render_template
from flask import jsonify

routes = Blueprint(__name__, "routes")

@routes.route("/")
def home():
	return "home page"

@routes.route("/search")
def getResult():
	args = request.args
	search_term = args.get("term")

	response = {
		"term": search_term
	}

	return jsonify(response)