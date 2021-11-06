
const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
const http = require('http');
exports.run = (client, message, args) => {
	if(!args || args.length < 1) return message.reply('I\'m sorry, I didn\'t understand that.');
	http.get('http://localhost:1800/rhapsody/guild/getChannelId?g='+message.guild.id, (resp) => {
		let data = '';
		resp.on('data', (chunk) => {
			data += chunk;
		});
		resp.on('end', () => {
			try {
				data = JSON.parse(data);
				if (data.status == '200') {  
					removeSong(data.channelId, message, args[0]);
				} else {
					message.reply('No songs in queue.');
				}
			} catch (error) {
				message.reply('An error occurred while trying to get the resource.');
			}
		});
	}).on('error', () => {
		message.reply('An error occurred while trying to get the resource.');
	});
};


function removeSong(channelId, message, number) {
	http.get('http://localhost:1800/rhapsody/queue/removeFromQueue?g='+message.guild.id+'&pos='+(number-1)+'', (resp) => {
		let data = '';
		resp.on('data', (chunk) => {
			data += chunk;
		});
		resp.on('end', () => {
			data = JSON.parse(data);
			if (data.status == 200) {
				const embed = new Discord.MessageEmbed()
					.setColor(defaultEmbedColor)
					.setTitle('Removed from queue.');
					message.reply({ embeds: [embed] });
			} else if (data.status == 404) {
				message.reply('That track is not valid.');
			} else {
				message.reply('An error occured while trying to get the resource.```status: ' +data.status+ '\nguildId: ' +message.guild.id+ '```Please contact us if the error persists.');
			}
		});
	}).on('error', () => {
		message.reply('An error occurred while trying to get the resource.');
	});
    
}