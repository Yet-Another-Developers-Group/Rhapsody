const Discord = require("discord.js")

const newstuff = 
`
- New RhapsodyDiagnosticsHandler module
- Improved Embeds by adding icons
`

exports.run = (client, message, args) => ***REMOVED***
	const attachment = new Discord.MessageAttachment('assets/whatsnew.png', 'icon.png');
	const helpEmbed = new Discord.MessageEmbed()
		.setColor('#ff1111')
		.setTitle('Rhapsody 2 - What\'s New')
		.attachFiles(attachment)
		.setThumbnail('attachment://icon.png')
		.setDescription(newstuff)
	    message.inlineReply(helpEmbed).catch(console.error);
***REMOVED***

