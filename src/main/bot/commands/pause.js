const queues = require('../bot.js').queues;
const locks = require('../bot.js').locks;


/**
 * Pauses stream
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 *  */
const run = async (client, message) => {
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.reply('You must be in a Voice Channel to use this command.');
	if(!queues[message.guild.id]) return message.reply('I\'m not playing anything here at the moment. Use the `queue` or `play` command to add more songs to the queue.');
	if(locks[message.guild.id] &&
               typeof locks[message.guild.id] != 'undefined' &&
               locks[message.guild.id].isLocked && 
               locks[message.guild.id].userID != message.author.id &&
               locks[message.guild.id].allowedUsers.indexOf('<@!'+message.author.id+'>') < 0) return message.reply('This player is currently locked by <@!'+locks[message.guild.id].userID+'>.');
	
	queues[message.guild.id].pause();
	message.reply('Paused player. Use the `resume` command to resume.');
};

const shortcuts = [];

const helpDoc = {
	name: 'Pause',
	desc: 'Pauses the player.',
	commandSyntax: '-pause',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};