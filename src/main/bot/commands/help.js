const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { defaultEmbedColor } = require('../config.json');

exports.run = (client, message) => {
	const row = new MessageActionRow()
		.addComponents(
			new MessageSelectMenu()
				.setCustomId('select')
				.setPlaceholder('Nothing selected')
				.addOptions([
					{
						label: 'Select me',
						description: 'This is a description',
						value: 'first_option',
					},
					{
						label: 'You can select me too',
						description: 'This is also a description',
						value: 'second_option',
					},
				]),
		);
	const embed = new MessageEmbed()
		.setColor(defaultEmbedColor)
		.setTitle('Some title')
		.setURL('https://discord.js.org/')
		.setDescription('Some description here');
	message.reply({ content: 'Help', components: [row], embeds: [embed] });
};

exports.helpTab = {
     
};