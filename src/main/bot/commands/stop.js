require("../assets/ExtendedMessage");
const http = require('http');
const Discord = require("discord.js");
 exports.run = (client, message, args) => ***REMOVED***
    http.get('http://localhost:1800/rhapsody/guild/getChannelId?g='+message.guild.id, (resp) => ***REMOVED***
    let data = '';
    resp.on('data', (chunk) => ***REMOVED***
            data += chunk;
    ***REMOVED***);
    resp.on('end', () => ***REMOVED***
            if (resp.statusCode == "200") ***REMOVED***
               data = JSON.parse(data)
                if (data.status == 404) ***REMOVED***
                    message.inlineReply('No voice channel to leave.');
                    return;
                ***REMOVED*** else ***REMOVED***
                    client.channels.cache.get(data.channelId).leave();
                    destroyPlayerOnServer(message); 
                ***REMOVED***
            ***REMOVED*** else ***REMOVED***
                message.inlineReply('An error occurred trying to get the resource.```status: ' +resp.statusCode+ '\nguildId: ' +message.guild.id+ '```');
            ***REMOVED***
    ***REMOVED***);
    ***REMOVED***).on("error", (err) => ***REMOVED***
            message.inlineReply('An error occurred trying to get the resource.')
    ***REMOVED***); 
 ***REMOVED***;

 function destroyPlayerOnServer(message) ***REMOVED***
    http.get('http://localhost:1800/rhapsody/guild/destroyPlayer?g='+message.guild.id, (resp) => ***REMOVED***
        let data = '';
        resp.on('data', (chunk) => ***REMOVED***
             data += chunk;
        ***REMOVED***);
        resp.on('end', () => ***REMOVED***
             if (resp.statusCode == "200") ***REMOVED***
                  const attachment = new Discord.MessageAttachment('assets/stop.png', 'icon.png');
                  const embed = new Discord.MessageEmbed()
                  .setColor('#ff1111')
                  .setTitle('Destroyed the player.')
                  .attachFiles(attachment)
                  .setThumbnail('attachment://icon.png')
                  message.inlineReply(embed).catch(console.error);

             ***REMOVED*** else ***REMOVED***
                  message.inlineReply('An error occurred while trying to get the resource.```status: ' +resp.statusCode+ '\nguildId: ' +message.guild.id+ '```');
             ***REMOVED***
        ***REMOVED***);
        ***REMOVED***).on("error", (err) => ***REMOVED***
             message.inlineReply('An error occurred while trying to get the resource.')
        ***REMOVED***);
 ***REMOVED***
