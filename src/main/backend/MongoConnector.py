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

		channel = collection.find(***REMOVED***"_id":channel_id***REMOVED***)

		if channel.count() > 0:
			collection.update_one(***REMOVED***"_id":channel_id***REMOVED***, ***REMOVED***"$set":***REMOVED***"currentlyPlaying":True***REMOVED******REMOVED***)

		else:
			collection.insert_one(***REMOVED***"_id":channel_id,
									"currentlyPlaying":True,
									"songs":[]***REMOVED***)

		currently_playing = self.database["CurrentlyPlaying"]
		currently_playing.insert_one(***REMOVED***"_id":channel_id,
										"guild":guild_id***REMOVED***)


	###########################################################################
	def getChannelId(self, guild_id):
		current_collection = self.database["CurrentlyPlaying"]

		channel = current_collection.find(***REMOVED***"guild":guild_id***REMOVED***)

		if channel.count() > 0:
			return channel[0]["_id"]

		else:
			return False

	###########################################################################
	def destroyPlayer(self, guild_id):

		current_collection = self.database["CurrentlyPlaying"]
		channel = current_collection.find(***REMOVED***"guild":guild_id***REMOVED***)[0]["_id"]
		current_collection.delete_one(***REMOVED***"_id": channel***REMOVED***)

		current_collection = self.database[guild_id]
		current_collection.update_one(***REMOVED***"_id":channel***REMOVED***, ***REMOVED***"$set":***REMOVED***"currentlyPlaying":False,
																"songs":[]***REMOVED******REMOVED***)

	###########################################################################
	def addToQueue(self, guild_id, search_term):

		current_collection = self.database["CurrentlyPlaying"]
		channel = current_collection.find(***REMOVED***"guild":guild_id***REMOVED***)[0]["_id"]

		current_collection = self.database[guild_id]
		current_queue = current_collection.find(***REMOVED***"_id":channel***REMOVED***)[0]

		result = getResult(search_term)

		document = ***REMOVED***"songs":[]***REMOVED***
		document["songs"] = current_queue["songs"]
		document["songs"].append(result)

		current_collection.update_one(***REMOVED***"_id":channel***REMOVED***, ***REMOVED***"$set":document***REMOVED***)

	###########################################################################
	def advanceQueue(self, guild_id):

		current_collection = self.database["CurrentlyPlaying"]
		channel = current_collection.find(***REMOVED***"guild":guild_id***REMOVED***)[0]["_id"]

		current_collection = self.database[guild_id]
		current_queue = current_collection.find(***REMOVED***"_id":channel***REMOVED***)[0]

		document = ***REMOVED***"songs":[]***REMOVED***
		document["songs"] = current_queue["songs"]
		
		queue = document["songs"]

		if len(queue) > 0:

			result = queue[0]
			queue.remove(result)
			document["songs"] = queue

			current_collection.update_one(***REMOVED***"_id":channel***REMOVED***, ***REMOVED***"$set":document***REMOVED***)

		else:
			result = "404"

		return result

	###########################################################################
	def getQueueList(self, guild_id):
		current_collection = self.database["CurrentlyPlaying"]
		channel = current_collection.find(***REMOVED***"guild": guild_id***REMOVED***)[0]["_id"]

		current_collection = self.database[guild_id]
		queue = current_collection.find(***REMOVED***"_id":channel***REMOVED***)[0]["songs"]

		return queue

	###########################################################################
	def removeFromQueue(self, guild_id, index):
		current_collection = self.database["CurrentlyPlaying"]
		channel = current_collection.find(***REMOVED***"guild": guild_id***REMOVED***)[0]["_id"]

		current_collection = self.database[guild_id]
		queue = current_collection.find(***REMOVED***"_id":channel***REMOVED***)[0]

		document = ***REMOVED***"songs":[]***REMOVED***
		document["songs"] = queue["songs"]

		try:
			document["songs"].pop(int(index))
			current_collection.update_one(***REMOVED***"_id":channel***REMOVED***, ***REMOVED***"$set":***REMOVED***"songs":document["songs"]***REMOVED******REMOVED***)
			return 200

		except Exception as e:
			print(e)
			return 404

if __name__ == "__main__":
	test = MongoConnector()