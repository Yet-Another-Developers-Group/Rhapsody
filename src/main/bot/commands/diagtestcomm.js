const run = async (client, message, args) => {
	message.reply(`Diagnostics Test Command \nArgs: ${args.toString()}`);
};

const shortcuts = ['dtc'];

const helpDoc = {
	name: 'Diagnostics Test Command',
	desc: '`Diagnostics Test Command`',
	commandSyntax: '-diagtestcomm <ARGS>',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

const commandIsUsable = false;

module.exports = {
	run,
	shortcuts,
	helpDoc,
	commandIsUsable
};