const Discord = require('discord.js');
const prefix = require('../rPrefixModel/model.js');


/**
 * Handles the message event.
 * @param {Discord.client} client 
 * @param {Discord.Message} message 
 */
module.exports = async (client, message) => {
	if (message.author.bot || message.webhookId) return;
	if (message.content.includes('@here') || message.content.includes('@everyone')) return;
	if (message.mentions.has(client.user.id) && message.content.toLowerCase().includes('help')) {
		message.reply('Hi there! Use the `-help` command to get started.');
		return;
	}
	
	if (message.channel.type === 'DM') {
		message.reply('Sorry, mate. I don\'t work with DMs.');
		return;
	}
	
	const data = await prefix.findOne({
		GuildID: message.guild.id
	});

	var args;

	if (data) {
		if (!message.content.startsWith(data.content)) return;
		args = message.content.slice(data.content.length).trim().split(/ +/g);
	} else {
		args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
		if (!message.content.startsWith(client.config.prefix)) return;
	}


	// Our standard argument/command name definition.
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
		message.reply({ embeds: [errorEmbed] });
		console.log(e);
	}
};
