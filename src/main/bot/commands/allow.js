const queues = require('..').queues;
const locks = require('..').locks;
require('../assets/ExtendedMessage.js');
const userregex = /<@![0-9]*>/;

/**
 * Adds users to allowed list on a locked stream
 * @param {Discord.client} client 
 * @param {Discord.message} message 
 * @param {aray} args 
 * @returns 
 */
exports.run = async (client, message, args) => {
	if (!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.inlineReply('You must be in a Voice Channel to use this command.');
	if (!queues[message.guild.id]) return message.inlineReply('I\'m not playing anything here at the moment. Use the `queue` or `play` command to add more songs to the queue.');
	if (!locks[message.guild.id]) return message.inlineReply('This player is not currently locked');
	if(locks[message.guild.id] &&
        typeof locks[message.guild.id] != 'undefined' &&
        locks[message.guild.id].isLocked && 
        locks[message.guild.id].userID != message.author.id &&
        locks[message.guild.id].allowedUsers.indexOf('<@!'+message.author.id+'>') > -1) return message.inlineReply('This player is currently locked by <@!'+locks[message.guild.id].userID+'>.');


          
	var allowedUsers = [];
	for (const user in args) {
		if (Object.hasOwnProperty.call(args, user)) {
			const element = args[user];
			if (userregex.test(element)) {
				allowedUsers.push(element);
			} else {
				message.inlineReply('Sorry, "*' + element + '*" is not a user.');
				return;
			}
		}
	}
	locks[message.guild.id].allowedUsers = allowedUsers;
	message.inlineReply('Unlocked player for selected users.');
};

