import pymongo

class MongoConnector():
	def __init__(self):
		self.client = pymongo.MongoClient(
			"mongodb+srv://rhapsody:rhapsody@personalcluster.4dqdp.mongodb.net/"
			+"myFirstDatabase?retryWrites=true&w=majority"
			)

		self.client.test
		self.database = self.client["rhapsody"]

	def initServer(self, guild_id):
		new_collection = self.database[guild_id]
		new_collection.insert_one(***REMOVED***"_id":"queue",
								   "songs":[]***REMOVED***)

	def addToQueue(self, guild_id, song_link):

		current_collection = self.database[guild_id]
		current_queue = current_collection.find(***REMOVED***"_id":"queue"***REMOVED***)

		document = ***REMOVED***"songs":[]***REMOVED***
		document["songs"] = current_queue[0]["songs"]
		document["songs"].append(song_link)

		current_collection.update_one(***REMOVED***"_id":"queue"***REMOVED***, ***REMOVED***"$set":document***REMOVED***)

if __name__ == "__main__":
	test = MongoConnector()
	# test.initServer("test")
	test.addToQueue("test", "test")