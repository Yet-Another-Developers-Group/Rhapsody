require('../ExtendedMessage/ExtendedMessage');
exports.run = (client, message, args) => {
	if(!args || args.length < 1) return message.inlineReply('`Error: Argument not present!`');
	const commandName = args[0];
	if(!client.commands.has(commandName)) {
		return message.inlineReply('`Error: Command ' + commandName + ' is an invalid command!`');
	}

	if (args[0].includes('rdh.')) {
		message.inlineReply('You cannot reload this command.');
		return;
	}

	delete require.cache[require.resolve(`../commands/${commandName}.js`)];
	client.commands.delete(commandName);
	const props = require(`../commands/${commandName}.js`);
	client.commands.set(commandName, props);
	message.inlineReply(`The command ${commandName} has been reloaded`);
};
