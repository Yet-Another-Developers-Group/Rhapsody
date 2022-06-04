const axios = require('axios').default;
// eslint-disable-next-line
const urlValidityCheckExpression = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
const { rllManager } = require('../bot.js');


class rNonSteramingSearchManager {
	static async search(searchTerm) {
		const node = rllManager.idealNodes[0];
		const params = new URLSearchParams();
		params.append('identifier', urlValidityCheckExpression.test(searchTerm) ? searchTerm : `ytsearch:${searchTerm}`);
		const data = await axios(`http://${node.host}:${node.port}/loadtracks?${params}`, {
			headers: {
				Authorization: node.password
			}
		});
		return data.data || [];
	}
}

module.exports = { rNonSteramingSearchManager };