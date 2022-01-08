require('../assets/ExtendedMessage.js');

/**
 * Ping/pong
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @returns 
 */
exports.run = async (client, message) => {
	message.inlineReply('Pong!');
};

