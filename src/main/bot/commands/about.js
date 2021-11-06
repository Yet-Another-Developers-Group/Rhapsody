const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
const version = require('../package.json').fullVersion;

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


exports.run = (client, message) => {
	const aboutEmbed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('About Rhapsody')
		.setThumbnail('attachment://icon.png')
		.addFields(
			{ name: 'Version', value: version },
			{ name: 'Python', value: pyVer },
			{ name: 'Node.js', value: nodeVer },
			{ name: 'Server', value: server }
		)
		.setFooter('Powered by JavaScript and Python | Made by YADG | yadevgroup@gmail.com | https://yet-another-developers-group.github.io');
	message.reply({ embeds: [aboutEmbed], files: [{attachment:'assets/logo.png', name:'icon.png'}]}).catch(console.error);
};
