const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { defaultEmbedColor } = require('../config.json');
const rHelpManager = require('../rHelpManager');

// PAGINATION - CONSTANTS
const backId = 'back';
const forwardId = 'forward';
const backButton = new MessageButton({
	style: 'SECONDARY',
	label: 'Previous Page',
	customId: backId
});
const forwardButton = new MessageButton({
	style: 'SECONDARY',
	label: 'Next Page',
	customId: forwardId
});

/**
 * Help.
 * @param {Discord.client} client 
 * @param {Discord.message} message 
 * @returns 
 */
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

	if (args[0] == 'list') {
		const text = helpDocs.docs.map((listItem, index) => `${index+1}. **${listItem.name}**\n\`-${listItem.id}\`\n`);
		const pages = text.chunk(5);

		let currentIndex = 0;
		const queueMessage = await message.channel.send({
			content: `**Rhapsody Commands List** - Page ${currentIndex+1}\n${pages[currentIndex].join('\r\n')}`,
			components: pages.length < 2
				? []
				: [new MessageActionRow({components: [forwardButton]})]
		});
		if (pages.length < 2) return;

		const collector = queueMessage.createMessageComponentCollector({
			filter: ({user}) => user.id == message.author.id,
			time: 360000
		});

		collector.on('collect', async interaction => {
			// Increase/decrease index
			interaction.customId === backId ? (currentIndex--) : (currentIndex++);
			// Respond to interaction by updating message with new embed
			await interaction.update({
				content: `**Rhapsody Commands List** - Page ${currentIndex+1}\n${pages[currentIndex].join('\r\n')}`,
				components: [
					new MessageActionRow({
						components: [
							// back button if it isn't the start
							...(currentIndex ? [backButton] : []),
							// forward button if it isn't the end
							...(currentIndex < pages.length-1 ? [forwardButton] : [])
						]
					})
				]
			});
		});
		return;
	}


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

const commandIsUsable = true;

module.exports = {
	run,
	shortcuts,
	helpDoc,
	commandIsUsable
};