const chalk = require('chalk');
const util = require('util');
const rUtilities = require('../rUtilities/rUtilities.js');
const fs = require('fs');
class Logger {
	static log() {
		var now = new Date();
		var dd   =  rUtilities.fixZeroes(now.getDate(), 2);
		var mo   =  rUtilities.fixZeroes(now.getMonth(), 2);
		var yyyy =  rUtilities.fixZeroes(now.getFullYear(), 4);
		var hh   =  rUtilities.fixZeroes(now.getHours(), 2);
		var mi   =  rUtilities.fixZeroes(now.getMinutes(), 2);
		var ss   =  rUtilities.fixZeroes(now.getSeconds(), 2);

		var logFile = fs.createWriteStream(`logs/files/log-${dd}-${mo}-${yyyy}.txt`, { flags: 'a' });
		var logStdout = process.stdout;

		var logLine = `${chalk.cyan.bold(`[${dd}-${mo}-${yyyy}-${hh}:${mi}:${ss}]`)} ${util.format.apply(null, arguments)}\n`;

		logFile.write(logLine);
		logStdout.write(logLine);
	}
}

module.exports = Logger;