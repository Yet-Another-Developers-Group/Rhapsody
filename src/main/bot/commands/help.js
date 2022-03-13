const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { defaultEmbedColor } = require('../config.json');

const run = (client, message) => {
	message.reply({ content: '"The internet is full of K-Pop loving monkeys"\n- Sun Tzu (Developers)' });
};

const shortcuts = ['h'];

const helpDoc = {
	name: 'Help',
	commandSyntax: '-help',
	shortcuts: shortcuts.map(i => '-'+i).join()
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};