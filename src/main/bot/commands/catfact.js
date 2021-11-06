const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
const https = require('https');

exports.run = (client, message) => {
	https.get('https://catfact.ninja/fact', (resp) => {
		let data = '';
		resp.on('data', (chunk) => {
			data += chunk;
		});
		resp.on('end', () => {
			data = JSON.parse(data);
			const catEmbed = new Discord.MessageEmbed()
				.setColor(defaultEmbedColor)
				.setTitle('Random Cat Fact!')
				.setDescription(data.fact);
			message.reply({ embeds: [catEmbed] }).catch(console.error);
		});
	}).on('error', () => {
		message.reply('An error occurred while trying to get the resource.');
	});
};

