const chalk = require('chalk');
const { rllManager } = require('..');
module.exports = (client) => {
	console.log(chalk.green.bold('[Logged-in Notice]') + ' Logged in as ' + `${client.user.tag}`);
	client.guilds.cache.forEach((guild) => {
		console.log(chalk.gray.bold('[Member of]') + ' ' + guild.name);
	});
	console.log(chalk.green.bold('[Connecting]') + ' Awaiting connection to LavaLink Server...');
	rllManager.connect().then(success => {
		console.log(chalk.green.bold('[Connected]') + ` Connected to LavaLink Server!\n${chalk.green.bold('[Connected]')} Info: Connected to ${success.filter(ws => ws || null).length} node(s)!`);
	}).catch(err => {
		console.error(chalk.red.bold('[ERROR!]') + ` COULD NOT CONNECT TO LAVALINK! CHECK SERVER!\n${chalk.red.bold('[ERROR!]')} Error: ${err}`);
		process.exit(1);
	});
	client.user.setActivity('-help', ({type: 'LISTENING'}));
};
