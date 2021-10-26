const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
const https = require('https');
require('../assets/ExtendedMessage');
exports.run = (client, message) => {
	https.get('https://catfact.ninja/fact', (resp) => {
		let data = '';
		resp.on('data', (chunk) => {
			data += chunk;
		});
		resp.on('end', () => {
			data = JSON.parse(data);
			const helpEmbed = new Discord.MessageEmbed()
				.setColor(defaultEmbedColor)
				.setTitle('Random Cat Fact!')
				.setDescription(data.fact);
			message.inlineReply(helpEmbed).catch(console.error);
		});
	}).on('error', () => {
		message.inlineReply('An error occurred while trying to get the resource.');
	});
};

