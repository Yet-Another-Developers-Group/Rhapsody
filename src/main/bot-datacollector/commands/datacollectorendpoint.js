const run = async (client, m, args) => {
	data = args.join(' ').split('-').map(i => i.trim());
	const message = await m.reply('Data recieved...');

	if (data.length < 2 ||
		typeof data[1] == 'undefined' ||
		data[0] == '' ||
		data[1] == '') return message.edit('Sorry, RDC could not understand your submission. Please use the following syntax to submit data:\n `*datacollectorendpoint <submissiondata> - <identifier>`')

	message.edit(`Understood given data as:\nQuestion: \`${data[0]}\`\nExpected HelpDoc: \`${data[1]}\``);
};

const shortcuts = ['dcep', 'adddata', 'newdata'];

const helpDoc = {
	name: 'Data Collector Endpoint',
	desc: 'Allows to add new data.',
	commandSyntax: '*datacollectorendpoint <submissiondata> - <identifier>',
	shortcuts: shortcuts.map(i => '`*'+i+'`').join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};