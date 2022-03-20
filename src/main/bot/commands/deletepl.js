const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;

/**
 * Deletes playlist.
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {array} args 
 *  */
const run = async (client, message, args) => {
	if(!args || args.length < 1) return message.reply('I\'m sorry, I didn\'t understand that.');
	const embed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('Delete playlist - Not Yet Finished.')
		.setDescription(args.toString().replace(/,/gi, ' '));
	message.reply({ embeds: [embed] });
};

const shortcuts = [];

const helpDoc = {
	name: 'Delete Playlist',
	desc: 'Deletes a playlist.',
	commandSyntax: '-deletepl <name>',
	shortcuts: shortcuts.map(i => '-'+i).join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};