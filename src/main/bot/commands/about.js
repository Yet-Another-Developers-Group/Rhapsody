const Discord = require("discord.js");
const version = require("../package.json").fullVersion;
var server = "";
var pyVer = "";
var nodeVer = ""
const ***REMOVED*** exec ***REMOVED*** = require('child_process');
exec('uname -a', (err, stdout, stderr) => ***REMOVED***
     if (err) ***REMOVED***
     // node couldn't execute the command
     return;
     ***REMOVED***
     server+=stdout+'\n';
***REMOVED***);

exec('node -v', (err, stdout, stderr) => ***REMOVED***
     if (err) ***REMOVED***
     // node couldn't execute the command
     return;
     ***REMOVED***
     nodeVer+=stdout+'\n';
***REMOVED***);

exec('python3 -V', (err, stdout, stderr) => ***REMOVED***
     if (err) ***REMOVED***
     // node couldn't execute the command
     return;
     ***REMOVED***
     pyVer+=stdout+'\n';
***REMOVED***);


exports.run = (client, message, args) => ***REMOVED***
     const attachment = new Discord.MessageAttachment('assets/logo.png', 'icon.png');
    const helpEmbed = new Discord.MessageEmbed()
	.setColor('#ff1111')
	.setTitle('About Rhapsody')
     .attachFiles(attachment)
	.setThumbnail('attachment://icon.png')
	.addFields(
		***REMOVED*** name: 'Version', value: version ***REMOVED***,
          ***REMOVED*** name: 'Python', value: pyVer ***REMOVED***,
          ***REMOVED*** name: 'Node.js', value: nodeVer ***REMOVED***,
          ***REMOVED*** name: 'Server', value: server ***REMOVED***
	)
     .setFooter('Powered by JavaScript and Python | Made by YADG | yadevgroup@gmail.com | https://yet-another-developers-group.github.io')
    message.channel.send(helpEmbed).catch(console.error);
***REMOVED***
