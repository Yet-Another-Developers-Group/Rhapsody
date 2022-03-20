const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;

exports.run = (client, message, args) => {
	if(!args || args.length < 1) return message.reply('I\'m sorry, I didn\'t understand that.');
	const embed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('Remove from queue - Not Yet Finished.')
		.setDescription(args[0]);
	message.reply({ embeds: [embed] });
};

const shortcuts = [];

const helpDoc = {
	name: '',
	desc: '',
	commandSyntax: '',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};