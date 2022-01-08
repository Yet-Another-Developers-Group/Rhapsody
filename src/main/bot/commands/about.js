const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
const version = require('../package.json').fullVersion;
require('../ExtendedMessage/ExtendedMessage');
var server = '';
var pyVer = '';
var nodeVer = '';
const { exec } = require('child_process');
exec('uname -a', (err, stdout) => {
	if (err) {
		// node couldn't execute the command
		return;
	}
	server+=stdout+'\n';
});

exec('node -v', (err, stdout) => {
	if (err) {
		// node couldn't execute the command
		return;
	}
	nodeVer+=stdout+'\n';
});

exec('python3 -V', (err, stdout) => {
	if (err) {
		// node couldn't execute the command
		return;
	}
	pyVer+=stdout+'\n';
});

/**
 * Posts an embed with information about Rhapsody
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 */
exports.run = (client, message) => {
	const attachment = new Discord.MessageAttachment('assets/logo.png', 'icon.png');
	const helpEmbed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('About Rhapsody')
		.attachFiles(attachment)
		.setThumbnail('attachment://icon.png')
		.addFields(
			{ name: 'Version', value: version },
			{ name: 'Python', value: pyVer },
			{ name: 'Node.js', value: nodeVer },
			{ name: 'Server', value: server }
		)
		.setFooter('Powered by JavaScript and Python | Made by YADG | yadevgroup@gmail.com | https://yet-another-developers-group.github.io');
	message.inlineReply(helpEmbed).catch(console.error);
};
