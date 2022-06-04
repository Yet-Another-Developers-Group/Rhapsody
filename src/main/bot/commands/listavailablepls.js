const rScriptsManager = require('../rScriptsManager/index.js');
const { rScriptErrorCodeFormatter } = require('../rScriptsManager/rScriptErrorCodeFormatter.js');

/**
 * Lists playlists
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 *  */
const run = async (client, message) => {
	const data = await rScriptsManager.runScript('playlists', 'listPlaylists', `-g ${message.guild.id}`);
	if (typeof data.error != 'undefined') return message.reply(rScriptErrorCodeFormatter.formatError(data.error));
	
	
	const text = JSON.parse(data.content).playlists.map((pl, index) => `${++index}. ${pl}`);
	message.reply('```' + (text.join('\r\n') || 'No playlists.') + '```').catch(console.error);
};

const shortcuts = [];

const helpDoc = {
	name: 'List Available Playlists',
	desc: 'Lists all the playlists made by your server.',
	commandSyntax: '-listavailablepls',
	shortcuts: shortcuts.map(i => '-'+i).join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};