const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
const Queue = require('../rStructures/rQueue.js');
const queues = require('../bot.js').queues;
const locks = require('../bot.js').locks;

const LockAgent = require('../rStructures/rLockAgent');
const msToHMS = require('../rUtilities/rUtilities.js').millisecondsToHMSString;


const run = async (client, message, args) => {
	if(!args[0]) return message.reply('Please use a search term or URL after the command like this:\n`-play <search term or URL>`');
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.reply('You must be in a Voice Channel to use this command.');
	
	if(!queues[message.guild.id])
		queues[message.guild.id] = new Queue(message.guild.id, message.member.voice.channel.id, message.channel);

	if(!locks[message.guild.id])
		locks[message.guild.id] = new LockAgent(false);


	if( locks[message.guild.id] && locks[message.guild.id].isLocked && locks[message.guild.id].userID != message.author.id && locks[message.guild.id].allowedUsers.indexOf('<@!'+message.author.id+'>') > -1 ) return message.reply('This player is currently locked by <@!'+locks[message.guild.id].userID+'>.');

	const song = await queues[message.guild.id].search(args.join(' '));
	if(!song.tracks) return message.reply('I\'m sorry, I couldn\'t find that song.');

	const isAdded = await queues[message.guild.id].play(song.tracks[0]);

	if(isAdded) {
		const embed = new Discord.MessageEmbed()
			.setColor(defaultEmbedColor)
			.setTitle('Song Added to Queue')
			.setDescription(`${song.tracks[0].info.title} - ${song.tracks[0].info.author} - \`${song.tracks[0].info.isStream ? "Live Stream" : msToHMS(song.tracks[0].info.length)}\``);
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

module.exports = {
	run,
	shortcuts,
	helpDoc
};