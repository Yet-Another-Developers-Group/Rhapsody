const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
const queues = require('../bot.js').queues;
const locks = require('../bot.js').locks;
const msToHMS = require('../rUtilities/rUtilities.js').millisecondsToHMSString;



/**
 * Searches Youtube (uses Lavalink), adds chosen track to queue.
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {array} args 
 *  */
const run = async (client, message, args) => {
	
	if(!args || args.length < 1) return message.reply('Please use a search term after the command like this:\n`-search <term>`');
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.reply('You must be in a Voice Channel to use this command.');
	if(!queues[message.guild.id]) return message.reply('You must be currently streaming to use this command.');
	if(locks[message.guild.id] &&
               typeof locks[message.guild.id] != 'undefined' &&
               locks[message.guild.id].isLocked && 
               locks[message.guild.id].userID != message.author.id &&
               locks[message.guild.id].allowedUsers.indexOf('<@!'+message.author.id+'>') > -1) return message.reply('This player is currently locked by <@!'+locks[message.guild.id].userID+'>.');
	
	const allSongs = await queues[message.guild.id].search(args.join(' '));
	if(!allSongs.tracks || allSongs.tracks.length == 0) return message.reply('I\'m sorry, I couldn\'t find that song.');
	const songs = allSongs.tracks.slice(0, 5);
	
	const options = songs.map((song, index) => `${++index}) ${song.info.title} - ${song.info.author} - ${msToHMS(song.info.length)}`);
	const searchResultsEmbed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('Search Results for "' + args.join(' ') + '"')
		.setDescription(`\`\`\`\n${options.join('\n')}\n\`\`\``)
		.setFooter({ text: 'Reply to this message with 1/2/3/4/5 to chose a song to play. Reply with \'cancel\' to cancel this search.' });
	message.reply({ embeds: [searchResultsEmbed] }).catch(console.error);
	
	const filter = m => Number(m.content) >= 1 && Number(m.content) <= 5 && message.author.id === m.author.id && m.type == 'REPLY';
	function getChosenSongResult() {
		return new Promise((resolve) => {
			message.channel.awaitMessages({filter, max: 1, time: 10000, errors: ['time']})   
				.then(collected => resolve(collected.first().content.toLowerCase()))
				.catch(collected => resolve('cancel'));
		});
	}

	const chosenSong = await getChosenSongResult();
	if(chosenSong === 'cancel') return message.reply('Search for "' + args.join(' ') + '" was canceled.');
	const song = songs[parseInt(chosenSong) - 1];

	const isAdded = await queues[message.guild.id].play(song);

	if(isAdded) {
		const embed = new Discord.MessageEmbed()
			.setColor(defaultEmbedColor)
			.setTitle('Song Added to Queue')
			.setDescription(`${song.info.title} - ${song.info.author} - \`${msToHMS(song.info.length)}\``);
		message.reply({ embeds: [embed] }).catch(console.error);
	}



	
};

const shortcuts = [];

const helpDoc = {
	name: 'Search',
	desc: 'Searches for a given search term.',
	commandSyntax: '-search <search term>',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};