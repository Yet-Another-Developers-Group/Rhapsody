const Discord = require("discord.js")
exports.run = (client, message, args) => {
    const helpEmbed = new Discord.MessageEmbed()
	.setColor('#ff1111')
	.setTitle('Rhapsody')
	.addFields(
		{ name: 'Music', value: '`join`, `play`, `stop`' },
		{ name: 'Queue', value: '`squeue`, `queue`, `remove`' },
		{ name: 'Miscellaneous', value: '`about`, `help`' }
	)
    message.channel.send(helpEmbed).catch(console.error);
}

