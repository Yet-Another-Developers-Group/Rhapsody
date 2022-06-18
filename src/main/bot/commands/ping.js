/**
 * Ping/pong
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 *  */
const run = async (client, message) => {
	message.reply('Pong!');
};

const shortcuts = [];

const helpDoc = {
	name: 'Ping',
	desc: 'Replies with "pong".',
	commandSyntax: '-ping',
	shortcuts: shortcuts.map(i => '-'+i).join(', ')
};

const commandIsUsable = true;

module.exports = {
	run,
	shortcuts,
	helpDoc,
	commandIsUsable
};