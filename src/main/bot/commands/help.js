const Discord = require("discord.js")
exports.run = (client, message, args) => {
	if(args && args.length > 0) {
		if (args[0] == 'v' || args[0] == 'verbose') {
			message.inlineReply('```-join:\n  Connects the bot to the voice channel you\'re currently in.\n\n-play:\n  Starts playing songs from the queue.\n\n-stop:\n  Stops playing and disconnects from the voice channel.\n\n-queue <link/song name>:\n  Adds the song to the queue.\n\n-squeue:\n  See the current queue.\n\n-remove <pos>:\n  Removes the song at the position <pos> in the queue.```');
		}
	} else {
		const helpEmbed = new Discord.MessageEmbed()
		.setColor('#ff1111')
		.setTitle('Rhapsody')
		.addFields(
			{ name: 'Music', value: '`join`, `play`, `stop`' },
			{ name: 'Queue', value: '`squeue`, `queue`, `remove`' },
			{ name: 'Miscellaneous', value: '`about`, `help`' }
		)
	    message.channel.send(helpEmbed).catch(console.error);
	};
}

