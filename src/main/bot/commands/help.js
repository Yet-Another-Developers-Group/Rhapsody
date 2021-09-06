const Discord = require("discord.js")
exports.run = (client, message, args) => {
    const helpEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Usage')
	.addFields(
		{ name: 'Never', value: 'Gonna Give You Up' }
	)
    message.channel.send(helpEmbed).catch(console.error);
}

