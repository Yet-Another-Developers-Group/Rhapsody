const chalk = require('chalk');
const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
const presets = require('../rGlobalMessageContentPresets/presets.json').introductoryMessage;

/**
 * Posts a message when the bot is added to a new Guild.
 * @param {Discord.Client} client - bot's client
 * @param {Discord.Guild} guild - guild which the bot joined
 */

module.exports = (client, guild) => {
	process.send(chalk.gray.bold('[Added to guild!]') + ' ' + guild.name);

	var defaultChannel = null;
	guild.channels.cache.forEach((channel) => {
		if(channel.type == 'GUILD_TEXT' && defaultChannel == null) {
			if(channel.permissionsFor(guild.me).has('SEND_MESSAGES')) {
				defaultChannel = channel;
			}
		}
	});
	
	const newGuildEmbed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle(presets.title)
		.addFields(presets.fields)
		.setFooter(presets.footer);
	defaultChannel.send({ embeds: [newGuildEmbed] });

};

/*

const attachment = new Discord.MessageAttachment('assets/logo.png', 'icon.png');
	const helpEmbed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('%GUILDCREATEEVENTDEFAULTTITLE%')
		.setThumbnail('attachment://icon.png')
		.addFields(
			{ name: 'Who am I?', value: whoami },
			{ name: 'Meet the creators!', value: meetthedevs },
		)
		.setFooter({ text: 'https://github.com/Yet-Another-Developers-Group/Rhapsody' });
	defaultChannel.send({ embeds: [helpEmbed], files: [attachment]});


*/
   