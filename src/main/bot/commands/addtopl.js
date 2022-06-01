const Discord = require('discord.js');
const { rNonSteramingSearchManager } = require('../rNonStreamingSearchManager');
const rScriptsManager = require('../rScriptsManager');
const { rScriptErrorCodeFormatter } = require('../rScriptsManager/rScriptErrorCodeFormatter');
const rSearchImagingManager = require('../rSearchImagingManager');
const { Base64 } = require('../rUtilities/rUtilities.js');
const msToHMS = require('../rUtilities/rUtilities.js').millisecondsToHMSString;

/**
 * Adds track to Playlist
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {array} args 
 *  */
const run = async (client, message, args) => {
	if(!args || args.length < 4) return message.reply('I\'m sorry, I didn\'t understand that.');
	var track = '';
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
				track+=element+' ';
				break;
			}
			break;
		}
	}
	/*if (song == '' || name == '') return message.reply('I\'m sorry, I didn\'t understand that.');
	const embed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('Add to playlist - Not Yet Finished.')
		.setDescription(name + ' - ' + song);
	message.reply({ embeds: [embed] });*/

	const playlistsData = await rScriptsManager.runScript('playlists', 'listPlaylists', `-g ${message.guild.id}`);
	if (typeof playlistsData.error != 'undefined') return message.reply(rScriptErrorCodeFormatter.formatError(playlistsData.error))
	 
	if (!JSON.parse(playlistsData.content).playlists.includes(new RegExp(name.trim(), "i"))) return message.reply('Playlist not found.'); 

	var searchResultsMessage = await message.reply('Loading search results...');

	const allSongs = await rNonSteramingSearchManager.search(track);
	if(!allSongs.tracks || allSongs.tracks.length == 0) return searchResultsMessage.edit('I\'m sorry, I couldn\'t find that song.');
	const songs = allSongs.tracks.slice(0, 5);

	const image = await rSearchImagingManager.drawSearchResults(songs);

	searchResultsMessage.edit({
		files: [
			image
		],
		content: 'Search results:'
	});

	const filter = m => (Number(m.content) >= 1 && Number(m.content) <= 5 || m.content.toLowerCase() == 'cancel') && message.author.id === m.author.id && m.type == 'REPLY';
	function getChosenSongResult() {
		return new Promise((resolve) => {
			message.channel.awaitMessages({filter, max: 1, time: 60000, errors: ['time']})   
				.then(collected => resolve(collected.first().content.toLowerCase()))
				.catch(() => { resolve('cancel'); });
		});
	}

	const chosenSong = await getChosenSongResult();
	if(chosenSong === 'cancel') return message.reply('Search for "' + track + '" was canceled.');
	const song = songs[parseInt(chosenSong) - 1];

	

	searchResultsMessage.removeAttachments();
	const data = await rScriptsManager.runScript('playlists', 'addToPlaylist', `-g ${message.guild.id} -n "${name.trim()}" -s "${Base64.encode(JSON.stringify(song))}"`);
	if (typeof data.error != 'undefined') return message.reply(rScriptErrorCodeFormatter.formatError(data.error))

	searchResultsMessage.edit(`**${song.info.title} - ${song.info.author}** was added to **${JSON.parse(data.content).name}**.`);
};

const shortcuts = [];

const helpDoc = {
	name: 'Add Track to Playlist',
	desc: 'Adds track to playlist.',
	commandSyntax: '-addtopl -n <name> -s <song>',
	shortcuts: shortcuts.map(i => '-'+i).join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};