const queues = require('../bot.js').queues;
const locks = require('../bot.js').locks;

/**
 * Removes a song from the queue.
 * @param {Discord.client} client 
 * @param {Discord.message} message 
 * @returns 
 */
const run = async (client, message, args) => {
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.reply('You must be in a Voice Channel to use this command.');
	if (!message.member.voice.channel.permissionsFor(message.guild.me).has('CONNECT', 'SPEAK')) return message.author.send(`I'm sorry, I don't have permissions to play music in **#${message.member.voice.channel.name}** on the **${message.guild.name}** server. Please contact your server's administrators/moderators to fix this issue. If you are the administrator/moderator for the server, you can fix this issue by giving Rhapsody the following permissions:\n- Connect\n- Speak\n- Priority Speaker`);
	if(locks[message.guild.id] &&
		typeof locks[message.guild.id] != 'undefined' &&
		locks[message.guild.id].isLocked && 
		locks[message.guild.id].userID != message.author.id &&
		locks[message.guild.id].allowedUsers.indexOf('<@!'+message.author.id+'>') < 0) return message.reply('This player is currently locked by <@!'+locks[message.guild.id].userID+'>.');
	if(!queues[message.guild.id]) return message.reply('I\'m not playing anything here at the moment. Use the `queue` or `play` command to add more songs to the queue.');
	if(!args || args.length < 1) return message.reply('Please specify a position after the command like this:\n`-remove <pos>`');

	const n = args[0];

	if (n < 1 || !queues[message.guild.id].queue[n-1]) return message.reply('I\'m sorry, that track does not exist.');


	message.reply(`Are you sure you want to remove **"${queues[message.guild.id].queue[n-1].info.title}"** from the queue?\n(Reply to this message with y/n to confirm.)`);
	const filter = m => message.author.id === m.author.id && m.type == 'REPLY';
	function getChosenDecisionResult() {
		return new Promise((resolve) => {
			message.channel.awaitMessages({filter, max: 1, time: 10000, errors: ['time']})   
				.then(collected => resolve(collected.first().content.toLowerCase()))
				.catch(() => { resolve('n'); });
		});
	}

	const chosenDecision = await getChosenDecisionResult();
	if(chosenDecision != 'y') return message.reply('Did not remove track.');

	queues[message.guild.id].remove(n-1);
	message.reply('Removed track.');
};

const shortcuts = [];

const helpDoc = {
	name: 'Remove',
	desc: 'Removes the song at the position <pos> in the queue.',
	commandSyntax: '-remove <pos>',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

const commandIsUsable = true;

module.exports = {
	run,
	shortcuts,
	helpDoc,
	commandIsUsable
};