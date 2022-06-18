const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
const presets = require('../rGlobalMessageContentPresets/presets.json').introductoryMessage;

/**
 * Posts an about me message.
 * @param {Discord.client} client 
 * @param {Discord.message} message 
 * @returns 
 */
const run = async (client, message) => {
	const knowMeEmbed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle(presets.title)
		.addFields(presets.fields)
		.setFooter(presets.footer);
	message.reply({ embeds: [knowMeEmbed] });
};

const shortcuts = [];

const helpDoc = {
	name: 'Know Me',
	desc: 'Posts a small introduction to Rhapsody.',
	commandSyntax: '-knowme',
	shortcuts: shortcuts.map(i => '-'+i).join(', ')
};

const commandIsUsable = true;

module.exports = {
	run,
	shortcuts,
	helpDoc,
	commandIsUsable
};