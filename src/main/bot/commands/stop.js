require("../assets/ExtendedMessage");
const http = require('http');
 exports.run = (client, message, args) => {
    http.get('http://localhost:1800/rhapsody/getChannelId?g='+message.guild.id, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
            data += chunk;
    });
    resp.on('end', () => {
            if (resp.statusCode == "200") {
               data = JSON.parse(data)
                if (data.status == 404) {
                    message.inlineReply('No voice channel to leave.');
                    return;
                } else {
                    client.channels.cache.get(data.channelId).leave();
                    destroyPlayerOnServer(message); 
                }
            } else {
                message.inlineReply('An error occurred trying to get the resource.```status: ' +resp.statusCode+ '\nguildId: ' +message.guild.id+ '```');
            }
    });
    }).on("error", (err) => {
            message.inlineReply('An error occurred trying to get the resource.')
    }); 
 };

 function destroyPlayerOnServer(message) {
    http.get('http://localhost:1800/rhapsody/destroyPlayer?g='+message.guild.id, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
             data += chunk;
        });
        resp.on('end', () => {
             if (resp.statusCode == "200") {
                  message.inlineReply('Destroyed the player.');
             } else {
                  message.inlineReply('An error occurred trying to get the resource.```status: ' +resp.statusCode+ '\nguildId: ' +message.guild.id+ '```');
             }
        });
        }).on("error", (err) => {
             message.inlineReply('An error occurred trying to get the resource.')
        });
 }
