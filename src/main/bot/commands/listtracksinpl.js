const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;

/**
 * Lists tracks in a playlist.
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {array} args 
 *  */
const run = (client, message, args) => {
	if(!args || args.length < 1) return message.inlineReply('I\'m sorry, I didn\'t understand that.');
	const embed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('List tracks in playlist - Not Yet Finished.')
		.setDescription(args[0]);
	message.reply({ embeds: [embed] });
};

const shortcuts = [];

const helpDoc = {
	name: 'List Tracks in Playlist',
	desc: 'Lists all the tracks in a playlist.',
	commandSyntax: '-listtracksinpl',
	shortcuts: shortcuts.map(i => '-'+i).join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};