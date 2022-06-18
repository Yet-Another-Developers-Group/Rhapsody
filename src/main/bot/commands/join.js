
const Queue = require('../rStructures/rQueue');
const queues = require('../bot.js').queues;

const LockAgent = require('../rStructures/rLockAgent');
const locks = require('../bot.js').locks;

/**
 * Adds the bot to a Voice Channel
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 *  */
const run = async (client, message) => {
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.reply('You must be in a Voice Channel to use this command.');
	if (!message.member.voice.channel.permissionsFor(message.guild.me).has('CONNECT', 'SPEAK')) return message.author.send(`I'm sorry, I don't have permissions to play music in **#${message.member.voice.channel.name}** on the **${message.guild.name}** server. Please contact your server's administrators/moderators to fix this issue. If you are the administrator/moderator for the server, you can fix this issue by giving Rhapsody the following permissions:\n- Connect\n- Speak\n- Priority Speaker`);
	
	if(!queues[message.guild.id])
		queues[message.guild.id] = new Queue(message.guild.id, message.member.voice.channel.id, message.channel);

	if(!locks[message.guild.id])
		locks[message.guild.id] = new LockAgent(false);


	if( locks[message.guild.id] && locks[message.guild.id].isLocked && locks[message.guild.id].userID != message.author.id && locks[message.guild.id].allowedUsers.indexOf('<@!'+message.author.id+'>') < 0 ) return message.reply('This player is currently locked by <@!'+locks[message.guild.id].userID+'>.');
	const hasJoined = await queues[message.guild.id].join();

	if(hasJoined) {
		message.reply('I\'ve joined the Voice Channel!');
	} else {
		message.reply('It seems that I\'m already streaming in this server.');
	}	
};

const shortcuts = ['connect', 'j'];

const helpDoc = {
	name: 'Join',
	desc: 'Connects the bot to the Voice Channel you\'re currently in.',
	commandSyntax: '-join',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

const commandIsUsable = true;

module.exports = {
	run,
	shortcuts,
	helpDoc,
	commandIsUsable
};