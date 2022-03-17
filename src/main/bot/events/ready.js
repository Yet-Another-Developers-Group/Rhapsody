const chalk = require('chalk');
const { setActivityStatusText } = require('../config.json');
const { rllManager } = require('../bot.js');

module.exports = (client) => {
	process.send('Welcome to Rhapsody!');
	process.send(`${chalk.green.bold('[Logged-in Notice]')} Logged in as ${client.user.tag}`);
	rllManager.connect().then(success => {
		process.send(chalk.green.bold('[Connected]') + ` Connected to LavaLink Server!`);
		process.send(`${chalk.green.bold('[Connected]')} Info: Connected to ${success.filter(ws => ws || null).length} node(s)!`);
	}).catch(err => {
		process.send(chalk.red.bold('[ERROR!]') + ` COULD NOT CONNECT TO LAVALINK! CHECK SERVER!\n${chalk.red.bold('[ERROR!]')} Error: ${err}`);
		process.exit(1);
	});
	client.user.setActivity(setActivityStatusText, {type: 'LISTENING'});
};
