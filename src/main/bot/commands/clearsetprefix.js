const prefixModel = require('../rPrefixModel/model.js');

const run = async (client, message) => {
	if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply('You are not allowed to change the bot\'s prefix, as you do not have the permissions to manage messages.');

	const data = await prefixModel.findOne({
		guildID: message.guild.id
	});
	
	if (data) {
		await prefixModel.findOneAndRemove({
			guildID: message.guild.id
		});
		
		message.reply('The custom prefix was removed.');
	} else if (!data) {
		message.reply('I\'m sorry, there does not appear to be a custom prefix configuration for this server.');
	}
};

const shortcuts = [];

const helpDoc = {
	name: 'Clear Prefix',
	desc: 'Deletes the custom prefix configuration for this server.',
	commandSyntax: '-clearsetprefix',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};