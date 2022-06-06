const { MessageActionRow, MessageButton } = require('discord.js');
const queues = require('../bot.js').queues;
const msToHMS = require('../rUtilities/rUtilities.js').millisecondsToHMSString;

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
 * Posts the current queue.
 * @param {Discord.Client} client 
 * @param {Discord.Message} message
 *  */
const run = async (client, message) => {
	if(!queues[message.guild.id]) return message.reply('I\'m not currently streaming in this server.');

	const next = queues[message.guild.id].queue;

	const pages = next.map((song, index) => `${++index}. ${song.info.title} (${song.info.isStream ? 'Live Stream' : msToHMS(song.info.length)})`).chunk(5);
	console.log(pages.length)
	if (pages.length == 0) return message.reply('No songs in queue.');


	let currentIndex = 0;
	const queueMessage = await message.reply({
		content: '```'+pages[currentIndex].join('\r\n')+'```',
		components: pages.length < 2
			? []
			: [new MessageActionRow({components: [forwardButton]})]
	});
	if (pages.length < 2) return;

	const collector = queueMessage.createMessageComponentCollector({
		filter: ({user}) => user.id == message.author.id
	});
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
	queues[message.guild.id].events.on('update', () => { collector.stop(); });
	/*const text = next.map((song, index) => `${++index}. ${song.info.title} (${song.info.isStream ? 'Live Stream' : msToHMS(song.info.length)})`).join('\r\n');
	message.reply('```' + (text || 'No songs in queue.') + '```').catch(console.error);*/
};

const shortcuts = [];

const helpDoc = {
	name: 'See Queue',
	desc: 'See the current queue.',
	commandSyntax: '-squeue',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};