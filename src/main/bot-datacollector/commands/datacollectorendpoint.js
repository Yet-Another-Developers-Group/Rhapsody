const rDataCollectionManager = require("../rDataCollectionManager");

const run = async (client, m, args) => {
	data = args.join(' ').split('-').map(i => i.trim().replace(/[^a-zA-Z0-9]/g, ''));
	const message = await m.reply('Data recieved...');

	if (data.length < 2 ||
		typeof data[1] == 'undefined' ||
		data[0] == '' ||
		data[1] == '') return message.edit('Sorry, RDC could not understand your submission. Please use the following syntax to submit data:\n `*datacollectorendpoint <submissiondata> - <identifier>`');

	const isValid = rDataCollectionManager.checkIfIdentifierIsValid(data[1]);
	if (!isValid) return message.edit(`Sorry, RDC could not find the HelpDoc for "${data[1]}." Please try again.`);

	await message.edit(`Understood given data as:\nQuestion: \`${data[0]}\`\nExpected HelpDoc: \`${data[1]}\`\n*Please note that all data submissions are first sanitised. Special characters you may have entered will **not** appear in the results.*`);

	const hasBeenPutIntoDatabase = await rDataCollectionManager.addDataAndIdentifierArrayToDatabase(data[0], data[1]);
	if (!hasBeenPutIntoDatabase) return message.edit(`Sorry, RDC could encountered an error while trying to add your submission to the database. Please ask your bot administrator to check the logs and fix the issue.`);
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