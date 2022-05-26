const Discord = require('discord.js');
const rScriptsManager = require('../rScriptsManager');
const rUtilities = require('../rUtilities/rUtilities');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;

/**
 * Creates a new playlist.
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {array} args 
 *  */
const run = async (client, message, args) => {
	if(!args || args.length < 1) return message.reply('I\'m sorry, I didn\'t understand that.');

	const playlistsData = await rScriptsManager.runScript('playlists', 'listPlaylists', `-g ${message.guild.id}`);
	if (typeof playlistsData.error != 'undefined') return message.reply({ embeds: [new Discord.MessageEmbed()
	.setColor("#ff0000")
	.setTitle('An error occured.')
	.setDescription(`We\'re extremely sorry about this. Reach out on [GitHub](https://github.com/Yet-Another-Developers-Group/Rhapsody/issues), and we\'ll get this fixed as soon as possible.\nError code: e-${data.error.code}`)] })

	if (JSON.parse(playlistsData.content).playlists.includes(args.toString().replace(/,/gi, ' ').trim())) return message.reply('Playlist already exists.'); 
	
	const data = await rScriptsManager.runScript('playlists', 'createPlaylist', `-g ${message.guild.id} -n "${args.toString().replace(/,/gi, ' ').trim()}"`);
	if (typeof data.error != 'undefined') return message.reply({ embeds: [new Discord.MessageEmbed()
	.setColor("#ff0000")
	.setTitle('An error occured.')
	.setDescription(`We\'re extremely sorry about this. Reach out on [GitHub](https://github.com/Yet-Another-Developers-Group/Rhapsody/issues), and we\'ll get this fixed as soon as possible.\nError code: e-${data.error.code}`)] })

	const embed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('Create playlist - Not Yet Finished.')
		.setDescription(data.content.toString());
	message.reply({ embeds: [embed] });
};

const shortcuts = [];

const helpDoc = {
	name: 'Create Playlist',
	desc: 'Creates a playlist.',
	commandSyntax: '-createpl <name>',
	shortcuts: shortcuts.map(i => '-'+i).join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};