const queues = require('../bot.js').queues;
const locks = require('../bot.js').locks;

/**
 * Rewinds the track.
 * @param {Discord.client} client 
 * @param {Discord.message} message 
 * @returns 
 */
const run = async (client, message) => {
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.reply('You must be in a Voice Channel to use this command.');
	if(!queues[message.guild.id]) return message.reply('I\'m not playing anything here at the moment. Use the `queue` or `play` command to add more songs to the queue.');
	if(locks[message.guild.id] &&
		typeof locks[message.guild.id] != 'undefined' &&
		locks[message.guild.id].isLocked && 
		locks[message.guild.id].userID != message.author.id &&
		locks[message.guild.id].allowedUsers.indexOf('<@!'+message.author.id+'>') < 0) return message.reply('This player is currently locked by <@!'+locks[message.guild.id].userID+'>.');
	if(queues[message.guild.id].currentlyPlaying.info.isStream) return message.reply('Sorry, this command does not work on Live Streams.');
	
	queues[message.guild.id].seek(0);
	message.reply('Rewound track.');
};

const shortcuts = [];

const helpDoc = {
	name: 'Rewind',
	desc: 'Rewinds the track to the start.',
	commandSyntax: '-rewind',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};