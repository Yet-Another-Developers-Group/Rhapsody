const Discord = require("discord.js")
exports.run = (client, message, args) => {
    const helpEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Rhapsody')
    .addField('Version', 'Alpha 1')
    .setFooter('Made by YADG | Powered by JavaScript')
    message.channel.send(helpEmbed).catch(console.error);
}

