const queues = require('../bot.js').queues;
const locks = require('../bot.js').locks;


/**
 * Switches channel.
 * @param {Discord.Client} client 
 * @param {Discord.Message} message  
 *  */
const run = async (client, message) => {
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.reply('You must be in a Voice Channel to use this command.');
	if (!message.member.voice.channel.permissionsFor(message.guild.me).has('CONNECT', 'SPEAK')) return message.author.send(`I'm sorry, I don't have permissions to play music in **#${message.member.voice.channel.name}** on the **${message.guild.name}** server. Please contact your server's administrators/moderators to fix this issue. If you are the administrator/moderator for the server, you can fix this issue by giving Rhapsody the following permissions:\n- Connect\n- Speak\n- Priority Speaker`);
	if(locks[message.guild.id] &&
		typeof locks[message.guild.id] != 'undefined' &&
		locks[message.guild.id].isLocked && 
		locks[message.guild.id].userID != message.author.id &&
		locks[message.guild.id].allowedUsers.indexOf('<@!'+message.author.id+'>') < 0) return message.reply('This player is currently locked by <@!'+locks[message.guild.id].userID+'>.');
	
	if(!queues[message.guild.id]) return message.reply('I\'m not playing anything here at the moment. Use the `queue` or `play` command to add more songs to the queue.');
		
	const hasSwitched = await queues[message.guild.id].switch(message.member.voice.channel.id);
	if (hasSwitched) {
		message.reply('Switched player.');
	} else {
		message.reply('I\'m sorry, I couldn\'t switch the player to your channel.');
	}
};

const shortcuts = [];

const helpDoc = {
	name: 'Switch Channel',
	desc: 'Switches the player\'s channel to the one you\'re currently in.',
	commandSyntax: '-switchchannel',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

const commandIsUsable = true;

module.exports = {
	run,
	shortcuts,
	helpDoc,
	commandIsUsable
};