const Discord = require("discord.js");
require("../assets/ExtendedMessage");
const verboseHelp = 
`
-join:
  Connects the bot to the voice channel you\'re currently in.
  
-play:
  Starts playing songs from the queue.
  
-stop:
  Stops playing and disconnects from the voice channel.
  
-queue <link/song name>:
  Adds the song to the queue.
  
-squeue:
  See the current queue.
  
-remove <pos>:
  Removes the song at the position <pos> in the queue.
  
 
Tip: The -play and -stop commands are universal controls. Use the queue command to queue song first, then use -play.

`
const diagHelp =
`
Diagnostics coming soon.
Powered by ServerControl.
`
exports.run = (client, message, args) => ***REMOVED***
	if(args && args.length > 0) ***REMOVED***
		if (args[0] == 'v' || args[0] == 'verbose') ***REMOVED***
			const embed = new Discord.MessageEmbed()
                .setColor('#ff1111')
                .addField('Help', '```' + verboseHelp + '```')

			message.inlineReply(embed);
		***REMOVED***

		if (args[0] == 'd' || args[0] == 'diagnostics') ***REMOVED***
			const embed = new Discord.MessageEmbed()
                .setColor('#ff1111')
                .addField('Help', '```' + diagHelp + '```')

			message.inlineReply(embed);
		***REMOVED***
	***REMOVED*** else ***REMOVED***
		const attachment = new Discord.MessageAttachment('assets/logo.png', 'icon.png');
		const helpEmbed = new Discord.MessageEmbed()
		.setColor('#ff1111')
		.setTitle('Rhapsody')
		.attachFiles(attachment)
		.setThumbnail('attachment://icon.png')
		.addFields(
			***REMOVED*** name: 'Music', value: '`join`, `play`, `stop`' ***REMOVED***,
			***REMOVED*** name: 'Queue', value: '`squeue`, `queue`, `remove`' ***REMOVED***,
			***REMOVED*** name: 'Miscellaneous', value: '`about`, `help`' ***REMOVED***,
			***REMOVED*** name: 'Tip', value: 'Use `v` or `verbose` after the help command to see detailed explanations for commands.' ***REMOVED***
		)
	    message.inlineReply(helpEmbed).catch(console.error);
	***REMOVED***;
***REMOVED***

