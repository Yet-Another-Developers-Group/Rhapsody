const chalk = require('chalk');
const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
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
module.exports = (client, guild) => {
	console.log(chalk.gray.bold('[Added to guild!]') + ' ' + guild.name);

	let defaultChannel = '';
	guild.channels.cache.forEach((channel) => {
		if(channel.type == 'text' && defaultChannel == '') {
			if(channel.permissionsFor(guild.me).has('SEND_MESSAGES')) {
				defaultChannel = channel;
			}
		}
	});
	const attachment = new Discord.MessageAttachment('assets/logo.png', 'icon.png');
	const helpEmbed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('Hi, there!')
		.attachFiles(attachment)
		.setThumbnail('attachment://icon.png')
		.addFields(
			{ name: 'Who am I?', value: whoami },
			{ name: 'Meet the creators!', value: meetthedevs },
		)
		.setFooter('https://github.com/Yet-Another-Developers-Group/Rhapsody');
	defaultChannel.send(helpEmbed);

};
   