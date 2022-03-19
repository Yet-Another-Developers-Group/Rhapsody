const run = (client, message, args) => {
	message.reply("Example");
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