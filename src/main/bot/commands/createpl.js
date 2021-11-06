const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;

exports.run = (client, message, args) => {
	if(!args || args.length < 1) return message.reply('I\'m sorry, I didn\'t understand that.');
	const embed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('Create playlist - Not Yet Finished.')
		.setDescription(args.toString().replace(/,/gi, ' '));
		message.reply({ embeds: [embed] });
};

