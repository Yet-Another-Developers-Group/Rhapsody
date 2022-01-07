const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
require('../ExtendedMessage/ExtendedMessage');
const verboseHelp = 
`
**Music:** 
\`-join\`
  Connects the bot to the Voice Channel you're currently in.
\`-play <song name>\`:
  Starts playing a given song from a URL or search term. If a player is already playing, it adds the sng to the queue.
\`-stop\`:
  Stops playing and disconnects from the Voice Channel.
\`-pause\`:
  Pauses the player.
\`-resume\`:
  Resumes a paused player.

**Queue:**
\`-queue <song name>\`:
  Adds the song to the queue.
\`-search <song name>\`:
  Searches for a given search term.
\`-squeue\`:
  See the current queue.
\`-remove <pos>\`:
  Removes the song at the position <pos> in the queue.

**Playlist:**
\`-createpl <name>\`:
  Creates a playlist.
\`-deletepl <name>\`:
  Deletes a playlist.
\`-addtopl -n <name> -s <song>\`:
  Adds song to playlist.
\`-deletefrompl -n <name> -s <pos>\`:
  Removes the song at the position <pos> in the playlist.
\`-addpltoqueue -name\`:
  Adds the playlist to queue.

`;
const diagHelp =
`
Diagnostics coming soon.
Powered by ServerControl.
`;
exports.run = (client, message, args) => {
	if(args && args.length > 0) {
		if (args[0] == 'v' || args[0] == 'verbose') {
			const embed = new Discord.MessageEmbed()
				.setColor(defaultEmbedColor)
				.addField('Help', verboseHelp);

			message.inlineReply(embed);
		}

		if (args[0] == 'd' || args[0] == 'diagnostics') {
			const embed = new Discord.MessageEmbed()
				.setColor(defaultEmbedColor)
				.addField('Help', '```' + diagHelp + '```');

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
				{ name: 'Music', value: 'Indexing...' },
				{ name: 'Queue', value: 'Indexing...' },
				{ name: 'Playlists', value: '`createpl`, `deletepl`, `addtopl`, `deletefrompl`, `addpltoqueue`' },
				{ name: 'Miscellaneous', value: '`about`, `help`, `knowme`' },
				{ name: 'Tip', value: 'Use `v` or `verbose` after the help command to see detailed explanations for commands.' }
			);
		message.inlineReply(helpEmbed).catch(console.error);
	}
};

