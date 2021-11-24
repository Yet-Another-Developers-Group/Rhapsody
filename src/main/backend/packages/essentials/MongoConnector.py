import pymongo
class MongoConnector():
	def __init__(self):
		self.client = pymongo.MongoClient("localhost", 27017)

		self.client.test
		self.database = self.client["rhapsody"]

	###########################################################################
	def addNewPlaylist(self, guild_id, playlist_name):

		guild_id = str(guild_id)
		playlist_name = str(playlist_name)

		collection = self.database[guild_id]

		playlist = collection.find({"_id":playlist_name})

		if playlist.count() < 0:

			collection.insert_one({"_id":playlist_name,
									"songs":[]})

	###########################################################################
	def addToPlaylist(self, guild_id, playlist_name, song):

		current_collection = self.database[guild_id]
		current_queue = current_collection.find({"_id":playlist_name})[0]

		document = {"songs":[]}
		document["songs"] = current_queue["songs"]
		document["songs"].append(song)

		current_collection.update_one({"_id":playlist_name}, {"$set":document})

	###########################################################################
	def getPlaylist(self, guild_id, playlist_name):

		current_collection = self.database[guild_id]
		queue = current_collection.find({"_id":playlist_name})[0]["songs"]

		return queue

	###########################################################################
	def removeFromPlaylist(self, guild_id, playlist_name, index):
		current_collection = self.database[guild_id]
		queue = current_collection.find({"_id":playlist_name})[0]

		document = {"songs":[]}
		document["songs"] = queue["songs"]

		try:
			document["songs"].pop(int(index))
			current_collection.update_one({"_id":playlist_name}, {"$set":{"songs":document["songs"]}})
			return 200

		except Exception as e:
			print(e)
			return 404

if __name__ == "__main__":
	test = MongoConnector()