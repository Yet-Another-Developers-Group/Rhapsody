const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
require('../ExtendedMessage/ExtendedMessage');
exports.run = (client, message, args) => {
	if(!args || args.length < 1) return message.inlineReply('I\'m sorry, I didn\'t understand that.');
	const embed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('Remove from queue - Not Yet Finished.')
		.setDescription(args[0]);
	message.inlineReply(embed).catch(console.error);
};

