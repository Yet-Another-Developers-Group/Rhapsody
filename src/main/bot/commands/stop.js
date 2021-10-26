require('../assets/ExtendedMessage');
const http = require('http');
const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
exports.run = (client, message) => {
	http.get('http://localhost:1800/rhapsody/guild/getChannelId?g='+message.guild.id, (resp) => {
		let data = '';
		resp.on('data', (chunk) => {
			data += chunk;
		});
		resp.on('end', () => {
			if (resp.statusCode == '200') {
				data = JSON.parse(data);
				if (data.status == 404) {
					message.inlineReply('No voice channel to leave.');
					return;
				} else {
					client.channels.cache.get(data.channelId).leave();
					destroyPlayerOnServer(message); 
				}
			} else {
				message.inlineReply('An error occurred trying to get the resource.```status: ' +resp.statusCode+ '\nguildId: ' +message.guild.id+ '```');
			}
		});
	}).on('error', () => {
		message.inlineReply('An error occurred trying to get the resource.');
	}); 
};

function destroyPlayerOnServer(message) {
	http.get('http://localhost:1800/rhapsody/guild/destroyPlayer?g='+message.guild.id, (resp) => {
		let data = '';
		resp.on('data', (chunk) => {
			data += chunk;
		});
		resp.on('end', () => {
			if (resp.statusCode == '200') {
				const embed = new Discord.MessageEmbed()
					.setColor(defaultEmbedColor)
					.setTitle('Destroyed the player.')
					.setThumbnail('attachment://icon.png');
				message.inlineReply(embed).catch(console.error);

			} else {
				message.inlineReply('An error occurred while trying to get the resource.```status: ' +resp.statusCode+ '\nguildId: ' +message.guild.id+ '```');
			}
		});
	}).on('error', () => {
		message.inlineReply('An error occurred while trying to get the resource.');
	});
}
