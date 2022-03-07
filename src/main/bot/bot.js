// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const Logger = require('./helpers/logger');
const { token } = require('./secrets.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	Logger.log('Welcome to Rhapsody!');
     client.user.setActivity('-help', {type: 'LISTENING'});
});

// Login to Discord with your client's token
client.login(token);