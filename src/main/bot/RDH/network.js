const Discord = require('discord.js');

exports.run = (client, message) => {
	const attachment = new Discord.MessageAttachment('assets/ethernet.png', 'icon.png');
	const embed = new Discord.MessageEmbed()
		.setColor('#2f3136')
		.setTitle('RhapsodyDiagnosticsHandler')
		.attachFiles(attachment)
		.setThumbnail('attachment://icon.png')
		.addFields(
			{ name: 'Coming soon.', value: 'Coming soon.' }
		);
	message.channel.send(embed).catch(console.error);
};

