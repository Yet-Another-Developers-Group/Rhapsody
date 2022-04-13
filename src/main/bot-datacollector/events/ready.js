const chalk = require('chalk');
const { setActivityStatusText } = require('../config.json');
const { rllManager } = require('../bot.js');

module.exports = (client) => {
	process.send('Welcome to Rhapsody Data Collector!');
	process.send(`${chalk.green.bold('[Logged-in Notice]')} Logged in as ${client.user.tag}`);
	client.user.setActivity(setActivityStatusText, {type: 'LISTENING'});
};
