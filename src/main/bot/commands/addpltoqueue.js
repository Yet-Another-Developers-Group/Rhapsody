const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;

/**
 * Adds Playlist to Queue
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {array} args 
 *  */
const run = (client, message, args) => {
	if(!args || args.length < 1) return message.inlineReply('I\'m sorry, I didn\'t understand that.');
	const embed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('Add playlist to queue - Not Yet Finished.')
		.setDescription(args.toString().replace(/,/gi, ' '));
	message.reply({ embeds: [embed] });
};

const shortcuts = ['addpl', 'apl'];

const helpDoc = {
	name: 'Add Playlist to Queue',
	desc: 'Adds the playlist to queue.',
	commandSyntax: '-addpltoqueue <name>',
	shortcuts: shortcuts.map(i => '-'+i).join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};