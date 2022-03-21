const run = async (client, message, args) => {
	message.reply('test');
	throw 'E';
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