const queues = require('../bot.js').queues;
const locks = require('../bot.js').locks;


/**
 * Locks stream.
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 *  */
const run = async (client, message) => {
	if(!message.member.voice.channel || typeof message.member.voice.channel == 'undefined') return message.reply('You must be in a Voice Channel to use this command.');
	if (!message.member.voice.channel.permissionsFor(message.guild.me).has('CONNECT', 'SPEAK')) return message.author.send(`I'm sorry, I don't have permissions to play music in **#${message.member.voice.channel.name}** on the **${message.guild.name}** server. Please contact your server's administrators/moderators to fix this issue. If you are the administrator/moderator for the server, you can fix this issue by giving Rhapsody the following permissions:\n- Connect\n- Speak\n- Priority Speaker`);
	if(!queues[message.guild.id]) return message.reply('I\'m not playing anything here at the moment. Use the `queue` or `play` command to add more songs to the queue.');
	if(locks[message.guild.id] && 
		locks[message.guild.id].isLocked && 
		locks[message.guild.id].userID != message.author.id && 
		locks[message.guild.id].allowedUsers.indexOf('<@!'+message.author.id+'>') < 0 ) return message.reply('This player is currently locked by <@!'+locks[message.guild.id].userID+'>.');

	var isLocked = locks[message.guild.id].lock(message.author.id, []);
	if (isLocked) {
		message.reply('Locked. You can unlock by using the `-unlock` command (If you don\'t, this player will automatically unlock in 15 minutes.).');
		(async function () {
			setTimeout(() => {
				if(locks[message.guild.id] && 
					locks[message.guild.id].isLocked) { 
					var isUnlocked = locks[message.guild.id].unlock();
					if (isUnlocked) {
						message.reply('Automatically unlocked this player.');
					}
				}
			}, 900000);
		})();
	} else {
		message.reply('Cannot lock.');
	}
};

const shortcuts = [];

const helpDoc = {
	name: 'Lock',
	desc: 'Locks the player.\nIf the player is locked, only users who have been allowed can control the player. Use the `-allow` command to allow more people.',
	commandSyntax: '-lock',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

const commandIsUsable = true;

module.exports = {
	run,
	shortcuts,
	helpDoc,
	commandIsUsable
};