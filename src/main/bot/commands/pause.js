const queues = require('..').queues;
const locks = require('..').locks;
require('../ExtendedMessage/ExtendedMessage');

/**
 * Pauses stream
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @returns 
 */
exports.run = async (client, message) => {
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.inlineReply('You must be in a Voice Channel to use this command.');
	if(!queues[message.guild.id]) return message.inlineReply('I\'m not playing anything here at the moment. Use the `queue` or `play` command to add more songs to the queue.');
	if(locks[message.guild.id] &&
               typeof locks[message.guild.id] != 'undefined' &&
               locks[message.guild.id].isLocked && 
               locks[message.guild.id].userID != message.author.id &&
               locks[message.guild.id].allowedUsers.indexOf('<@!'+message.author.id+'>') > -1) return message.inlineReply('This player is currently locked by <@!'+locks[message.guild.id].userID+'>.');
	
	queues[message.guild.id].pause();
	message.inlineReply('Paused player. Use the `resume` command to resume.');
};

