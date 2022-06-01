const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;

const queues = require('../bot.js').queues;
const locks = require('../bot.js').locks;

const rScriptsManager = require('../rScriptsManager');
const { rScriptErrorCodeFormatter } = require('../rScriptsManager/rScriptErrorCodeFormatter');
const { Base64 } = require('../rUtilities/rUtilities');
/**
 * Adds Playlist to Queue
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {array} args 
 *  */
const run = async (client, m, args) => {
	if(!args || args.length < 1) return m.reply('Please mention a playlist\'s name after the command.');
	if(!m.member.voice.channel || typeof m.member.voice.channel == 'undefined') return m.reply('You must be in a Voice Channel to use this command.');
	if (!m.member.voice.channel.permissionsFor(m.guild.me).has('CONNECT', 'SPEAK')) return m.author.send(`I'm sorry, I don't have permissions to play music in **#${m.member.voice.channel.name}** on the **${m.guild.name}** server. Please contact your server's administrators/moderators to fix this issue. If you are the administrator/moderator for the server, you can fix this issue by giving Rhapsody the following permissions:\n- Connect\n- Speak\n- Priority Speaker`);
	if(!queues[m.guild.id]) return m.reply('You must be currently streaming to use this command.');
	if(locks[m.guild.id] &&
		typeof locks[m.guild.id] != 'undefined' &&
		locks[m.guild.id].isLocked && 
		locks[m.guild.id].userID != m.author.id &&
		locks[m.guild.id].allowedUsers.indexOf('<@!'+m.author.id+'>') < 0) return m.reply('This player is currently locked by <@!'+locks[m.guild.id].userID+'>.');

	var message = await m.reply('Checking...');

	const playlistsData = await rScriptsManager.runScript('playlists', 'listPlaylists', `-g ${m.guild.id}`);
	if (typeof playlistsData.error != 'undefined') return m.reply(rScriptErrorCodeFormatter.formatError(playlisr.error))


	if (!JSON.parse(playlistsData.content).playlists.includes(new RegExp(args.toString().replace(/,/gi, ' ').trim(), "i"))) return message.edit('Playlist not found.'); 

	const playlistScriptJSON = await rScriptsManager.runScript('playlists', 'addPlaylistToQueue', `-g ${m.guild.id} -n "${args.toString().replace(/,/gi, ' ').trim()}"`);
	if (typeof playlistScriptJSON.error != 'undefined') return m.reply(rScriptErrorCodeFormatter.formatError(playlistScriptJSON.error))

	var queueArray = JSON.parse(playlistScriptJSON.content).queue;
	queueArray.forEach((e, i) => {
		queueArray[i] = JSON.parse(Base64.decode(e))
	});
	
	queues[m.guild.id].addPlaylistToQueue(queueArray);

	message.edit(`I've added **${JSON.parse(playlistScriptJSON.content).playlist}** to the queue`);
	/*
	const isAdded = await queues[message.guild.id].play(song);

	if(isAdded) {
		const embed = new Discord.MessageEmbed()
			.setColor(defaultEmbedColor)
			.setTitle('Song Added to Queue')
			.setDescription(`${song.info.title} - ${song.info.author} - \`${song.info.isStream ? 'Live Stream' : msToHMS(song.info.length)}\``);
		message.reply({ embeds: [embed] }).catch(console.error);
	}
	*/
	
};

const shortcuts = ['addpl', 'apl'];

const helpDoc = {
	name: 'Add Playlist to Queue',
	desc: 'Adds the playlist to queue.',
	commandSyntax: '-addpltoqueue <name>',
	shortcuts: shortcuts.map(i => '-'+i).join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};