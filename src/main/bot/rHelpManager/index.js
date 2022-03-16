const chalk = require('chalk');
const fs = require ('fs');
const moment = require('moment');

class rHelpManager {
	static generateHelpDocs() {
		var helpDocJson = {
			version: `Version ${require('../package.json').fullVersion}`,
			docs: [],
			defaultPresets: require('./helpDocsPresets.json'),
			dateCreated: '?'
		};
		fs.readdir(__dirname + '/../commands/', (err, files) => {
			if (err) return console.error(err);
			files.forEach(file => {
				if (!file.endsWith('.js')) return;
				let helpDoc = require(__dirname + `/../commands/${file}`).helpDoc;
                    
				process.send(chalk.yellow.bold('[Loading HelpDoc]') + ` ${file.split('.')[0]}...`);
				helpDoc.id = file.split('.')[0];
				helpDocJson.docs.push(helpDoc);
			});

			helpDocJson.dateCreated = moment().format('LLLL');
			fs.writeFileSync(__dirname+'/helpDocs.json', JSON.stringify(helpDocJson));
			process.send(chalk.yellow.bold('[HelpDoc Notice]') + ' HelpDoc was created.');
		});
	}

	static requireHelpDocs() {
		return require('./helpDocs.json');
	}
}

module.exports = rHelpManager;