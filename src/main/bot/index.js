const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const secrets = require('./secrets.json');
const chalk = require('chalk');
const lavalink = require('@lavacord/discord.js');
const RhapsodyDashboardAPIServer = require('./server/index.js');

// Log to file as well as console.
var util = require('util');
var logFile = fs.createWriteStream('log.txt', { flags: 'a' });
var logStdout = process.stdout;

/**
 * Makes console.log write to a file as well as stdout
 */
console.log = function () {
  	logFile.write(util.format.apply(null, arguments) + '\n');
  	logStdout.write(util.format.apply(null, arguments) + '\n');
};

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
const rllManager = new lavalink.Manager(client, config.nodes);
rllManager.on('error', (err, node) => {
	console.log(chalk.red.bold('[ERROR!]') + `Error: ${err}\nNode: ${node.id}`);
});
RhapsodyDashboardAPIServer.start(config.port);
client.config = config;

const startupBanner = `
╭──────────────────────────────────────────────────╮
│                                                  │
│                     `+chalk.white.bold('Rhapsody')+`                     │
│                                                  │
│ `+chalk.cyan.bold('https://github.com/Yet-Another-Developers-Group/')+` │
│                    `+chalk.cyan.bold('Rhapsody')+`                      │
│                                                  │
│    `+chalk.yellow('Made by Sumukh Prasad and Anubhav Shyjesh,')+`    │
│                       `+chalk.yellow('YADG')+`                       │
│                                                  │
╰──────────────────────────────────────────────────╯
`;
console.clear();
console.log(startupBanner);

fs.readdir(__dirname + '/./events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		const event = require(__dirname + `/./events/${file}`);
		let eventName = file.split('.')[0];
		client.on(eventName, event.bind(null, client));
	});
});

client.commands = new Discord.Collection();

fs.readdir(__dirname + '/./commands/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		let props = require(__dirname + `/./commands/${file}`);
		let commandName = file.split('.')[0];
		console.log(chalk.magenta.bold('[Loading Command]') + ` ${commandName}...`);
		client.commands.set(commandName, props);
	});
});

fs.readdir(__dirname + '/./RDH/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		let props = require(__dirname + `/./RDH/${file}`);
		let commandName = 'rdh.'+file.split('.')[0];
		console.log(chalk.magenta.bold('[Loading RhapsodyDiagnosticsHandler Command]') + ` ${commandName}...`);
		client.commands.set(commandName, props);
	});
});

client.login(secrets.token);

process.stdin.resume();//so the program will not close instantly
var exitSequenceHasBeenCalled = false;
function exitHandler(options, exitCode) {
	if  (exitSequenceHasBeenCalled) return process.exit();
	exitSequenceHasBeenCalled = true;
	console.log(chalk.bold.red(`${exitCode} WAS CALLED ON MAIN PROCESS! `));
	for (const queueObject in module.exports.queues) {
		if (Object.hasOwnProperty.call(module.exports.queues, queueObject)) {
			const element = module.exports.queues[queueObject];
			if (element !== null && module.exports.rllManager.players.get(element.guildID)) {
				const emergencyEmbed = new Discord.MessageEmbed()
					.setColor('#ff0000')
					.setTitle('Process exited.')
					.setDescription('We\'re extremely sorry about this. Reach out on [GitHub](https://github.com/Yet-Another-Developers-Group/Rhapsody), and we\'ll get this fixed as soon as possible.');
				element.textChannel.send(emergencyEmbed);
				console.log(chalk.bold.red(`EXITTED ${element.guildID}`));
				element.player = null;
				element.currentlyPlaying = null;
				rllManager.leave(element.guildID);
			}
		}
	}
	console.log(chalk.bold.red('PROCESS IS EXITING!'));
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, {name: 'exit'}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {name: 'SIGINT'}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {name: 'SIGUSR1'}));
process.on('SIGUSR2', exitHandler.bind(null, {name: 'SIGUSR2'}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {name: 'uncaughtException'}));

module.exports = {
	client,
	rllManager,
	commands: client.commands,
	queues: {},
	locks: {},
};
