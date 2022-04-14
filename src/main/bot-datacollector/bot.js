// Require the necessary discord.js classes
const { Client, MessageEmbed } = require('discord.js');
const { token } = require('./secrets.json');
const fs = require('fs');
const chalk = require('chalk');
const rHelpManager = require('./rHelpManager');
const rCommandsManager = require('./rCommandsManager');

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/rhapsody', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Create a new client instance
const client = new Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
	intents: ['DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILDS', 'GUILDS', 'GUILD_VOICE_STATES']
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

rCommandsManager.loadCommands(client);
rHelpManager.generateHelpDocs();

// Login to Discord with your client's token
client.login(token);

client.config = require('./config.json');


process
	.on('unhandledRejection', (reason, p) => {
		process.send('Unhandled Rejection at Promise');
		process.send(JSON.stringify(reason));
		process.send(JSON.stringify(p));

		console.log(reason, 'Unhandled Rejection at Promise', p);
	})
	.on('uncaughtException', err => {
		process.send('Uncaught Exception thrown');
		process.send(JSON.stringify(err));
		console.log(err, 'Uncaught Exception thrown');
		process.exit()
	})