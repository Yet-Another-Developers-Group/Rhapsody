const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;

/**
 * Deletes track from playlist.
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {array} args 
 *  */
const run = async (client, message, args) => {
	if(!args || args.length < 4) return message.reply('I\'m sorry, I didn\'t understand that.');
	var song = '';
	var name = '';
	var currentlyparsing = '';
	for (let i = 0; i < args.length; i++) {
		const element = args[i];
		switch (element) {
		case '-n':
			currentlyparsing = 'n';
			break;
		case '-s':
			currentlyparsing = 's';
			break;
		default:
			switch (currentlyparsing) {
			case 'n':
				name+=element+' ';
				break;
			case 's':
				song+=element+' ';
				break;
			}
			break;
		}
	}

	if (/^\d+$/.test(s)) return message.reply('I\'m sorry, I didn\'t understand that. The argument for `-s` must be an positive integer.')

	const embed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('Delete from playlist - Not Yet Finished.')
		.setDescription(name + ' - ' + song);
	message.reply({ embeds: [embed] });
};

const shortcuts = [];

const helpDoc = {
	name: 'Delete Track from Playlist',
	desc: 'Removes the song at the position <pos> in the playlist.',
	commandSyntax: '-deletefrompl -n <name> -s <pos>',
	shortcuts: shortcuts.map(i => '-'+i).join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};