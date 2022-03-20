const queues = require('..').queues;
const locks = require('..').locks;


/**
 * Resumes stream
 * @param {Discord.Client} client 
 * @param {Discord.Message} message  
 *  */
const run = async (client, message) => {
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.reply('You must be in a Voice Channel to use this command.');
	if(locks[message.guild.id] &&
               typeof locks[message.guild.id] != 'undefined' &&
               locks[message.guild.id].isLocked && 
               locks[message.guild.id].userID != message.author.id &&
               locks[message.guild.id].allowedUsers.indexOf('<@!'+message.author.id+'>') > -1) return message.reply('This player is currently locked by <@!'+locks[message.guild.id].userID+'>.');
	
	if(!queues[message.guild.id]) return message.reply('I\'m not playing anything here at the moment. Use the `queue` or `play` command to add more songs to the queue.');
	queues[message.guild.id].resume();
	message.reply('Resumed player.');
};

const shortcuts = [];

const helpDoc = {
	name: 'Resume',
	desc: 'Resumes a paused player.',
	commandSyntax: '-resume',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};