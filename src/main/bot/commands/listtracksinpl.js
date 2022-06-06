const { MessageActionRow, MessageButton } = require('discord.js');
const rScriptsManager = require('../rScriptsManager');
const { rScriptErrorCodeFormatter } = require('../rScriptsManager/rScriptErrorCodeFormatter');

// PAGINATION - CONSTANTS
const backId = 'back';
const forwardId = 'forward';
const backButton = new MessageButton({
	style: 'SECONDARY',
	label: 'Previous Page',
	customId: backId
});
const forwardButton = new MessageButton({
	style: 'SECONDARY',
	label: 'Next Page',
	customId: forwardId
});

/**
 * Lists tracks in a playlist.
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {array} args 
 *  */
const run = async (client, message, args) => {
	if(!args || args.length < 1) return message.reply('I\'m sorry, I didn\'t understand that.');

	const playlistsData = await rScriptsManager.runScript('playlists', 'listPlaylists', `-g ${message.guild.id}`);
	if (typeof playlistsData.error != 'undefined') return message.reply(rScriptErrorCodeFormatter.formatError(playlistsData.error));

	if (!JSON.parse(playlistsData.content).playlists.some(e => new RegExp(args.toString().replace(/,/gi, ' ').trim(), 'i').test(e))) return message.reply('Playlist not found.'); 
	
	const data = await rScriptsManager.runScript('playlists', 'listSongsInPlaylist', `-g ${message.guild.id} -n "${args.toString().replace(/,/gi, ' ').trim()}"`);
	if (typeof data.error != 'undefined') return message.reply(rScriptErrorCodeFormatter.formatError(data.error));



	const text = JSON.parse(data.content).song.map((song, index) => `${++index}. ${song[0]} (${song[1]})`);
	const pages = text.chunk(5);

	if (pages.length-1 == 0) return message.reply('No songs in playlist.');

	const queueMessage = await message.reply({
		content: '```'+pages[0].join('\r\n')+'```',
		components: pages.length-1 < 2
			? []
			: [new MessageActionRow({components: [forwardButton]})]
	});
	if (pages.length-1 < 2) return;

	const collector = queueMessage.createMessageComponentCollector({
		filter: ({user}) => user.id == message.author.id,
		time: 360000
	});

	let currentIndex = 0;
	collector.on('collect', async interaction => {
		// Increase/decrease index
		interaction.customId === backId ? (currentIndex--) : (currentIndex++);
		// Respond to interaction by updating message with new embed
		await interaction.update({
			content: '```'+pages[currentIndex].join('\r\n')+'```',
			components: [
				new MessageActionRow({
					components: [
						// back button if it isn't the start
						...(currentIndex ? [backButton] : []),
						// forward button if it isn't the end
						...(currentIndex < pages.length-1 ? [forwardButton] : [])
					]
				})
			]
		});
	});

	/*const text = JSON.parse(data.content).song.map((song, index) => `${++index}. ${song[0]} (${song[1]})`);
	message.reply('```' + (text.join('\r\n') || 'No songs in playlist..') + '```').catch(console.error);*/
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