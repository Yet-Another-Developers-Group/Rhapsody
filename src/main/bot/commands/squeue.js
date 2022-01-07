const queues = require('..').queues;
const msToHMS = require('../rUtilities/rUtilities.js').millisecondsToHMSString;


require('../ExtendedMessage/ExtendedMessage');
exports.run = async (client, message) => {

	if(!queues[message.guild.id]) return message.channel.send('I\'m not currently streaming in this server.');

	const next = queues[message.guild.id].queue;

	const text = next.map((song, index) => `${++index}. ${song.info.title} (${msToHMS(song.info.length)})`);
	message.inlineReply('```' + (JSON.stringify(text) || 'No songs in queue.') + '```').catch(console.error);
};

