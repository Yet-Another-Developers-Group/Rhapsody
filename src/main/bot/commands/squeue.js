const queues = require('../bot.js').queues;
const msToHMS = require('../rUtilities/rUtilities.js').millisecondsToHMSString;


/**
 * Posts the current queue.
 * @param {Discord.Client} client 
 * @param {Discord.Message} message
 *  */
const run = async (client, message) => {

	if(!queues[message.guild.id]) return message.reply('I\'m not currently streaming in this server.');

	const next = queues[message.guild.id].queue;

	const text = next.map((song, index) => `${++index}. ${song.info.title} (${song.info.isStream ? 'Live Stream' : msToHMS(song.info.length)})`);
	message.reply('```' + (text.join('\r\n') || 'No songs in queue.') + '```').catch(console.error);
};

const shortcuts = [];

const helpDoc = {
	name: 'See Queue',
	desc: 'See the current queue.',
	commandSyntax: '-squeue',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};