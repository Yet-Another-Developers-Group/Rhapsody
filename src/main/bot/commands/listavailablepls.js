const { MessageActionRow, MessageButton } = require('discord.js');
const rScriptsManager = require('../rScriptsManager/index.js');
const { rScriptErrorCodeFormatter } = require('../rScriptsManager/rScriptErrorCodeFormatter.js');

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
 * Lists playlists
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 *  */
const run = async (client, message) => {
	const data = await rScriptsManager.runScript('playlists', 'listPlaylists', `-g ${message.guild.id}`);
	if (typeof data.error != 'undefined') return message.reply(rScriptErrorCodeFormatter.formatError(data.error));
	
	const text = JSON.parse(data.content).playlists.map((pl, index) => `${++index}. ${pl}`);
	const pages = text.chunk(5);

	if (pages.length == 0) return message.reply('No playlists.');

	const queueMessage = await message.reply({
		content: '```'+pages[0].join('\r\n')+'```',
		components: pages.length < 2
			? []
			: [new MessageActionRow({components: [forwardButton]})]
	});
	if (pages.length < 2) return;

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
						...(currentIndex < pages.length ? [forwardButton] : [])
					]
				})
			]
		});
	});
	
	/*
		const text = JSON.parse(data.content).playlists.map((pl, index) => `${++index}. ${pl}`);
	message.reply('```' + (text.join('\r\n') || 'No playlists.') + '```').catch(console.error);

	*/
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