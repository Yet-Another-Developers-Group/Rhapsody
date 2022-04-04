const run = async (client, message, args) => {
	message.reply('Example ' + args.join(' '));
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