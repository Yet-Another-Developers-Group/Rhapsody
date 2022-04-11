const chalk = require('chalk');
const { Collection } = require('discord.js');
const fs = require ('fs');

class rCommandsManager {
	static loadCommands(client) {
		client.commands = new Collection();
		fs.readdir(__dirname + '/../commands/', (err, files) => {
			if (err) return console.error(err);
			files.forEach(file => {
				if (!file.endsWith('.js')) return;
				let props = require(__dirname + `/../commands/${file}`);
				let commandName = file.split('.')[0];
				process.send(chalk.magenta.bold('[Loading Command]') + ` ${commandName}...`);
				client.commands.set(commandName, props);
				props.shortcuts.forEach(sc => {
					client.commands.set(sc, props);
				});
			});
		});
	}
}

module.exports = rCommandsManager;