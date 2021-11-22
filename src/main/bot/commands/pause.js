const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
require('../assets/ExtendedMessage');
exports.run = (client, message) => {
	const embed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('Pause - Not Yet Finished.')
		.setDescription('Coming soon.');
	message.inlineReply(embed).catch(console.error);
};

