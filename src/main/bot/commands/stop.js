const queues = require('../bot.js').queues;
const locks = require('../bot.js').locks;

/**
 * Stops stream.
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 *  */
const run = async (client, message) => {
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.reply('You must be in a Voice Channel to use this command.');
	if(locks[message.guild.id] &&
		typeof locks[message.guild.id] != 'undefined' &&
		locks[message.guild.id].isLocked && 
		locks[message.guild.id].userID != message.author.id &&
		locks[message.guild.id].allowedUsers.indexOf('<@!'+message.author.id+'>') < 0) return message.reply('This player is currently locked by <@!'+locks[message.guild.id].userID+'>.');
	if(!queues[message.guild.id])
		return message.reply('I\'m not currently streaming in this server.');
	const hasExited = await queues[message.guild.id].exit();
	queues[message.guild.id] = null;
	locks[message.guild.id] = null;
	if(hasExited) {
		message.reply('I\'ve exited the Voice Channel.');
	} else {
		message.reply('I\'m not currently streaming in this server.');
	}	
};


const shortcuts = ['exit', 'quit', 'disconnect', 'dc'];

const helpDoc = {
	name: 'Stop',
	desc: 'Stops playing and disconnects from the Voice Channel.',
	commandSyntax: '-stop',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};