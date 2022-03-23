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
	if(queues[message.guild.id].currentlyPlaying.info.isStream) return message.reply('Sorry, this command does not work on Live Streams.');

	const timeString = args.join(' ');


	const unitMap = [
		{ 
			possibleValues: ['ms', 'milli', 'millisecond', 'milliseconds'],
			numberOfMilliseconds: 1
		},
		{ 
			possibleValues: ['s', 'sec', 'secs', 'second', 'seconds'],
			numberOfMilliseconds: 1000
		},
		{ 
			possibleValues: ['m', 'min', 'mins', 'minute', 'minutes'],
			numberOfMilliseconds: 60000
		},
		{ 
			possibleValues: ['h', 'hr', 'hrs', 'hour', 'hours'],
			numberOfMilliseconds: 600000
		},
	];


	const groups = timeString
		.toLowerCase()
		.match(/[0-9]+[a-z]+/g);

	if (groups == null || groups == []) return message.reply('Please specify a seek time after the command like this:\n`-seek <time>`');

	var totalMS = 0;
	for (let i = 0; i < groups.length; i++) {
		const group = groups[i];
		const value = group.match(/[0-9]+/g)[0];
		const unit = group.match(/[a-z]+/g)[0];
		const unitObject = unitMap.filter(i => i.possibleValues.indexOf(unit) > -1)[0];
		if (typeof unitObject == 'undefined') return message.reply(`Sorry, I couldn't understand this time specification: \n\`${group}\``);
		totalMS += value*unitObject.numberOfMilliseconds;
	}
	
	queues[message.guild.id].seek(totalMS);

	message.reply('Seeked.');
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