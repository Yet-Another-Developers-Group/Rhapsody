const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
const Queue = require('../rStructures/rQueue');
const queues = require('..').queues;
const locks = require('..').locks;
require('../ExtendedMessage/ExtendedMessage');

const LockAgent = require('../rStructures/rLockAgent');
const msToHMS = require('../rUtilities/rUtilities.js').millisecondsToHMSString;
/**
 * Plays song/adds track to queue if something's already playing.
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {array} args 
 *  */
exports.run = async (client, message, args) => {

	if(!args[0]) return message.channel.send('Please use a search term or URL after the command like this:\n`-play <term>`');
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.channel.send('You must be in a Voice Channel to use this command.');
	
	if(!queues[message.guild.id])
		queues[message.guild.id] = new Queue(message.guild.id, message.member.voice.channel.id, message.channel);

	if(!locks[message.guild.id])
		locks[message.guild.id] = new LockAgent(false);


	if( locks[message.guild.id] && locks[message.guild.id].isLocked && locks[message.guild.id].userID != message.author.id && locks[message.guild.id].allowedUsers.indexOf('<@!'+message.author.id+'>') > -1 ) return message.inlineReply('This player is currently locked by <@!'+locks[message.guild.id].userID+'>.');

	const song = await queues[message.guild.id].search(args.join(' '));
	if(!song.tracks) return message.channel.send('I\'m sorry, I couldn\'t find that song.');

	const isAdded = await queues[message.guild.id].play(song.tracks[0]);

	if(isAdded) {
		const embed = new Discord.MessageEmbed()
			.setColor(defaultEmbedColor)
			.setTitle('Song Added to Queue')
			.setDescription(`${song.tracks[0].info.title} - ${song.tracks[0].info.author} - \`${msToHMS(song.tracks[0].info.length)}\``);
		message.inlineReply(embed).catch(console.error);
	}
};

