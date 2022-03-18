const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;

/**
 * Lists playlists
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 *  */
const run = (client, message) => {
	const embed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('List playlists - Not Yet Finished.')
		.setDescription('0');
	message.reply({ embeds: [embed] });
};

const shortcuts = [];

const helpDoc = {
	name: 'List Available Playlists',
	desc: 'Lists all the playlists made by your server.',
	commandSyntax: '-listavailablepls',
	shortcuts: shortcuts.map(i => '-'+i).join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};