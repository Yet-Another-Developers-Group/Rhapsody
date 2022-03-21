const queues = require('../bot.js').queues;
const locks = require('../bot.js').locks;
const msToHMS = require('../rUtilities/rUtilities.js').millisecondsToHMSString;


const run = async (client, message) => {
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.reply('You must be in a Voice Channel to use this command.');
	if(!queues[message.guild.id]) return message.reply('I\'m not playing anything here at the moment. Use the `queue` or `play` command to add more songs to the queue.');
	if(locks[message.guild.id] &&
               typeof locks[message.guild.id] != 'undefined' &&
               locks[message.guild.id].isLocked && 
               locks[message.guild.id].userID != message.author.id &&
               locks[message.guild.id].allowedUsers.indexOf('<@!'+message.author.id+'>') < 0) return message.reply('This player is currently locked by <@!'+locks[message.guild.id].userID+'>.');


     const tracks = Object.keys(queues[message.guild.id].queue).filter((a) => queues[message.guild.id].queue[a] > 1).map((song, index) => `${++index}) ${song.info.title} - ${song.info.author} - ${msToHMS(song.info.length)}`).join('\n');

     message.reply(tracks != '' ? `Are you sure you want to remove duplicate tracks from the queue?\n\`\`\`${tracks}\`\`\`\n(Reply to this message with y/n to confirm.)` : `No duplicates found.`);

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
	message.reply(`Removed duplicate tracks.`);
}

const shortcuts = [];

const helpDoc = {
	name: 'Remove Duplicate Tracks',
	desc: 'Removes duplicate tracks from your queue.',
	commandSyntax: '-removeduplicatetracks',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};