const { MessageEmbed } = require('discord.js');
const { defaultEmbedColor } = require('../config.json');

const run = (client, message, args) => {
	
};

const shortcuts = ['h', 'showhelp', 'commands'];

const helpDoc = {
	name: 'Help',
	desc: 'Provides help on commands/functions.',
	commandSyntax: '-help <command>',
	shortcuts: shortcuts.map(i => '-'+i).join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};