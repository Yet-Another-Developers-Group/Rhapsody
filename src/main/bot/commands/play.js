const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
const Queue = require('../rStructures/rQueue.js');
const queues = require('../bot.js').queues;
const locks = require('../bot.js').locks;

const LockAgent = require('../rStructures/rLockAgent');
const msToHMS = require('../rUtilities/rUtilities.js').millisecondsToHMSString;

/**
 * Plays a song.
 * @param {Discord.client} client 
 * @param {Discord.message} message 
 * @returns 
 */
const run = async (client, message, args) => {
	if(!args || args.length < 1) return message.reply('Please use a search term or URL after the command like this:\n`-play <search term or URL>`');
	
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.reply('You must be in a Voice Channel to use this command.');
	if (!message.member.voice.channel.permissionsFor(message.guild.me).has('CONNECT', 'SPEAK')) return message.author.send(`I'm sorry, I don't have permissions to play music in **#${message.member.voice.channel.name}** on the **${message.guild.name}** server. Please contact your server's administrators/moderators to fix this issue. If you are the administrator/moderator for the server, you can fix this issue by giving Rhapsody the following permissions:\n- Connect\n- Speak\n- Priority Speaker`);
	
	if(!queues[message.guild.id])
		queues[message.guild.id] = new Queue(message.guild.id, message.member.voice.channel.id, message.channel);

	if(!locks[message.guild.id])
		locks[message.guild.id] = new LockAgent(false);


	if( locks[message.guild.id] && locks[message.guild.id].isLocked && locks[message.guild.id].userID != message.author.id && locks[message.guild.id].allowedUsers.indexOf('<@!'+message.author.id+'>') < 0 ) return message.reply('This player is currently locked by <@!'+locks[message.guild.id].userID+'>.');

	const song = await queues[message.guild.id].search(args.join(' '));
	if(!song.tracks) return message.reply('I\'m sorry, I couldn\'t find that song.');

	const isAdded = await queues[message.guild.id].play(song.tracks[0]);

	if(isAdded) {
		const embed = new Discord.MessageEmbed()
			.setColor(defaultEmbedColor)
			.setTitle('Song Added to Queue')
			.setDescription(`${song.tracks[0].info.title} - ${song.tracks[0].info.author} - \`${song.tracks[0].info.isStream ? 'Live Stream' : msToHMS(song.tracks[0].info.length)}\``);
		message.reply({ embeds: [embed] });
	}
};

const shortcuts = ['p', 'queue'];

const helpDoc = {
	name: 'Play',
	desc: 'Starts playing a given song from a URL or search term. If a player is already playing, it adds the song to the queue.',
	commandSyntax: '-play <search term or YouTube URL>',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

const commandIsUsable = true;

module.exports = {
	run,
	shortcuts,
	helpDoc,
	commandIsUsable
};