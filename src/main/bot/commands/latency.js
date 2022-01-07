require('../ExtendedMessage/ExtendedMessage');
exports.run = async (client, message, args) => {
	const msg = await message.inlineReply('Pinged server, waiting for response...');
	msg.edit(`Response has arrived! Latency: \`${msg.createdTimestamp - message.createdTimestamp}ms\`.`);
};

