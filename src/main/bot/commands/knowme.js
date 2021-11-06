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

exports.run = (client, message) => {
	const knowMeEmbed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('Get to know me!')
		.setThumbnail('attachment://icon.png')
		.addFields(
			{ name: 'Who am I?', value: whoami },
			{ name: 'Meet the creators!', value: meetthedevs },
		)
		.setFooter('https://github.com/Yet-Another-Developers-Group/Rhapsody');
	message.reply({ embeds: [knowMeEmbed], files: [{attachment:'assets/logo.png', name:'icon.png'}]}).catch(console.error);
};
