const run = async (client, message, args) => {
	data = args.join(' ').split('-');
	message.reply(`Question: ${data[0]}\nExpected: ${data[1]}`);
};

const shortcuts = ['dtc'];

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