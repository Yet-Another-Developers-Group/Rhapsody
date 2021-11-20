const queues = require('..').queues;
exports.run = async (client, message) => {
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.reply('YOU MUST BE IN A VOICE CHANNEL!');
	if(!queues[message.guild.id]) return message.reply('NOTHING IS PLAYING! \nIF YOU BELIEVE THAT SOMETHING HAS GONE WRONG, CHECK SERVER FOR FAULT!');
	queues[message.guild.id]._playNext();
	message.reply('SKIPPED CURRENT SONG.');
};

