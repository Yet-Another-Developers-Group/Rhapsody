const queues = require('../bot.js').queues;
const locks = require('../bot.js').locks;
const msToHMS = require('../rUtilities/rUtilities.js').millisecondsToHMSString;
const { MessageActionRow, MessageButton } = require('discord.js');

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
 * Removes duplicate tracks form the queue.
 * @param {Discord.client} client 
 * @param {Discord.message} message 
 * @returns 
 */
const run = async (client, message) => {
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.reply('You must be in a Voice Channel to use this command.');
	if (!message.member.voice.channel.permissionsFor(message.guild.me).has('CONNECT', 'SPEAK')) return message.author.send(`I'm sorry, I don't have permissions to play music in **#${message.member.voice.channel.name}** on the **${message.guild.name}** server. Please contact your server's administrators/moderators to fix this issue. If you are the administrator/moderator for the server, you can fix this issue by giving Rhapsody the following permissions:\n- Connect\n- Speak\n- Priority Speaker`);
	if(!queues[message.guild.id]) return message.reply('I\'m not playing anything here at the moment. Use the `queue` or `play` command to add more songs to the queue.');
	if(locks[message.guild.id] &&
		typeof locks[message.guild.id] != 'undefined' &&
		locks[message.guild.id].isLocked && 
		locks[message.guild.id].userID != message.author.id &&
		locks[message.guild.id].allowedUsers.indexOf('<@!'+message.author.id+'>') < 0) return message.reply('This player is currently locked by <@!'+locks[message.guild.id].userID+'>.');
	if(queues[message.guild.id].queue.length < 1) return message.reply('No songs in queue. Use the `queue` or `play` command to add more songs to the queue.');

	const duplicateTracks = await queues[message.guild.id].findDuplicateTracks();
	
	//if (duplicateTracks.length < 1) return message.reply('No duplicates.');

	//message.reply(`Are you sure you want to remove duplicate tracks from the queue?\`\`\`${duplicateTracks.slice(0, 10).map((song, index) => `${++index}) ${song.info.title} - ${song.info.author} - ${msToHMS(song.info.length)}`).join('\n')}${duplicateTracks > 5 ? `\n\n... and ${duplicateTracks.length-10} more.` : ""}\`\`\`\n(Reply to this message with y/n to confirm.)`);

	const pages = duplicateTracks.map((song, index) => `${++index}. ${song.info.title} - ${song.info.author} - (${song.info.isStream ? 'Live Stream' : msToHMS(song.info.length)})`).chunk(5);

	if (pages.length == 0) return message.reply('No duplicates.');


	let currentIndex = 0;
	const queueMessage = await message.reply({
		content: 'Are you sure you want to remove duplicate tracks from the queue?```'+pages[currentIndex].join('\n')+'```\n(Reply to this message with y/n to confirm.)',
		components: pages.length < 2
			? []
			: [new MessageActionRow({components: [forwardButton]})]
	});
	if (pages.length < 2) return;

	const collector = queueMessage.createMessageComponentCollector({
		filter: ({user}) => user.id == message.author.id,
		time: 10000
	});
	collector.on('collect', async interaction => {
		// Increase/decrease index
		interaction.customId === backId ? (currentIndex--) : (currentIndex++);
		// Respond to interaction by updating message with new embed
		await interaction.update({
			content: 'Are you sure you want to remove duplicate tracks from the queue?```'+pages[currentIndex].join('\n')+'```\n(Reply to this message with y/n to confirm.)',
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



	const filter = m => message.author.id === m.author.id && m.type == 'REPLY';
	function getChosenDecisionResult() {
		return new Promise((resolve) => {
			message.channel.awaitMessages({filter, max: 1, time: 10000, errors: ['time']})   
				.then(collected => resolve(collected.first().content.toLowerCase()))
				.catch(() => { resolve('n'); });
		});
	}

	const chosenDecision = await getChosenDecisionResult();
	if(chosenDecision != 'y') return message.reply('Did not remove duplicate tracks.');

	queues[message.guild.id].removeDuplicateTracks();
	message.reply('Removed duplicate tracks.');
};

const shortcuts = [];

const helpDoc = {
	name: 'Remove Duplicate Tracks',
	desc: 'Removes duplicate tracks from your queue.',
	commandSyntax: '-removeduplicatetracks',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

const commandIsUsable = true;

module.exports = {
	run,
	shortcuts,
	helpDoc,
	commandIsUsable
};