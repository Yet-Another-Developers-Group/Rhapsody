
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
	
	if(!queues[message.guild.id])
		queues[message.guild.id] = new Queue(message.guild.id, message.member.voice.channel.id, message.channel);

	if(!locks[message.guild.id])
		locks[message.guild.id] = new LockAgent(false);


	if( locks[message.guild.id] && locks[message.guild.id].isLocked && locks[message.guild.id].userID != message.author.id && locks[message.guild.id].allowedUsers.indexOf('<@!'+message.author.id+'>') > -1 ) return message.reply('This player is currently locked by <@!'+locks[message.guild.id].userID+'>.');
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

module.exports = {
	run,
	shortcuts,
	helpDoc
};