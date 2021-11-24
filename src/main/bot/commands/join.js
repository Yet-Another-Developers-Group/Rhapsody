
const Queue = require('../rStructures/rQueue');
const queues = require('..').queues;

exports.run = async (client, message) => {
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.channel.send('You must be in a Voice Channel to use this command.');
	
	if(!queues[message.guild.id])
		queues[message.guild.id] = new Queue(message.guild.id, message.member.voice.channel.id, message.channel);
	const hasJoined = await queues[message.guild.id].join();

	if(hasJoined) {
		message.reply('I\'ve joined the Voice Channel!');
	} else {
		message.reply('It seems that I\'m already streaming in this server.');
	}	
};

