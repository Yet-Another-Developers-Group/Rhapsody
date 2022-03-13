const chalk = require('chalk');
const { setActivityStatusText } = require('../config.json');
const rHelpManager = require('../rHelpManager/index.js');

module.exports = (client) => {
	process.send('Welcome to Rhapsody!');
	process.send(`${chalk.green.bold('[Logged-in Notice]')} Logged in as ${client.user.tag}`);
	/*client.guilds.cache.forEach((guild) => {
		process.send(chalk.gray.bold('[Member of]') + ' ' + guild.name);
	});*/
	client.user.setActivity(setActivityStatusText, {type: 'LISTENING'});
	rHelpManager.generateHelpDocs();
};
