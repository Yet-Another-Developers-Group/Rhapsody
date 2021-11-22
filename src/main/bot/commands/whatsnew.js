const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
require('../assets/ExtendedMessage');
const newstuff = 
`
How impatient are you?
`;

exports.run = (client, message) => {
	const attachment = new Discord.MessageAttachment('assets/whatsnew.png', 'icon.png');
	const helpEmbed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('Rhapsody 2 - What\'s New')
		.attachFiles(attachment)
		.setThumbnail('attachment://icon.png')
		.setDescription(newstuff);
	message.inlineReply(helpEmbed).catch(console.error);
};

