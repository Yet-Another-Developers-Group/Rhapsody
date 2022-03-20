const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;

const run = async (client, message, args) => {
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.reply('You must be in a Voice Channel to use this command.');
	if(!queues[message.guild.id]) return message.reply('I\'m not playing anything here at the moment. Use the `queue` or `play` command to add more songs to the queue.');

	const n = args[0];

	if (!queues[message.guild.id].queue[n]) return message.reply('I\'m sorry, that track does not exist.');


	message.reply(`Are you sure you want to remove ${queues[message.guild.id].queue[n].info.title} from the queue?\n(Reply to this message with y/n to confirm.)`);
	function getChosenDecisionResult() {
		return new Promise((resolve) => {
			message.channel.awaitMessages(filter, {max: 1, time: 10000, errors: ['time']})   
				.then(collected => resolve(collected.first().content.toLowerCase()))
				.catch(collected => resolve('n'));
		});
	}

	const chosenDecision = await getChosenDecisionResult();
	if(chosenDecision != 'y') return message.reply('Did not remove track.');

	queues[message.guild.id].remove(n);
	message.reply('Removed track.');
};

const shortcuts = [];

const helpDoc = {
	name: 'Remove',
	desc: 'Removes the song at the position <pos> in the queue.',
	commandSyntax: '-remove <pos>',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};