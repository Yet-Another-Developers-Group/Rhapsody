const Discord = require("discord.js")
const https = require('https');
exports.run = (client, message, args) => ***REMOVED***
     https.get('https://catfact.ninja/fact', (resp) => ***REMOVED***
     let data = '';
     resp.on('data', (chunk) => ***REMOVED***
          data += chunk;
     ***REMOVED***);
     resp.on('end', () => ***REMOVED***
          data = JSON.parse(data);
          const helpEmbed = new Discord.MessageEmbed()
		.setColor('#ff1111')
		.setTitle('Random Cat Fact!')
		.setDescription(data.fact)
	    message.inlineReply(helpEmbed).catch(console.error);
     ***REMOVED***);
     ***REMOVED***).on("error", (err) => ***REMOVED***
          message.inlineReply('An error occurred while trying to get the resource.')
     ***REMOVED***);
***REMOVED***

