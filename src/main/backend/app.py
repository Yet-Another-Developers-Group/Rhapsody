from flask import Flask
from flask import Blueprint

from packages.routes.guildChannelRoutes import guildChannelRoutes
from packages.routes.queueRoutes import queueRoutes

app = Flask(__name__)

parent = Blueprint(__name__, "rhapsody")
parent.register_blueprint(guildChannelRoutes, url_prefix="/guild")
parent.register_blueprint(queueRoutes, url_prefix="/queue")

app.register_blueprint(parent, url_prefix="/rhapsody")

if __name__ == "__main__":
	app.run(port=1800, debug=True)