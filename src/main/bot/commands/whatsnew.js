const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
const presets = require('../rGlobalMessageContentPresets/presets.json').whatsnew;
const run = async (client, message) => {
	const whatsNewEmbed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle(presets.title)
		.setDescription(presets.desc);
	message.inlineReply({ embeds: [whatsNewEmbed] }).catch(console.error);
};


const shortcuts = [];

const helpDoc = {
	name: 'What\'s New',
	desc: 'Posts a list of new features.',
	commandSyntax: '-whatsnew',
	shortcuts: shortcuts.map(i => '-'+i).join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};