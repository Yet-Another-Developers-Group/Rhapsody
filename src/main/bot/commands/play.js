const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
const Queue = require('../rStructures/rQueue');
const queues = require('..').queues;
const msToHMS = require('../rUtilities/rUtilities.js').millisecondsToHMSString;

exports.run = async (client, message, args) => {

	if(!args[0]) return message.channel.send('Please use a search term or URL after the command like this:\n`-play <term>`');
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.channel.send('You must be in a Voice Channel to use this command.');
	
	if(!queues[message.guild.id])
	    queues[message.guild.id] = new Queue(message.guild.id, message.member.voice.channel.id, message.channel);

	const song = await queues[message.guild.id].search(args.join(' '));
	if(!song.tracks) return message.channel.send('I\'m sorry, I couldn\'t find that song.');

	const isAdded = await queues[message.guild.id].play(song.tracks[0]);

	if(isAdded) {
		const embed = new Discord.MessageEmbed()
			.setColor(defaultEmbedColor)
			.setTitle('Song Added to Queue')
			.setDescription(`${song.tracks[0].info.title} - ${song.tracks[0].info.author} - \`${msToHMS(song.tracks[0].info.length)}\``);
		message.reply(embed).catch(console.error);
	} else {
		const embed = new Discord.MessageEmbed()
			.setColor(defaultEmbedColor)
			.setTitle('Now Playing')
			.setDescription(`${song.tracks[0].info.title} - ${song.tracks[0].info.author} - \`${msToHMS(song.tracks[0].info.length)}\``);
		message.reply(embed).catch(console.error);
	}



	
};

