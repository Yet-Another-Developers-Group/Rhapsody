const axios = require('axios').default;
const geniusAuthorizationToken = require('../secrets.json').geniusAuthorizationToken;

class rGeniusLyricsManager {
	static async getLyrics(searchTerm) {
		var geniusResponse = await axios(`http://api.genius.com/search?q=${searchTerm}`, {
			headers: {
				Authorization: `Bearer ${geniusAuthorizationToken}`
			}
		});

		return typeof geniusResponse.data.response.hits[0] != 'undefined' ? geniusResponse.data.response.hits[0] : null;
	}
}

module.exports = rGeniusLyricsManager;
