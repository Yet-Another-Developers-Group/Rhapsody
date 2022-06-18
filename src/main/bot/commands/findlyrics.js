const rGeniusLyricsManager = require('../rGeniusManager/index.js');
const Discord = require('discord.js');
const geniusEmbedColor = require('../config.json').geniusEmbedColor;


const run = async (client, message, args) => {
	if(!args || args.length < 1) return message.reply('Please use a search term or URL after the command like this:\n`-findlyrics <search term or URL>`');
	const songData = await rGeniusLyricsManager.getLyrics(args.join(' '));

	if (!songData) return message.reply(`Sorry, I couldn't find the lyrics for "${args.join(' ')}". Please try again with a diffrent search term.`);

	const embed = new Discord.MessageEmbed()
		.setColor(geniusEmbedColor)
		.setAuthor({ name: songData.result.primary_artist.name, iconURL: songData.result.primary_artist.image_url, url: songData.result.primary_artist.url })
		.setThumbnail(songData.result.song_art_image_thumbnail_url)
		.setTitle(songData.result.full_title)
		.setDescription(`[Genius - ${songData.result.title}](${songData.result.url})`)
		.setFooter({ text: 'Powered by Genius.', iconURL: 'https://images.rapgenius.com/365f0e9e7e66a120867b7b0ff340264a.750x750x1.png' });

	message.reply({ embeds: [embed] });
};

const shortcuts = [];

const helpDoc = {
	name: 'Find Lyrics',
	desc: 'Find lyrics for a song.',
	commandSyntax: '-findlyrics <search term>',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

const commandIsUsable = true;

module.exports = {
	run,
	shortcuts,
	helpDoc,
	commandIsUsable
};