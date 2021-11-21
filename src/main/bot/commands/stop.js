
const Queue = require('../rStructures/rQueue');
const queues = require('..').queues;

exports.run = async (client, message) => {
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.channel.send('YOU MUST BE IN A VOICE CHANNEL!');
	
	if(!queues[message.guild.id])
	    return message.reply('I\'m not currently streaming in this server.');
	const hasExited = await queues[message.guild.id].exit();

	if(hasExited) {
		message.reply('I\'ve exited the voice channel.');
	} else {
          message.reply('I\'m not currently streaming in this server.');
     }	
};

