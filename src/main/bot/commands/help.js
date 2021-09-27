const Discord = require("discord.js")
exports.run = (client, message, args) => {
    const helpEmbed = new Discord.MessageEmbed()
	.setColor('#ff1111')
	.setTitle('Rhapsody')
	.addFields(
		{ name: 'Music', value: '`squeue`, `join`, `stop`, `clear`, `play`, `queue`, `stop`' }
	)
    message.channel.send(helpEmbed).catch(console.error);
}

