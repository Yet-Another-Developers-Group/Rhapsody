const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
require('../ExtendedMessage/ExtendedMessage');

/**
 * Lists tracks in a playlist.
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {array} args 
 * @returns 
 */
exports.run = (client, message, args) => {
	if(!args || args.length < 1) return message.inlineReply('I\'m sorry, I didn\'t understand that.');
	const embed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('List tracks in playlist - Not Yet Finished.')
		.setDescription(args.toString().replace(/,/gi, ' '));
	message.inlineReply(embed).catch(console.error);
};

