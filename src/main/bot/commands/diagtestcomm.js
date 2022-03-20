const run = async (client, message, args) => {
	message.reply('test');
	const filter = m => Number(m.content) >= 1 && Number(m.content) <= 23;
	message.channel.awaitMessages({filter, max: 1, time: 1000, errors: ['time']})   
		.then(collected => message.reply(collected.size.toString()))
		.catch(collected => message.reply(collected.size.toString()));
};

const shortcuts = [];

const helpDoc = {
	name: '`DIAGTESTCOMM`',
	desc: '`DIAGNOSTICS AND TESTING - REMOVE BEFORE RELEASE!`',
	commandSyntax: '-diagtestcomm <ARGS>',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};