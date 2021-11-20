const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
const queues = require('..').queues;
const msToHMS = require('../rUtilities/rUtilities.js').millisecondsToHMSString;


exports.run = async (client, message) => {

	if(!queues[message.guild.id]) return message.channel.send('NOTHING IS PLAYING! \nIF YOU BELIEVE THAT SOMETHING HAS GONE WRONG, CHECK SERVER FOR FAULT!');

	const next = queues[message.guild.id].queue;

	const text = next.map((song, index) => `${++index}) ${song.info.title} - ${song.info.author} - ${msToHMS(song.info.length)}`);
	const embed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('QUEUE')
		.setDescription(JSON.stringify(text) || 'No songs in queue.');
	message.reply(embed).catch(console.error);
};

