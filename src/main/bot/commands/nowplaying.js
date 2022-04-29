const Discord = require('discord.js');
const { millisecondsToHMSString } = require('../rUtilities/rUtilities');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
const queues = require('../bot.js').queues;
const moment = require('moment');

/**
 * Skips currently playing track
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 *  */
const run = async (client, message) => {
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.reply('You must be in a Voice Channel to use this command.');
	if (!message.member.voice.channel.permissionsFor(message.guild.me).has('CONNECT', 'SPEAK')) return message.author.send(`I'm sorry, I don't have permissions to play music in **#${message.member.voice.channel.name}** on the **${message.guild.name}** server. Please contact your server's administrators/moderators to fix this issue. If you are the administrator/moderator for the server, you can fix this issue by giving Rhapsody the following permissions:\n- Connect\n- Speak\n- Priority Speaker`);
	if(!queues[message.guild.id]) return message.reply('I\'m not playing anything here at the moment. Use the `queue` or `play` command to add more songs to the queue.');
	if (queues[message.guild.id].currentlyPlaying) {
		const currentlyPlayingEmbed = new Discord.MessageEmbed()
			.setColor(defaultEmbedColor)
			.setTitle('Now Playing')
			.setImage(`https://img.youtube.com/vi/${queues[message.guild.id].currentlyPlaying.info.identifier}/hqdefault.jpg`)
			.setDescription(`${queues[message.guild.id].currentlyPlaying.info.title} - \`${ millisecondsToHMSString(moment().valueOf() -queues[message.guild.id].currentlyPlayingStartedTimeStamp)}\`/\`${ millisecondsToHMSString(queues[message.guild.id].currentlyPlaying.info.length)}\``);
		message.reply({ embeds: [currentlyPlayingEmbed] });
	}
};

const shortcuts = ['np'];

const helpDoc = {
	name: 'Now Playing',
	desc: 'Posts the currently playing song.',
	commandSyntax: '-nowplaying',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};