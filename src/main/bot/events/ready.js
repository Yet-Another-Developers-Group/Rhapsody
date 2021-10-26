const chalk = require('chalk');
module.exports = (client) => {
	console.log(chalk.green.bold('[Logged-in Notice]') + ' Logged in as ' + `${client.user.tag}`);
	client.guilds.cache.forEach((guild) => {
		console.log(chalk.gray.bold('[Member of]') + ' ' + guild.name);
	});
	client.user.setActivity('-help', ({type: 'LISTENING'}));
};
