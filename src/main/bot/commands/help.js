const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
require('../ExtendedMessage/ExtendedMessage');
const verboseHelpMusic = 
`
**Music/Queue** 
\`-join\`:
  Connects the bot to the Voice Channel you're currently in.
\`-play <song name>\`:
  Starts playing a given song from a URL or search term. If a player is already playing, it adds the song to the queue.
\`-stop\`:
  Stops playing and disconnects from the Voice Channel.
\`-pause\`:
  Pauses the player.
\`-resume\`:
  Resumes a paused player.
\`-nowplaying\`:
  Posts the currently playing song.
\`-lock\`:
  Locks the player.
  If the player is locked, only users who have been allowed can control the player. Use the \`-allow\` command to allow more people.
\`-unlock\`:
  Unlocks the player.
\`-allow <user tags>\`:
  Allows mentioned users to control the player. Multiple users can be allowed through a single command.
\`-queue <song name>\`:
  Adds the song to the queue.
\`-search <song name>\`:
  Searches for a given search term.
\`-squeue\`:
  See the current queue.
\`-remove <pos>\`:
  Removes the song at the position <pos> in the queue.
\`-skip\`:
  Skips the current song.
`;

var verboseHelpPlaylists = 
`
**Playlists**
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
\`-listavailablepls\`:
  Lists all the playlists made by your server.
\`-listtracksinpl\`:
  Lists all the tracks in a playlist.
`;

var verboseHelpMisc = 
`
**Miscellaneous**
\`-ping\`:
  Replies with "pong".
\`-knowme\`:
  Posts a small introduction to Rhapsody.
\`-whatsnew\`:
  Posts a list of new features.
\`-about\`:
  Posts information about the server.
\`-latency\`:
  Posts the server's latency.
\`-rdh\`:
  Posts an introduction to RhapsodyDiagnostics.
`;
const diagHelp =
`
Diagnostics coming soon.
Powered by \`npm:systeminfo\`.
`;
const verboseHelp = 
`
To use Verbose Help, mention the following catagories after the \`v\` flag:
- music (mu)
- playlists (pl)
- miscellaneous (mi/misc)
`;


/**
 * Posts a help message.
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {array} args 
 *  */
exports.run = (client, message, args) => {
	if(args && args.length > 0) {

		if (args[0] == 'v' || args[0] == 'verbose') {
			const embed = new Discord.MessageEmbed()
			.setColor(defaultEmbedColor)
			switch (args[1]) {
				case 'music':
				case 'mu':
					embed.addField('Help', verboseHelpMusic);
					break;

				case 'playlists':
				case 'pl':
					embed.addField('Help', verboseHelpPlaylists);
					break;

				case 'miscellaneous':
				case 'mi':
				case 'misc':
					embed.addField('Help', verboseHelpMisc);
					break;
			
				default:
					embed.addField('Help', verboseHelp);
					break;
			}

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
				{ name: 'Music/Queue', value: '`🦺 Under Construction 🦺`' },
				{ name: 'Playlists', value: '`🦺 Under Construction 🦺`' },
				{ name: 'Miscellaneous', value: '`🦺 Under Construction 🦺`' },
				{ name: 'Tip', value: 'Use `v` or `verbose` after the help command to see detailed explanations for commands.' }
			);
		message.inlineReply(helpEmbed).catch(console.error);
	}
};

