const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
const Queue = require('../rStructures/rQueue');
const queues = require('..').queues;
const msToHMS = require('../rUtilities/rUtilities.js').millisecondsToHMSString;

exports.run = async (client, message, args) => {

	if(!args[0]) return message.channel.send('ARGS MISSING!');
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.channel.send('YOU MUST BE IN A VOICE CHANNEL!');
	
	if(!queues[message.guild.id])
	    queues[message.guild.id] = new Queue(message.guild.id, message.member.voice.channel.id, message.channel);

	const song = await queues[message.guild.id].search(args.join(' '));
	if(!song.tracks) return message.channel.send('UNKNOWN SONG!');

	const isAdded = await queues[message.guild.id].play(song.tracks[0]);

	if(isAdded) {
		const embed = new Discord.MessageEmbed()
			.setColor(defaultEmbedColor)
			.setTitle('ADDED TO QUEUE')
			.setDescription('x');
		message.reply(embed).catch(console.error);
	}



	
};

