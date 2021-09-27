const Discord = require("discord.js");
const version = require("../package.json").version;
var server = "";
var pyVer = "";
var nodeVer = ""
const { exec } = require('child_process');
exec('uname -a', (err, stdout, stderr) => {
     if (err) {
     // node couldn't execute the command
     return;
     }
     server+=stdout+'\n';
});

exec('node -v', (err, stdout, stderr) => {
     if (err) {
     // node couldn't execute the command
     return;
     }
     nodeVer+=stdout+'\n';
});

exec('python3 -V', (err, stdout, stderr) => {
     if (err) {
     // node couldn't execute the command
     return;
     }
     pyVer+=stdout+'\n';
});


exports.run = (client, message, args) => {
    const helpEmbed = new Discord.MessageEmbed()
	.setColor('#ff1111')
	.setTitle('About Rhapsody')
	.addFields(
		{ name: 'Version', value: version },
          { name: 'Python', value: pyVer },
          { name: 'Node.js', value: nodeVer },
          { name: 'Server', value: server }
	)
     .setFooter('Powered by JavaScript and Python | Made by YADG | yadevgroup@gmail.com | https://yet-another-developers-group.github.io')
    message.channel.send(helpEmbed).catch(console.error);
}
