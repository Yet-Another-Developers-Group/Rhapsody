const queues = require('../bot.js').queues;
const locks = require('../bot.js').locks;

const run = async (client, message, args) => {
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.reply('You must be in a Voice Channel to use this command.');
	if(locks[message.guild.id] &&
               typeof locks[message.guild.id] != 'undefined' &&
               locks[message.guild.id].isLocked && 
               locks[message.guild.id].userID != message.author.id &&
               locks[message.guild.id].allowedUsers.indexOf('<@!'+message.author.id+'>') < 0) return message.reply('This player is currently locked by <@!'+locks[message.guild.id].userID+'>.');
	if(!args || args.length < 1) return message.reply('Please specify a seek time after the command like this:\n`-seek <time>`');
	if(!queues[message.guild.id]) return message.reply('I\'m not playing anything here at the moment. Use the `queue` or `play` command to add more songs to the queue.');
	if(!queues[message.guild.id].currentlyPlaying.info.isStream) return message.reply('Sorry, this command does not work on Live Streams.');

	message.reply('SEEK TO ' + args.join(' '));
};

const shortcuts = [];

const helpDoc = {
	name: 'Seek',
	desc: 'Seeks the currently playing track. (The `time` argument can be presented as `<hours>h <minutes>m <seconds>s`, where only one is required and the rest are optional. For example, `2m 1s` and `20s` are also valid.)',
	commandSyntax: '-seek <time>',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};