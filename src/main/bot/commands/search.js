const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
const Queue = require('../rStructures/rQueue');
const queues = require('..').queues;
const msToHMS = require('../rUtilities/rUtilities.js').millisecondsToHMSString;

exports.run = async (client, message, args) => {
	
	if(!args[0]) return message.channel.send('SEARCH TERM NON-EXISTENT!');
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.channel.send('YOU MUST BE IN A VOICE CHANNEL!');
	if(!queues[message.guild.id])
		queues[message.guild.id] = new Queue(message.guild.id, message.member.voice.channel.id, message.channel);

	const allSongs = await queues[message.guild.id].search(args.join(' '));
	if(!allSongs.tracks || allSongs.tracks.length == 0) return message.channel.send('UNKNOWN SONG!');
	const songs = allSongs.tracks.slice(0, 5);
	
	const options = songs.map((song, index) => `${++index}) ${song.info.title} - ${song.info.author} - ${msToHMS(song.info.length)}`);
	const searchResultsEmbed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('SEARCH RESULTS')
		.setDescription(`\`\`\`\n${options.join('\n')}\n\`\`\``);
	message.reply(searchResultsEmbed).catch(console.error);

	const chosenSong = (await message.channel.awaitMessages(msg => msg.author === message.author && ['1','2','3','4','5', 'cancel'].includes(msg.content), { max: 1 })).first().content;
	if(chosenSong === 'cancel') return message.channel.send('Canceled');

	const song = songs[parseInt(chosenSong) - 1];

	const isAdded = await queues[message.guild.id].play(song);

	if(isAdded) {
		const embed = new Discord.MessageEmbed()
			.setColor(defaultEmbedColor)
			.setTitle('NEW SONG WAS ADDED')
			.setDescription(/*JSON.stringify(song)*/'x');
		message.reply(embed).catch(console.error);
	}



	
};

