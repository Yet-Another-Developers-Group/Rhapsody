const chalk = require('chalk');
const { version } = require('../package.json');
const { setActivityStatusText } = require('../config.json');

module.exports = (client) => {
	process.send('Welcome to Rhapsody!');
	process.send(`${chalk.green.bold('[Logged-in Notice]')} Logged in as ${client.user.tag}`);
	/*client.guilds.cache.forEach((guild) => {
		process.send(chalk.gray.bold('[Member of]') + ' ' + guild.name);
	});*/
	client.user.setActivity(setActivityStatusText, {type: 'LISTENING'});
};
