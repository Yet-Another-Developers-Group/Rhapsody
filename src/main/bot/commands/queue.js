require("../assets/ExtendedMessage");
const Discord = require("discord.js");
const http = require('http');
exports.run = (client, message, args) => ***REMOVED***
    if(!args || args.length < 1) return message.inlineReply("I'm sorry, I didn't understand that.");
    http.get('http://localhost:1800/rhapsody/queue/addToQueue?g='+message.guild.id+'&n='+args.toString().replace(/,/gi, ' '), (resp) => ***REMOVED***
    let data = '';
    resp.on('data', (chunk) => ***REMOVED***
            data += chunk;
    ***REMOVED***);
    resp.on('end', () => ***REMOVED***
            if (resp.statusCode == "200") ***REMOVED***
                data = JSON.parse(data);
                if (data.status == 200) ***REMOVED***
                    const embed = new Discord.MessageEmbed()
                    .setColor('#ff1111')
                    .setTitle('Queued audio.')
                    message.inlineReply(embed).catch(console.error);
                ***REMOVED*** else ***REMOVED***
                    message.inlineReply('You are not currently in any voice channel.')
                ***REMOVED***
            ***REMOVED*** else ***REMOVED***
                message.inlineReply('An error occurred while trying to get the resource.```status: ' +resp.statusCode+ '\nguildId: ' +message.guild.id+ '```');
            ***REMOVED***
    ***REMOVED***);
    ***REMOVED***).on("error", (err) => ***REMOVED***
            message.inlineReply('You are not currently in any voice channel.')
    ***REMOVED***); 
***REMOVED***;
