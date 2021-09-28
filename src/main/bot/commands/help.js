const Discord = require("discord.js")
exports.run = (client, message, args) => ***REMOVED***
    const helpEmbed = new Discord.MessageEmbed()
	.setColor('#ff1111')
	.setTitle('Rhapsody')
	.addFields(
		***REMOVED*** name: 'Music', value: '`join`, `play`, `stop`' ***REMOVED***,
		***REMOVED*** name: 'Queue', value: '`squeue`, `queue`, `remove`' ***REMOVED***,
		***REMOVED*** name: 'Miscellaneous', value: '`about`, `help`' ***REMOVED***
	)
    message.channel.send(helpEmbed).catch(console.error);
***REMOVED***

