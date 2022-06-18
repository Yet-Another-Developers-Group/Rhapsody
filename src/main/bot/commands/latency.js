/**
 * Calculates latency of the bot
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 *  */
const run = async (client, message) => {
	const msg = await message.reply('Pinged server, waiting for response...');
	msg.edit(`Response has arrived! Latency: \`${msg.createdTimestamp - message.createdTimestamp}ms\`.`);
};


const shortcuts = ['late', 'pingms'];

const helpDoc = {
	name: 'Latency',
	desc: 'Posts the server\'s latency.',
	commandSyntax: '-latency',
	shortcuts: shortcuts.map(i => '-'+i).join(', ')
};

const commandIsUsable = true;

module.exports = {
	run,
	shortcuts,
	helpDoc,
	commandIsUsable
};