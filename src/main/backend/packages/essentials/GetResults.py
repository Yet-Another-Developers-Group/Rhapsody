import dotenv
import os

from googleapiclient.discovery import build

dotenv.load_dotenv("../../.env")

API_KEY = os.environ.get("API_KEY")
SERVICE_NAME = "youtube"
VERSION = "v3"

def getResult(search_term):
	
	youtube = build(SERVICE_NAME, VERSION, developerKey=API_KEY)

	search_response = youtube.search().list(
	    q=search_term,
	    part='id, snippet',
	).execute()

	videos = []
	  
	for search_result in search_response.get('items', []):
	    if search_result['id']['kind'] == 'youtube#video':
	    	videos.append([search_result["snippet"]["title"], 
	    					"youtube.com/watch?v=" + search_result["id"]["videoId"],
	    					search_result["snippet"]["thumbnails"]["high"]["url"]])
	
	return videos[0]

if __name__ == "__main__":
	getResult("Bhavayami Raghuramam MSS")