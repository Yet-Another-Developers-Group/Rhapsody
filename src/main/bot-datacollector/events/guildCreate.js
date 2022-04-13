const chalk = require('chalk');
const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;

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
		.setTitle('Rhapsody Data Collector')
		.setDescription('Data Collection bot for Rhapsody.')
	defaultChannel.send({ embeds: [newGuildEmbed] });

};
   