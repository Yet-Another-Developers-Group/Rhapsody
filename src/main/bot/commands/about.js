const Discord = require("discord.js");
const version = require("../package.json").version;
var server = "";

const ***REMOVED*** exec ***REMOVED*** = require('child_process');
exec('uname -a', (err, stdout, stderr) => ***REMOVED***
     if (err) ***REMOVED***
     // node couldn't execute the command
     return;
     ***REMOVED***
     server+=stdout+'\n';
***REMOVED***);

exports.run = (client, message, args) => ***REMOVED***
    const helpEmbed = new Discord.MessageEmbed()
	.setColor('#ff1111')
	.setTitle('About Rhapsody')
	.addFields(
		***REMOVED*** name: 'Version', value: version ***REMOVED***,
          ***REMOVED*** name: 'Server', value: server ***REMOVED***
	)
     .setFooter('Powered by JavaScript and Python | Made by YADG | https://yet-another-developers-group.github.io')
    message.channel.send(helpEmbed).catch(console.error);
***REMOVED***
