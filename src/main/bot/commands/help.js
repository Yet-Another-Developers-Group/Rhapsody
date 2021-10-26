const Discord = require("discord.js");
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
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
exports.run = (client, message, args) => {
	if(args && args.length > 0) {
		if (args[0] == 'v' || args[0] == 'verbose') {
			const embed = new Discord.MessageEmbed()
                .setColor(defaultEmbedColor)
                .addField('Help', '```' + verboseHelp + '```')

			message.inlineReply(embed);
		}

		if (args[0] == 'd' || args[0] == 'diagnostics') {
			const embed = new Discord.MessageEmbed()
                .setColor(defaultEmbedColor)
                .addField('Help', '```' + diagHelp + '```')

			message.inlineReply(embed);
		}
	} else {
		const attachment = new Discord.MessageAttachment('assets/help.png', 'icon.png');
		const helpEmbed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('Rhapsody')
		.attachFiles(attachment)
		.setThumbnail('attachment://icon.png')
		.addFields(
			{ name: 'Music', value: '`join`, `play`, `stop`' },
			{ name: 'Queue', value: '`squeue`, `queue`, `remove`' },
			{ name: 'Miscellaneous', value: '`about`, `help`, `knowme`' },
			{ name: 'Tip', value: 'Use `v` or `verbose` after the help command to see detailed explanations for commands.' }
		)
	    message.inlineReply(helpEmbed).catch(console.error);
	};
}

