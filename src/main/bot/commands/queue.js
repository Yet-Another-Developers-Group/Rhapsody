const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
require('../assets/ExtendedMessage');
exports.run = (client, message, args) => {
	if(!args || args.length < 1) return message.inlineReply('I\'m sorry, I didn\'t understand that.');
	const embed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('Add to queue - Not Yet Finished.')
		.setDescription(args.toString().replace(/,/gi, ' '));
	message.inlineReply(embed).catch(console.error);
};

