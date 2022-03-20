const { MessageEmbed } = require('discord.js');
const { defaultEmbedColor } = require('../config.json');
const rHelpManager = require('../rHelpManager');

const run = async (client, message, args) => {
	const helpDocs = rHelpManager.requireHelpDocs();
	const helpEmbed = new MessageEmbed()
		.setColor(defaultEmbedColor)
		.setFooter({text: `${helpDocs.version}, HelpDocs created on ${helpDocs.dateCreated}.`});

	if (args.length < 1) {
		helpEmbed
			.setTitle(helpDocs.defaultPresets.defaultDialogIntroductionTitle)
			.setDescription(helpDocs.defaultPresets.defaultDialogIntroductionDescription);
		return message.reply({ embeds: [helpEmbed] });
	}
	if (args[0] == 'list') return message.reply({ content: `**Rhapsody Commands List**\n\`\`\`${helpDocs.docs.map(doc => `${doc.name + ' - ' + doc.id}\n`).join('')}\`\`\`` });

	const helpDoc = helpDocs.docs.filter(doc => doc.id == args[0])[0];

	if (!helpDoc) {
		helpEmbed
			.setTitle(helpDocs.defaultPresets.defaultDialogIntroductionTitle)
			.setDescription(helpDocs.defaultPresets.defaultNotFoundMessageDescription.replace('%REQUESTEDNAME%', args[0]));
	} else {
		helpEmbed
			.setTitle(helpDocs.defaultPresets.defaultTitleSchema.replace('%COMMANDNAME%', helpDoc.name))
			.setDescription(helpDocs.defaultPresets.defaultDescriptionSchema
				.replace('%COMMANDDESCRIPTION%', helpDoc.desc)
				.replace('%COMMANDSYNTAX%', helpDoc.commandSyntax)
				.replace('%COMMANDSHORTCUTS%', helpDoc.shortcuts));
	}
	message.reply({ embeds: [helpEmbed] });
};

const shortcuts = ['h', 'showhelp', 'commands'];

const helpDoc = {
	name: 'Help',
	desc: 'Provides help on commands/functions.',
	commandSyntax: '-help <command>',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};