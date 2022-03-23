const prefixModel = require('../rPrefixModel/model.js');
const Discord = require('discord.js');
const defaultEmbedColor = require('../config.json').defaultEmbedColor;

const run = async (client, message) => {
	const data = await prefixModel.findOne({
		GuildID: message.guild.id
	});
	
	if (data) {
		const embed = new Discord.MessageEmbed()
			.setColor(defaultEmbedColor)
			.setTitle('Prefix Configuration')
			.addFields(
				{name: 'Prefix', value: `\`${data.content}\``},
				{name: 'Set Date', value: `This prefix was set on ${data.setDate}.`},
				{name: 'Set By', value: `This prefix was set by ${data.setterUserID}.`}
			);
		return message.reply({ embeds: [embed] });
	}
	message.reply('There\'s no custom prefix set for this server.');
};

const shortcuts = [];

const helpDoc = {
	name: 'What Prefix Is in Use',
	desc: 'Posts information about the current custom prefix.',
	commandSyntax: '-whatprefix',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};