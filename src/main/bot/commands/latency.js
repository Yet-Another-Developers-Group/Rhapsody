require('../ExtendedMessage/ExtendedMessage');

/**
 * Calculates latency of the bot
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 *  */
exports.run = async (client, message) => {
	const msg = await message.inlineReply('Pinged server, waiting for response...');
	msg.edit(`Response has arrived! Latency: \`${msg.createdTimestamp - message.createdTimestamp}ms\`.`);
};

