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
		.setTitle('Search Results for "' + args.join(' ') + '"')
		.setDescription(`\`\`\`\n${options.join('\n')}\n\`\`\``)
		.setFooter('Reply to this message with 1/2/3/4/5 to chose a song to play. Reply with \'cancel\' to cancel this search.');
	message.reply(searchResultsEmbed).catch(console.error);
	
	const filter = m => Number(m.content) >= 1 && Number(m.content) <= 23;
	function getChosenSongResult() {
		return new Promise((resolve, reject) => {
			message.channel.awaitMessages(filter, {max: 1, time: 10000, errors: ['time']})   
			.then(collected => resolve(collected.first().content))
			.catch(collected => resolve(`cancel`));
		});
	}

	const chosenSong = await getChosenSongResult();
	if(chosenSong === 'cancel') return message.channel.send('Canceled.');
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
