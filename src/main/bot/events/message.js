<<<<<<< HEAD
module.exports = (client, message) => {
    // Ignore all bots
    if (message.author.bot) return;

    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(client.config.prefix) !== 0) return;

    // Our standard argument/command name definition.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;

    // Run the command
    cmd.run(client, message, args);
=======
require('../assets/ExtendedMessage');
module.exports = (client, message) => {
	if (message.author.bot || message.webhookId) return;
	if (message.content.includes('@here') || message.content.includes('@everyone')) return;
	if (message.mentions.has(client.user.id) && message.content.toLowerCase().includes('help')) {
		message.inlineReply('Hi there! Use the `-help` command to get started.');
		return;
	}
	if (message.channel.type === 'dm') {
		message.inlineReply('Sorry, mate. I don\'t work with DMs.');
		return;
	}
	if (message.content.indexOf(client.config.prefix) !== 0) return;

	// Our standard argument/command name definition.
	const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	// Grab the command data from the client.commands Enmap
	const cmd = client.commands.get(command);

	// If that command doesn't exist, silently exit and do nothing
	if (!cmd) return;

	// Run the command
	cmd.run(client, message, args);
>>>>>>> e2e3abc9c2b65fd9c66c52bb0e8c9ad7d84b7a87
};
