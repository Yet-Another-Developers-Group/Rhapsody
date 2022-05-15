const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
const rScriptsManager = require('../rScriptsManager/index.js');

/**
 * Lists playlists
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 *  */
const run = async (client, message) => {
	const data = await rScriptsManager.runScript('playlists', 'listPlaylists', `-g ${message.guild.id}`);
	if (typeof data.error != 'undefined') return message.reply({ embeds: [new Discord.MessageEmbed()
		.setColor("#ff0000")
		.setTitle('An error occured.')
		.setDescription(`We\'re extremely sorry about this. Reach out on [GitHub](https://github.com/Yet-Another-Developers-Group/Rhapsody/issues), and we\'ll get this fixed as soon as possible.\nError code: e-${data.error.code}`)] })
	
		const embed = new Discord.MessageEmbed()
			.setColor(defaultEmbedColor)
			.setTitle('List playlists - Not Yet Finished.')
			.setDescription(data.content.toString());
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