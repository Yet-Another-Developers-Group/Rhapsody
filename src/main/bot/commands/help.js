const Discord = require("discord.js")
exports.run = (client, message, args) => ***REMOVED***
	if(args && args.length > 0) ***REMOVED***
		if (args[0] == 'v' || args[0] == 'verbose') ***REMOVED***
			message.inlineReply('```-join:\n  Connects the bot to the voice channel you\'re currently in.\n\n-play:\n  Starts playing songs from the queue.\n\n-stop:\n  Stops playing and disconnects from the voice channel.\n\n-queue <link/song name>:\n  Adds the song to the queue.\n\n-squeue:\n  See the current queue.\n\n-remove <pos>:\n  Removes the song at the position <pos> in the queue.```');
		***REMOVED***
	***REMOVED*** else ***REMOVED***
		const helpEmbed = new Discord.MessageEmbed()
		.setColor('#ff1111')
		.setTitle('Rhapsody')
		.addFields(
			***REMOVED*** name: 'Music', value: '`join`, `play`, `stop`' ***REMOVED***,
			***REMOVED*** name: 'Queue', value: '`squeue`, `queue`, `remove`' ***REMOVED***,
			***REMOVED*** name: 'Miscellaneous', value: '`about`, `help`' ***REMOVED***
		)
	    message.channel.send(helpEmbed).catch(console.error);
	***REMOVED***;
***REMOVED***

