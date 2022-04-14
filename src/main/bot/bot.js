// Require the necessary discord.js classes
const { Client, MessageEmbed } = require('discord.js');
const { token, nodes } = require('./secrets.json');
const fs = require('fs');
const chalk = require('chalk');
const lavalink = require('@lavacord/discord.js');
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

const rllManager = new lavalink.Manager(client, nodes);
rllManager.on('error', (err, node) => {
	console.log(chalk.red.bold('[ERROR!]') + `Error: ${err}\nNode: ${node.id}`);
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

module.exports = {
	rllManager,
	queues: {},
	locks: {},
};



process.stdin.resume();//so the program will not close instantly
var exitSequenceHasBeenCalled = false;
async function exitHandler(options, exitCode) {
	if  (exitSequenceHasBeenCalled) return process.exit();
	exitSequenceHasBeenCalled = true;
	console.log(chalk.bold.red(`${exitCode} WAS CALLED ON MAIN PROCESS! `));
	for (const queueObject in module.exports.queues) {
		const element = module.exports.queues[queueObject];
		if (element !== null && module.exports.rllManager.players.get(element.guildID)) {
			const emergencyEmbed = new MessageEmbed()
				.setColor('#ff0000')
				.setTitle('Process exited.')
				.setDescription('We\'re extremely sorry about this. Reach out on [GitHub](https://github.com/Yet-Another-Developers-Group/Rhapsody/issues), and we\'ll get this fixed as soon as possible.');
			await element.textChannel.send({ embeds: [emergencyEmbed] });
			console.log(chalk.bold.red(`EXITTED ${element.guildID}`));
			element.player = null;
			element.currentlyPlaying = null;
			rllManager.leave(element.guildID);
		}
	}

	console.log(chalk.bold.red('PROCESS IS EXITING!'));
	process.exit();
}


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
		exitHandler.bind(null, {name: 'uncaughtException'});
	})
	.on('exit', exitHandler.bind(null, {name: 'exit'}))
	.on('SIGINT', exitHandler.bind(null, {name: 'SIGINT'}))
	.on('SIGUSR1', exitHandler.bind(null, {name: 'SIGUSR1'}))
	.on('SIGUSR2', exitHandler.bind(null, {name: 'SIGUSR2'}));

/*

//do something when app is closing
process.on('exit', exitHandler.bind(null, {name: 'exit'}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {name: 'SIGINT'}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {name: 'SIGUSR1'}));
process.on('SIGUSR2', exitHandler.bind(null, {name: 'SIGUSR2'}));

*/


	