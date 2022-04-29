const queues = require('../bot.js').queues;
const locks = require('../bot.js').locks;



/**
 * Unlocks stream.
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 *  */
const run = async (client, message) => {
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.reply('You must be in a Voice Channel to use this command.');
	if (!message.member.voice.channel.permissionsFor(message.guild.me).has('CONNECT', 'SPEAK')) return message.author.send(`I'm sorry, I don't have permissions to play music in **#${message.member.voice.channel.name}** on the **${message.guild.name}** server. Please contact your server's administrators/moderators to fix this issue. If you are the administrator/moderator for the server, you can fix this issue by giving Rhapsody the following permissions:\n- Connect\n- Speak\n- Priority Speaker`);
	if(!queues[message.guild.id]) return message.reply('I\'m not playing anything here at the moment. Use the `queue` or `play` command to add more songs to the queue.');
	if( locks[message.guild.id] && 
		locks[message.guild.id].isLocked && 
		locks[message.guild.id].userID != message.author.id && 
		locks[message.guild.id].allowedUsers.indexOf('<@!'+message.author.id+'>') < 0 ) return message.reply('This player is currently locked by <@!'+locks[message.guild.id].userID+'>.');

	if(!locks[message.guild.id]) return message.reply('Already unlocked.');
	var isLocked = locks[message.guild.id].unlock();
	if (isLocked) {
		message.reply('Unlocked. You can lock by using the `-lock` command.');
	} else {
		message.reply('Already unlocked.');
	}
};

const shortcuts = [];

const helpDoc = {
	name: 'Unlock',
	desc: 'Unlocks the player.',
	commandSyntax: '-unlock',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};