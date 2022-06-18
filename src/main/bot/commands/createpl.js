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

const commandIsUsable = true;

module.exports = {
	run,
	shortcuts,
	helpDoc,
	commandIsUsable
};