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

/**
 * Posts an embed with information about Rhapsody
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 */
const run = async (client, message) => {
	const aboutEmbed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('About Rhapsody')
		.addFields(
			{ name: 'Version', value: version },
			{ name: 'Python', value: pyVer },
			{ name: 'Node.js', value: nodeVer },
			{ name: 'Server', value: server }
		)
		.setFooter({ text: 'Powered by JavaScript and Python | https://github.com/Yet-Another-Developers-Group/Rhapsody' });
	message.reply({ embeds: [aboutEmbed] });
};


const shortcuts = ['aboutrhapsody', 'info', 'aboutserver'];

const helpDoc = {
	name: 'About',
	desc: 'Posts information about the server.',
	commandSyntax: '-about',
	shortcuts: shortcuts.map(i => '-'+i).join(', ')
};

const commandIsUsable = true;

module.exports = {
	run,
	shortcuts,
	helpDoc,
	commandIsUsable
};