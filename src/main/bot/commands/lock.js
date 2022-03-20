const queues = require('..').queues;
const locks = require('..').locks;


/**
 * Locks stream.
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 *  */
const run = async (client, message) => {
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.reply('You must be in a Voice Channel to use this command.');
	if(!queues[message.guild.id]) return message.reply('I\'m not playing anything here at the moment. Use the `queue` or `play` command to add more songs to the queue.');
	if(locks[message.guild.id] && locks[message.guild.id].isLocked && locks[message.guild.id].userID != message.author.id && locks[message.guild.id].allowedUsers.indexOf('<@!'+message.author.id+'>') > -1 ) return message.reply('This player is currently locked by <@!'+locks[message.guild.id].userID+'>.');

	var isLocked = locks[message.guild.id].lock(message.author.id, []);
	if (isLocked) {
		message.reply('Locked. You can unlock by using the `-unlock` command (If you don\'t, this player will automatically unlock in 15 minutes.).');
		(async function () {
			setTimeout(() => {
				var isUnlocked = locks[message.guild.id].unlock();
				if (isUnlocked) {
					message.reply('Automatically unlocked this player.');
				}
			}, 900000);
		})();
	} else {
		message.reply('Cannot lock.');
	}
};

const shortcuts = [];

const helpDoc = {
	name: '',
	desc: '',
	commandSyntax: '',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};