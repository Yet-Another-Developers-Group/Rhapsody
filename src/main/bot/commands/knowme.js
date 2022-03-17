const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
const presets = require('../rGlobalMessageContentPresets/presets.json').introductoryMessage;

const run = (client, message) => {
	const knowMeEmbed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle(presets.title)
		.addFields(presets.fields)
		.setFooter(presets.footer);
	message.inlineReply({ embeds: [knowMeEmbed] });
};

const shortcuts = [];

const helpDoc = {
	name: 'Know Me',
	desc: 'Posts a small introduction to Rhapsody.',
	commandSyntax: '-knowme',
	shortcuts: shortcuts.map(i => '-'+i).join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};