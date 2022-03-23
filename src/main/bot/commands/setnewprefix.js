const prefixModel = require('../rPrefixModel/model.js');
const moment = require('moment');

const run = async (client, message, args) => {
	if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply('You are not allowed to change the bot\'s prefix, as you do not have the permissions to manage messages.');
	if(!args || args.length < 1) return message.reply('Please specify a new prefix to use.');
	if(args.join(' ').length > 10) return message.reply('Prefixes cannot be more than 10 characters.');

	const data = await prefixModel.findOne({
		guildID: message.guild.id
	});
	
	if (data) {
		await prefixModel.findOneAndRemove({
			guildID: message.guild.id
		});
		let newData = new prefixModel({
			guildID: message.guild.id,
			setterUserID: `<@${message.author.id}>`,
			setDate: moment().format('LLLL'),
			content: args.join(' '),
		});
		newData.save();
	} else if (!data) {
		let newData = new prefixModel({
			guildID: message.guild.id,
			setterUserID: `<@${message.author.id}>`,
			setDate: moment().format('LLLL'),
			content: args.join(' '),
		});
		newData.save();
	}


	message.reply(`The new prefix is now **\`${args[0]}\`**.`);
};

const shortcuts = [];

const helpDoc = {
	name: 'Set New Prefix',
	desc: 'Configures the bot to use a different prefix for this server.',
	commandSyntax: '-setnewprefix <new prefix>',
	shortcuts: shortcuts.map(i => '`-'+i+'`').join(', ')
};

module.exports = {
	run,
	shortcuts,
	helpDoc
};