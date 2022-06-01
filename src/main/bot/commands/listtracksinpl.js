const Discord = require('discord.js');
const rScriptsManager = require('../rScriptsManager');
const rUtilities = require('../rUtilities/rUtilities');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
/**
 * Lists tracks in a playlist.
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {array} args 
 *  */
const run = async (client, message, args) => {
	if(!args || args.length < 1) return message.reply('I\'m sorry, I didn\'t understand that.');

	const playlistsData = await rScriptsManager.runScript('playlists', 'listPlaylists', `-g ${message.guild.id}`);
	if (typeof playlistsData.error != 'undefined') return message.reply(rScriptErrorCodeFormatter.formatError(playlistsData.error))

	if (!JSON.parse(playlistsData.content).playlists.includes(new RegExp(args.toString().replace(/,/gi, ' ').trim(), "i"))) return message.reply('Playlist not found.'); 
	
	const data = await rScriptsManager.runScript('playlists', 'listSongsInPlaylist', `-g ${message.guild.id} -n "${args.toString().replace(/,/gi, ' ').trim()}"`);
	if (typeof data.error != 'undefined') return message.reply(rScriptErrorCodeFormatter.formatError(data.error))

	const text = JSON.parse(data.content).song.map((song, index) => `${++index}. ${song[0]} (${song[1]})`);
	message.reply('```' + (text.join('\r\n') || 'No songs in playlist..') + '```').catch(console.error);
};

const shortcuts = [];

const helpDoc = {
	name: 'List Tracks in Playlist',
	desc: 'Lists all the tracks in a playlist.',
	commandSyntax: '-listtracksinpl',
	shortcuts: shortcuts.map(i => '-'+i).join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};