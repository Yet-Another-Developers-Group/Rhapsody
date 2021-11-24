
const Queue = require('../rStructures/rQueue');
const queues = require('..').queues;

exports.run = async (client, message) => {
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.channel.send('You must be in a Voice Channel to use this command.');
	
	if(!queues[message.guild.id])
	    return message.reply('I\'m not currently streaming in this server.');
	const hasExited = await queues[message.guild.id].exit();
	queues[message.guild.id] = null;
	if(hasExited) {
		message.reply('I\'ve exited the Voice Channel.');
	} else {
		message.reply('I\'m not currently streaming in this server.');
	}	
};

