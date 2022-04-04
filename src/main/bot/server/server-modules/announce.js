const { sendAnnouncement } = require('../../public-scripts/announce.js');

async function announce(title, description) {
	sendAnnouncement(title, description);
	return {title, description};
}

module.exports = announce;