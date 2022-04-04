const chalk = require('chalk');
const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;

/**
 * Announes something in all the servers the bot is in.
 * @param {string} title - Title of announcement
 * @param {string} description - Description/content of announcement
 */
function sendAnnouncement(title, description) {
	console.log(chalk.gray.bold('[Announcement]') + ` Sent announcement with title "${chalk.bold(title)}"`);
	description = description.replace(/\<rhapsodyAPINewlineIndicator\>/g, '\n');
	const { client } = require('../index.js');

	client.guilds.cache.forEach((guild) => {
		let defaultChannel = '';
		guild.channels.cache.forEach((channel) => {
			if(channel.type == 'text' && defaultChannel == '') {
				if(channel.permissionsFor(guild.me).has('SEND_MESSAGES')) {
					defaultChannel = channel;
				}
			}
		});
		const attachment = new Discord.MessageAttachment('assets/logo.png', 'icon.png');
		const announcementEmbed = new Discord.MessageEmbed()
			.setColor(defaultEmbedColor)
			.setTitle(title)
			.attachFiles(attachment)
			.setThumbnail('attachment://icon.png')
			.setDescription(description)
			.setFooter('https://github.com/Yet-Another-Developers-Group/Rhapsody');
		defaultChannel.send(announcementEmbed);
	});
	

}
   
module.exports = { sendAnnouncement };