const run = async (client, message, args) => {
	data = args.join(' ').split('-');
	message.reply(`Question: ${data[0]}\nExpected: ${data[1]}`);
};

const shortcuts = ['dcep', 'adddata', 'newdata'];

const helpDoc = {
	name: 'Data Collector Endpoint',
	desc: 'Allows to add new data.',
	commandSyntax: '-datacollectorendpoint <submissiondata> - <identifier>',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};