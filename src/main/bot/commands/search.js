const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
const queues = require('..').queues;
const locks = require('..').locks;
const msToHMS = require('../rUtilities/rUtilities.js').millisecondsToHMSString;

require('../assets/ExtendedMessage');
exports.run = async (client, message, args) => {
	
	if(!args[0]) return message.channel.send('Please use a search term after the command like this:\n`-search <term>`');
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.channel.send('You must be in a Voice Channel to use this command.');
	if(!queues[message.guild.id]) return message.channel.send('You must be currently streaming to use this command.');
	if(locks[message.guild.id] &&
               typeof locks[message.guild.id] != 'undefined' &&
               locks[message.guild.id].isLocked && 
               locks[message.guild.id].userID != message.author.id &&
               locks[message.guild.id].allowedUsers.indexOf('<@!'+message.author.id+'>') > -1) return message.inlineReply('This player is currently locked by <@!'+locks[message.guild.id].userID+'>.');
	
	const allSongs = await queues[message.guild.id].search(args.join(' '));
	if(!allSongs.tracks || allSongs.tracks.length == 0) return message.channel.send('I\'m sorry, I couldn\'t find that song.');
	const songs = allSongs.tracks.slice(0, 5);
	
	const options = songs.map((song, index) => `${++index}) ${song.info.title} - ${song.info.author} - ${msToHMS(song.info.length)}`);
	const searchResultsEmbed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('Search Results for "' + args.join(' ') + '"')
		.setDescription(`\`\`\`\n${options.join('\n')}\n\`\`\``)
		.setFooter('Reply to this message with 1/2/3/4/5 to chose a song to play. Reply with \'cancel\' to cancel this search.');
	message.inlineReply(searchResultsEmbed).catch(console.error);
	
	const filter = m => Number(m.content) >= 1 && Number(m.content) <= 23;
	function getChosenSongResult() {
		return new Promise((resolve) => {
			message.channel.awaitMessages(filter, {max: 1, time: 10000, errors: ['time']})   
				.then(collected => resolve(collected.first().content))
				.catch(collected => resolve('cancel'));
		});
	}

	const chosenSong = await getChosenSongResult();
	if(chosenSong === 'cancel') return message.channel.send('Search for "' + args.join(' ') + '" was canceled.');
	const song = songs[parseInt(chosenSong) - 1];

	const isAdded = await queues[message.guild.id].play(song);

	if(isAdded) {
		const embed = new Discord.MessageEmbed()
			.setColor(defaultEmbedColor)
			.setTitle('Song Added to Queue')
			.setDescription(`${song.info.title} - ${song.info.author} - \`${msToHMS(song.info.length)}\``);
		message.inlineReply(embed).catch(console.error);
	}



	
};
