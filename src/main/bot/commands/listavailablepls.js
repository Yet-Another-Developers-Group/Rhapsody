const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
require('../ExtendedMessage/ExtendedMessage');
exports.run = (client, message, args) => {
	const embed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('List playlists - Not Yet Finished.')
		.setDescription('0');
	message.inlineReply(embed).catch(console.error);
};

