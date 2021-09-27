const Discord = require("discord.js")
exports.run = (client, message, args) => ***REMOVED***
    const helpEmbed = new Discord.MessageEmbed()
	.setColor('#ff1111')
	.setTitle('Rhapsody')
	.addFields(
		***REMOVED*** name: 'Music', value: '`squeue`, `join`, `stop`, `clear`, `play`, `queue`, `skip`, `stop`' ***REMOVED***
	)
    message.channel.send(helpEmbed).catch(console.error);
***REMOVED***

