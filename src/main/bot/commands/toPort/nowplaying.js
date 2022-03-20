const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
const queues = require('..').queues;
require('../ExtendedMessage/ExtendedMessage');

/**
 * Skips currently playing track
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 *  */
exports.run = async (client, message) => {
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.reply('You must be in a Voice Channel to use this command.');
	if(!queues[message.guild.id]) return message.reply('I\'m not playing anything here at the moment. Use the `queue` or `play` command to add more songs to the queue.');
	if (queues[message.guild.id].currentlyPlaying) {
		const currentlyPlayingEmbed = new Discord.MessageEmbed()
			.setColor(defaultEmbedColor)
			.setTitle('Now Playing')
			.setImage(`https://img.youtube.com/vi/${queues[message.guild.id].currentlyPlaying.info.identifier}/hqdefault.jpg`)
			.setDescription(queues[message.guild.id].currentlyPlaying.info.title);
		message.reply(currentlyPlayingEmbed);
	}
};

