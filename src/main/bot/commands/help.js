const Discord = require("discord.js")
exports.run = (client, message, args) => {
    const helpEmbed = new Discord.MessageEmbed()
	.setColor('#ff1111')
	.setTitle('Rhapsody')
	.addFields(
		{ name: 'Something.', value: 'Something else.' }
	)
    message.channel.send(helpEmbed).catch(console.error);
}

