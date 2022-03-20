const queues = require('..').queues;
const msToHMS = require('../rUtilities/rUtilities.js').millisecondsToHMSString;
require('../ExtendedMessage/ExtendedMessage');

/**
 * Posts the current queue.
 * @param {Discord.Client} client 
 * @param {Discord.Message} message
 *  */
exports.run = async (client, message) => {

	if(!queues[message.guild.id]) return message.channel.send('I\'m not currently streaming in this server.');

	const next = queues[message.guild.id].queue;

	const text = next.map((song, index) => `${++index}. ${song.info.title} (${song.info.isStream ? "Live Stream" : msToHMS(song.info.length)})`);
	message.reply('```' + (text.join('\r\n') || 'No songs in queue.') + '```').catch(console.error);
};

