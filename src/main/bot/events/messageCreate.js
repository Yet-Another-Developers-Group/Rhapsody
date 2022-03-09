const Discord = require('discord.js');
/**
 * Handles the message event.
 * @param {Discord.client} client 
 * @param {Discord.Message} message 
 */
module.exports = (client, message) => {
	if (message.author.bot || message.webhookId) return;
	if (message.content.includes('@here') || message.content.includes('@everyone')) return;
	if (message.mentions.has(client.user.id) && message.content.toLowerCase().includes('help')) {
		message.reply('Hi there! Use the `-help` command to get started.');
		return;
	}
	if (message.channel.type === 'dm') {
		message.reply('Sorry, mate. I don\'t work with DMs.');
		return;
	}
	if (message.content.indexOf(client.config.prefix) !== 0) return;
	message.reply('under construnction');
	// Our standard argument/command name definition.
	const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	// Grab the command data from the client.commands Enmap
	const cmd = client.commands.get(command);

	// If that command doesn't exist, silently exit and do nothing
	if (!cmd) return;
	
	try {
		// Run the command
		cmd.run(client, message, args);
	} catch (e) {
		const errorEmbed = new Discord.MessageEmbed()
			.setColor('#ff0000')
			.setTitle('An error occurred.')
			.setDescription('```' + e.message + '```');
		message.channel.send(errorEmbed);
		console.log(e);
	}
};
