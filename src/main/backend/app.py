from flask import Flask

from routes import routes

app = Flask(__name__)
app.register_blueprint(routes, url_prefix="/rhapsody")

if __name__ == "__main__":
	app.run(port=1800, debug=True)