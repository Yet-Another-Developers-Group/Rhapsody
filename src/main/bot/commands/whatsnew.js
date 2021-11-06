const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;

const newstuff = 
`
- Pause and Resume buttons!
- Now updated to use DiscordJS v13
- Improved Embeds by adding icons
`;

exports.run = (client, message) => {
	const helpEmbed = new Discord.MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('Rhapsody 2 - What\'s New')
		.setThumbnail('attachment://icon.png')
		.setDescription(newstuff);
	message.reply({ embeds: [helpEmbed], files: [{attachment:'assets/whatsnew.png', name:'icon.png'}]}).catch(console.error);
};

