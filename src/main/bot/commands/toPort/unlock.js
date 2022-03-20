const queues = require('..').queues;
const locks = require('..').locks;



/**
 * Unlocks stream.
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 *  */
const run = async (client, message) => {
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.reply('You must be in a Voice Channel to use this command.');
	if(!queues[message.guild.id]) return message.reply('I\'m not playing anything here at the moment. Use the `queue` or `play` command to add more songs to the queue.');
	if( locks[message.guild.id] && locks[message.guild.id].isLocked && locks[message.guild.id].userID != message.author.id && locks[message.guild.id].allowedUsers.indexOf('<@!'+message.author.id+'>') > -1 ) return message.reply('This player is currently locked by <@!'+locks[message.guild.id].userID+'>.');

	if(!locks[message.guild.id]) return message.reply('Already unlocked.');
	var isLocked = locks[message.guild.id].unlock();
	if (isLocked) {
		message.reply('Unlocked. You can lock by using the `-lock` command.');
	} else {
		message.reply('Already unlocked.');
	}
};

const shortcuts = [];

const helpDoc = {
	name: '',
	desc: '',
	commandSyntax: '',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};