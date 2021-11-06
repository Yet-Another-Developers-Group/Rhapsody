
const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
const http = require('http');
exports.run = (client, message) => {
	const VoiceChannel = message.member.voice.channel;
	if (!VoiceChannel || typeof VoiceChannel == 'undefined') {
		return message.reply('You are not currently in any voice channel.');
	}
	http.get('http://localhost:1800/rhapsody/guild/addNewGuildChannel?g='+ message.guild.id +'&c='+ VoiceChannel.id, (resp) => {
		let data = '';
		resp.on('data', (chunk) => {
			data += chunk;
		});
		resp.on('end', () => {
			if (resp.statusCode == '200') {
				data = JSON.parse(data);
				if (data.status == 200) {      
					VoiceChannel.join();
					const embed = new Discord.MessageEmbed()
						.setColor(defaultEmbedColor)
						.setTitle('Joined Voice Channel')
						.setTitle('Joined voice channel.');
						message.reply({ embeds: [embed] });
				} else {
					message.reply('You seem to be already streaming in this server. If you aren\'t, try using `stop` and then using `join` again. If that doesn\'t work, contact us.');
				}
			} else {
				message.reply('An error occurred while trying to get the resource.```status: ' +resp.statusCode+ '\nvoiceChannelId: ' +VoiceChannel.id+ '\nguildId: ' +message.guild.id+ '```Try using `stop` and then using `join` again. If that doesn\'t work, contact us.');
			}
		});
	}).on('error', () => {
		message.reply('An error occurred while trying to get the resource.');
	});  
};