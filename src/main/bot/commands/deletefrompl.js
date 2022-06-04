const rScriptsManager = require('../rScriptsManager');
const { rScriptErrorCodeFormatter } = require('../rScriptsManager/rScriptErrorCodeFormatter');
const { Base64 } = require('../rUtilities/rUtilities');

/**
 * Deletes track from playlist.
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {array} args 
 *  */
const run = async (client, m, args) => {
	if(!args || args.length < 4) return m.reply('I\'m sorry, I didn\'t understand that.');
	var song = '';
	var name = '';
	var currentlyparsing = '';
	for (let i = 0; i < args.length; i++) {
		const element = args[i];
		switch (element) {
		case '-n':
			currentlyparsing = 'n';
			break;
		case '-s':
			currentlyparsing = 's';
			break;
		default:
			switch (currentlyparsing) {
			case 'n':
				name+=element+' ';
				break;
			case 's':
				song+=element+' ';
				break;
			}
			break;
		}
	}

	if (parseInt(song) < 1) return m.reply('I\'m sorry, I didn\'t understand that. The argument for `-s` must be a positive integer.');
	
	var message = await m.reply('Checking...');

	const playlistsData = await rScriptsManager.runScript('playlists', 'listPlaylists', `-g ${message.guild.id}`);
	if (typeof playlistsData.error != 'undefined') return m.reply(rScriptErrorCodeFormatter.formatError(playlistsData.error));

	if (!JSON.parse(playlistsData.content).playlists.some(e => new RegExp(name.trim(), 'i').test(e))) return message.reply('Playlist not found.'); 

	const conformationMessageData = await rScriptsManager.runScript('playlists', 'getSongFromPlaylist', `-g ${message.guild.id} -n "${name.trim()}" -s ${parseInt(song)-1}`);
	if (typeof conformationMessageData.error != 'undefined') return m.reply(rScriptErrorCodeFormatter.formatError(conformationMessageData.error));
	
	message.edit(`Are you sure you want to delete **${JSON.parse(Base64.decode(JSON.parse(conformationMessageData.content).song)).info.title}**?\n(Reply to this message with y/n to confirm.)`);
	const filter = filterMessage => m.author.id === filterMessage.author.id && filterMessage.type == 'REPLY';
	function getChosenDecisionResult() {
		return new Promise((resolve) => {
			m.channel.awaitMessages({filter, max: 1, time: 10000, errors: ['time']})   
				.then(collected => resolve(collected.first().content.toLowerCase()))
				.catch(() => { resolve('n'); });
		});
	}

	const chosenDecision = await getChosenDecisionResult();
	if(chosenDecision != 'y') return message.edit('Did not remove track.');

	const data = await rScriptsManager.runScript('playlists', 'removeFromPlaylist', `-g ${message.guild.id} -n "${name.trim()}" -s ${parseInt(song)-1}`);
	if (typeof data.error != 'undefined') return m.reply(rScriptErrorCodeFormatter.formatError(data.error));
	
	message.edit('Removed track.');
};

const shortcuts = [];

const helpDoc = {
	name: 'Delete Track from Playlist',
	desc: 'Removes the song at the position <pos> in the playlist.',
	commandSyntax: '-deletefrompl -n <name> -s <pos>',
	shortcuts: shortcuts.map(i => '-'+i).join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};