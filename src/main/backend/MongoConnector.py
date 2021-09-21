import pymongo

class MongoConnector():
	def __init__(self):
		self.client = pymongo.MongoClient(
			"mongodb+srv://rhapsody:rhapsody@personalcluster.4dqdp.mongodb.net/"
			+"myFirstDatabase?retryWrites=true&w=majority"
			)

		self.client.test
		self.database = self.client["rhapsody"]

	def addNewGuildChannel(self, guild_id, channel_id):

		guild_id = str(guild_id)
		channel_id = str(channel_id)

		try:
			collection = self.database[guild_id]

			channel = collection.find(***REMOVED***"_id":channel_id***REMOVED***)

			if channel.count() > 0:
				colletion.update_one(***REMOVED***"_id":channel_id***REMOVED***, ***REMOVED***"$set":***REMOVED***currentlyPlaying:True***REMOVED******REMOVED***)

			else:
				collection.insert_one(***REMOVED***"_id":channel_id,
									   "currentlyPlaying":True,
									   "songs":[]***REMOVED***)

			currently_playing = self.database["CurrentlyPlaying"]
			currently_playing.insert_one(***REMOVED***"_id":channel_id,
										  "guild":guild_id***REMOVED***)

			return True

		except Exception as e:
			print(e)
			return False

	def addToQueue(self, guild_id, song_link):

		current_collection = self.database[guild_id]
		current_queue = current_collection.find(***REMOVED***"_id":"queue"***REMOVED***)

		document = ***REMOVED***"songs":[]***REMOVED***
		document["songs"] = current_queue[0]["songs"]
		document["songs"].append(song_link)

		current_collection.update_one(***REMOVED***"_id":"queue"***REMOVED***, ***REMOVED***"$set":document***REMOVED***)

if __name__ == "__main__":
	test = MongoConnector()