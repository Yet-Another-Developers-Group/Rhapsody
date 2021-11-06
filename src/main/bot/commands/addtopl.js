const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;

exports.run = (client, message, args) => {
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
	if (song == '' || name == '') return message.reply('I\'m sorry, I didn\'t understand that.');
	const embed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('Add to playlist - Not Yet Finished.')
		.setDescription(name + ' - ' + song);
		message.reply({ embeds: [embed] });
};

