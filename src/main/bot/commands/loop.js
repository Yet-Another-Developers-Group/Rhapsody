const queues = require('../bot.js').queues;
const locks = require('../bot.js').locks;

const run = async (client, message, args) => {
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.reply('You must be in a Voice Channel to use this command.');
	if (!message.member.voice.channel.permissionsFor(message.guild.me).has('CONNECT', 'SPEAK')) return message.author.send(`I'm sorry, I don't have permissions to play music in **#${message.member.voice.channel.name}** on the **${message.guild.name}** server. Please contact your server's administrators/moderators to fix this issue. If you are the administrator/moderator for the server, you can fix this issue by giving Rhapsody the following permissions:\n- Connect\n- Speak\n- Priority Speaker`);
	if(!queues[message.guild.id]) return message.reply('I\'m not playing anything here at the moment. Use the `queue` or `play` command to add more songs to the queue.');
	if(locks[message.guild.id] &&
		typeof locks[message.guild.id] != 'undefined' &&
		locks[message.guild.id].isLocked && 
		locks[message.guild.id].userID != message.author.id &&
		locks[message.guild.id].allowedUsers.indexOf('<@!'+message.author.id+'>') < 0) return message.reply('This player is currently locked by <@!'+locks[message.guild.id].userID+'>.');
	
	queues[message.guild.id].loop = !queues[message.guild.id].loop;
	message.reply(queues[message.guild.id].loop ? "Set current track to loop." : "Stopped loop. You can use the `-skip` command to skip to the next track.");
};

const shortcuts = [];

const helpDoc = {
	name: 'Loop',
	desc: 'Places the current track in the queue in an infinite loop. To stop looping, use the same command again.',
	commandSyntax: '-loop',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};