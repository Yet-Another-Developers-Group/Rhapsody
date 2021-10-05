const Discord = require("discord.js")
const https = require('https');
exports.run = (client, message, args) => {
     https.get('https://catfact.ninja/fact', (resp) => {
     let data = '';
     resp.on('data', (chunk) => {
          data += chunk;
     });
     resp.on('end', () => {
          data = JSON.parse(data);
          const helpEmbed = new Discord.MessageEmbed()
		.setColor('#ff1111')
		.setTitle('Random Cat Fact!')
		.setDescription(data.fact)
	    message.inlineReply(helpEmbed).catch(console.error);
     });
     }).on("error", (err) => {
          message.inlineReply('An error occurred while trying to get the resource.')
     });
}

