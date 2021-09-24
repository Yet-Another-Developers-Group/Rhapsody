import pymongo

class MongoConnector():
	def __init__(self):
		self.client = pymongo.MongoClient("localhost", 27017)

		self.client.test
		self.database = self.client["rhapsody"]

	###########################################################################
	def addNewGuildChannel(self, guild_id, channel_id):

		guild_id = str(guild_id)
		channel_id = str(channel_id)

		try:
			collection = self.database[guild_id]

			channel = collection.find({"_id":channel_id})

			if channel.count() > 0:
				collection.update_one({"_id":channel_id}, {"$set":{"currentlyPlaying":True}})

			else:
				collection.insert_one({"_id":channel_id,
									   "currentlyPlaying":True,
									   "songs":[]})

			currently_playing = self.database["CurrentlyPlaying"]
			currently_playing.insert_one({"_id":channel_id,
										  "guild":guild_id})

			return True

		except Exception as e:
			print(e)
			return False

	###########################################################################
	def getChannelId(self, guild_id):
		current_collection = self.database["CurrentlyPlaying"]

		channel = current_collection.find({"guild":guild_id})

		if channel.count() > 0:
			return channel[0]["_id"]

		else:
			return False

	###########################################################################
	def destroyPlayer(self, guild_id):

		current_collection = self.database["CurrentlyPlaying"]
		channel = current_collection.find({})
		current_collection.delete_one({"guild": guild_id})

		current_collection = self.database[guild_id]
		current_collection.update_one({"_id":channel}, {"$set":{"currentlyPlaying":False,
																"songs":[]}})

	###########################################################################
	def addToQueue(self, guild_id, song_link):

		current_collection = self.database[guild_id]
		current_queue = current_collection.find({"_id":"queue"})

		document = {"songs":[]}
		document["songs"] = current_queue[0]["songs"]
		document["songs"].append(song_link)

		current_collection.update_one({"_id":"queue"}, {"$set":document})

if __name__ == "__main__":
	test = MongoConnector()