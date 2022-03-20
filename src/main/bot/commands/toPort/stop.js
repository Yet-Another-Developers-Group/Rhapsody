const queues = require('..').queues;


const locks = require('..').locks;

/**
 * Stops stream.
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 *  */
exports.run = async (client, message) => {
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.reply('You must be in a Voice Channel to use this command.');
	if(locks[message.guild.id] &&
               typeof locks[message.guild.id] != 'undefined' &&
               locks[message.guild.id].isLocked && 
               locks[message.guild.id].userID != message.author.id &&
               locks[message.guild.id].allowedUsers.indexOf('<@!'+message.author.id+'>') > -1) return message.reply('This player is currently locked by <@!'+locks[message.guild.id].userID+'>.');
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

