const Discord = require("discord.js")
exports.run = (client, message, args) => {
    const helpEmbed = new Discord.MessageEmbed()
	.setColor('#ff1111')
	.setTitle('Rhapsody')
	.addFields(
		{ name: 'Music', value: '`clear`, `play`, `queue`, `seek`, `skip`, `stop`' }
	)
    message.channel.send(helpEmbed).catch(console.error);
}

