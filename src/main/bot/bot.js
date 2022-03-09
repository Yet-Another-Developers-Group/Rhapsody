// Require the necessary discord.js classes
const { Client, Collection } = require('discord.js');
const { token } = require('./secrets.json');
const fs = require('fs');
const chalk = require('chalk');

// Create a new client instance
const client = new Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
	intents: ['DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILDS']
});

fs.readdir(__dirname + '/./events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		const event = require(__dirname + `/./events/${file}`);
		let eventName = file.split('.')[0];
          process.send(chalk.magenta.bold('[Loading EventHandler]') + ` ${eventName}...`);
		client.on(eventName, event.bind(null, client));
	});
});

client.commands = new Collection();
fs.readdir(__dirname + '/./commands/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		let props = require(__dirname + `/./commands/${file}`);
		let commandName = file.split('.')[0];
		process.send(chalk.magenta.bold('[Loading Command]') + ` ${commandName}...`);
		client.commands.set(commandName, props);
	});
});

// Login to Discord with your client's token
client.login(token);

client.config = require('./config.json');