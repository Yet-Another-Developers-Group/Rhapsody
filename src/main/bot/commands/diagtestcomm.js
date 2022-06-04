const run = async (client, message, args) => {
	message.reply(`Diagnostics Test Command - Remove Before Release\nArgs: ${args.toString()}`);
};

const shortcuts = ['dtc'];

const helpDoc = {
	name: 'Diagnostics Test Command',
	desc: '`Diagnostics Test Command - Remove Before Release`',
	commandSyntax: '-diagtestcomm <ARGS>',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};