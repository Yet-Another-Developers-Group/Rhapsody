const rScriptsManager = require('../rScriptsManager');
const { rScriptErrorCodeFormatter } = require('../rScriptsManager/rScriptErrorCodeFormatter');

/**
 * Creates a new playlist.
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {array} args 
 *  */
const run = async (client, message, args) => {
	if(!args || args.length < 1) return message.reply('I\'m sorry, I didn\'t understand that.');

	const playlistsData = await rScriptsManager.runScript('playlists', 'listPlaylists', `-g ${message.guild.id}`);
	if (typeof playlistsData.error != 'undefined') return message.reply(rScriptErrorCodeFormatter.formatError(playlistsData.error));

	if (JSON.parse(playlistsData.content).playlists.includes(new RegExp(args.toString().replace(/,/gi, ' ').trim(), 'i'))) return message.reply('Playlist already exists.'); 
	
	const data = await rScriptsManager.runScript('playlists', 'createPlaylist', `-g ${message.guild.id} -n "${args.toString().replace(/,/gi, ' ').trim()}"`);
	if (typeof data.error != 'undefined') return message.reply(rScriptErrorCodeFormatter.formatError(data.error));

	message.reply('Playlist was created.');
};

const shortcuts = [];

const helpDoc = {
	name: 'Create Playlist',
	desc: 'Creates a playlist.',
	commandSyntax: '-createpl <name>',
	shortcuts: shortcuts.map(i => '-'+i).join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};