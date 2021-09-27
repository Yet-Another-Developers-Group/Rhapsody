import pymongo

from GetResults import getResult

class MongoConnector():
	def __init__(self):
		self.client = pymongo.MongoClient("localhost", 27017)

		self.client.test
		self.database = self.client["rhapsody"]

	###########################################################################
	def addNewGuildChannel(self, guild_id, channel_id):

		guild_id = str(guild_id)
		channel_id = str(channel_id)

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
		channel = current_collection.find({"guild":guild_id})[0]["_id"]
		current_collection.delete_one({"_id": channel})

		current_collection = self.database[guild_id]
		current_collection.update_one({"_id":channel}, {"$set":{"currentlyPlaying":False,
																"songs":[]}})

	###########################################################################
	def addToQueue(self, guild_id, search_term):

		current_collection = self.database["CurrentlyPlaying"]
		channel = current_collection.find({"guild":guild_id})[0]["_id"]

		current_collection = self.database[guild_id]
		current_queue = current_collection.find({"_id":channel})[0]

		result = getResult(search_term)

		document = {"songs":[]}
		document["songs"] = current_queue["songs"]
		document["songs"].append(result)

		current_collection.update_one({"_id":channel}, {"$set":document})

	###########################################################################
	def advanceQueue(self, guild_id):

		current_collection = self.database["CurrentlyPlaying"]
		channel = current_collection.find({"guild":guild_id})[0]["_id"]

		current_collection = self.database[guild_id]
		current_queue = current_collection.find({"_id":channel})[0]

		document = {"songs":[]}
		document["songs"] = current_queue["songs"]
		
		queue = document["songs"]

		if len(queue) > 0:

			result = queue[0]
			queue.remove(result)
			document["songs"] = queue

			current_collection.update_one({"_id":channel}, {"$set":document})

		else:
			result = "404"

		return result

	###########################################################################
	def getQueueList(self, guild_id):
		current_collection = self.database["CurrentlyPlaying"]
		channel = current_collection.find({"guild": guild_id})[0]["_id"]

		current_collection = self.database[guild_id]
		queue = current_collection.find({"_id":channel})[0]["songs"]

		return queue

	###########################################################################
	def removeFromQueue(self, guild_id, index):
		current_collection = self.database["CurrentlyPlaying"]
		channel = current_collection.find({"guild": guild_id})[0]["_id"]

		current_collection = self.database[guild_id]
		queue = current_collection.find({"_id":channel})[0]["songs"]

		if index < len(queue):
			queue.remove(queue[index])
			current_collection.update_one({"_id":channel}, {"$set":{"songs":queue}})
			return 200

		elif index >= len(queue):
			return 404

if __name__ == "__main__":
	test = MongoConnector()