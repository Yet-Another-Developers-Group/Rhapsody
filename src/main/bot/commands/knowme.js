const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
require('../ExtendedMessage/ExtendedMessage');
const whoami = 
`
I'm Rhapsody, a bot that delivers a powerful music listening experience to your Discord server.
`;

const meetthedevs = 
`
Sumukh Prasad ([github.com/SumukhPrasad](https://github.com/SumukhPrasad))
Anubhav Shyjesh ([github.com/Physics-Phreak](https://github.com/Physics-Phreak))

"Happy listening!" - *the developers*
`;

exports.run = (client, message) => {
	const attachment = new Discord.MessageAttachment('assets/logo.png', 'icon.png');
	const helpEmbed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('Get to know me!')
		.attachFiles(attachment)
		.setThumbnail('attachment://icon.png')
		.addFields(
			{ name: 'Who am I?', value: whoami },
			{ name: 'Meet the creators!', value: meetthedevs },
		)
		.setFooter('https://github.com/Yet-Another-Developers-Group/Rhapsody');
	message.inlineReply(helpEmbed).catch(console.error);
};
