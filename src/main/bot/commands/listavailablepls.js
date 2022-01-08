const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
require('../ExtendedMessage/ExtendedMessage');

/**
 * Lists playlists
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 *  */
exports.run = (client, message) => {
	const embed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('List playlists - Not Yet Finished.')
		.setDescription('0');
	message.inlineReply(embed).catch(console.error);
};

