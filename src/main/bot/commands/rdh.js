const Discord = require('discord.js');


exports.run = (client, message) => {
	const attachment = new Discord.MessageAttachment('assets/diagnostics.png', 'icon.png');
	const helpEmbed = new Discord.MessageEmbed()
		.setColor('#2f3136')
		.setTitle('RhapsodyDiagnosticsHandler information')
		.setThumbnail('attachment://icon.png')
		.addFields(
			{ name: 'Rhapsody Diagnostics Handler', value: 'Diagnostics for Rhapsody. Use `-rdh.<command>` to access diagnostics information for the bot. These may include CPU, RAM, Network, etc.' }
		);
	message.reply({ embeds: [helpEmbed], files: [{attachment:'assets/diagnostics.png', name:'icon.png'}]}).catch(console.error);
};

