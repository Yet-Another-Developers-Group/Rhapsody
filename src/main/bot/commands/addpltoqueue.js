const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;

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
	if (typeof playlistsData.error != 'undefined') return m.reply({ embeds: [new Discord.MessageEmbed()
	.setColor("#ff0000")
	.setTitle('An error occured.')
	.setDescription(`We\'re extremely sorry about this. Reach out on [GitHub](https://github.com/Yet-Another-Developers-Group/Rhapsody/issues), and we\'ll get this fixed as soon as possible.\nError code: e-${data.error.code}`)] })

	if (!JSON.parse(playlistsData.content).playlists.includes(args.toString().replace(/,/gi, ' ').trim())) return message.edit('Playlist not found.'); 

	const data = await rScriptsManager.runScript('playlists', 'addPlaylistToQueue', `-g ${m.guild.id} -n "${args.toString().replace(/,/gi, ' ').trim()}"`);
	if (typeof data.error != 'undefined') return message.reply({ embeds: [new Discord.MessageEmbed()
	.setColor("#ff0000")
	.setTitle('An error occured.')
	.setDescription(`We\'re extremely sorry about this. Reach out on [GitHub](https://github.com/Yet-Another-Developers-Group/Rhapsody/issues), and we\'ll get this fixed as soon as possible.\nError code: e-${data.error.code}`)] })


	message.edit(`${data}`);

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