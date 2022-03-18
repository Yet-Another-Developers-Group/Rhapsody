const run = (client, message, args) => {
	var output = '-- OUTPUT FOR THIS COMMAND HAS NOT BEEN CONFIGURED. --';

	message.reply('```DIAGNOSTICS AND TESTING OUTPUT\n'+output+'```');
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