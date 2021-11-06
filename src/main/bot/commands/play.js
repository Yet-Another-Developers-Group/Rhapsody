
const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
const chalk = require('chalk');
const ytdl = require('ytdl-core');
const streamOptions = {seek: 0, volume: 1};
const http = require('http');

exports.run = (client, message) => {
	const VoiceChannel = message.member.voice.channel;
	if (!VoiceChannel || typeof VoiceChannel == 'undefined') {
		return message.reply('You are not currently in any voice channel.');
	}

	queryQueueServer(message, client);
};

function queryQueueServer(message, client) {
	http.get('http://localhost:1800/rhapsody/queue/advanceQueue?g='+message.guild.id, (resp) => {
		let data = '';
		resp.on('data', (chunk) => {
			data += chunk;
		});
		resp.on('end', () => {
			data = JSON.parse(data);
			if (data.status == '200') {  
				playSong(data.nowPlaying, message, client);
			} else {
				message.reply('No songs to play. Use the `queue` command to queue songs.');
			}
		});
	}).on('error', () => {
		message.reply('An error occurred while trying to get the resource.');
	}); 
}

function playSong(array, message, client) {
	http.get('http://localhost:1800/rhapsody/guild/getChannelId?g='+ message.guild.id, (resp) => {
		let data = '';
		resp.on('data', (chunk) => {
			data += chunk;
		});
		resp.on('end', () => {
			data = JSON.parse(data);
			var VoiceChannel = client.channels.cache.get(data.channelId);
			(async () => {
				const song = {
					title: array[0],
					url: array[1]
				};
				VoiceChannel.join().then(function(connection) {
					console.log(chalk.green.bold('[Connected]') + ' Successfully connected to voice channel "' + VoiceChannel.name + '" on "' + message.guild.name + '" by request of "' + message.author.tag + '". Playing "' + song.title + '"');
					const stream = ytdl('https://'+song.url, {filter: 'audioonly'});
					const dispatcher = connection.play(stream, streamOptions);
					const songEmbed = new Discord.MessageEmbed()
						.setColor(defaultEmbedColor)
						.setThumbnail('attachment://icon.png')
						.setImage(array[2])
						.addFields(
							{ name: 'Now Playing', value: song.title }
						);
					const pauseButton = new Discord.MessageButton()
						.setLabel("Pause")
						.setStyle("green")
						.setID("pause-button")
					const resumeButton = new Discord.MessageButton()
						.setLabel("Resume")
						.setStyle("green")
						.setID("resume-button")
					message.reply({ embeds: [songEmbed], files: [{attachment:'assets/sound.png', name:'icon.png'}]}).catch(console.error);

					dispatcher.on('finish', function () {
						queryQueueServer(message, client);
					});
				});
			})();
		});
	}).on('error', () => {
		message.reply('An error occurred while trying to get the resource.');
	});
     
}