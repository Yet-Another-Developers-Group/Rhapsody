const chalk = require('chalk');
const Logger = require('./logger.js');
function printStartupBanner() {
	const startupBanner = `
╭──────────────────────────────────────────────────╮
│                                                  │
│              `+chalk.white.bold('Rhapsody DataCollector')+`              │
│                                                  │
│ `+chalk.cyan.bold('https://github.com/Yet-Another-Developers-Group/')+` │
│                    `+chalk.cyan.bold('Rhapsody')+`                      │
│                                                  │
│    `+chalk.yellow('Made by Sumukh Prasad and Anubhav Shyjesh,')+`    │
│                       `+chalk.yellow('YADG')+`                       │
│                                                  │
╰──────────────────────────────────────────────────╯
`;
	Logger.log(startupBanner);
}

module.exports = {printStartupBanner};