require("../assets/ExtendedMessage");
const http = require('http');
exports.run = (client, message, args) => {
    if(!args || args.length < 1) return message.inlineReply("I'm sorry, I didn't understand that.");
    http.get('http://localhost:1800/rhapsody/getChannelId?g='+message.guild.id, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
        data += chunk;
    });
    resp.on('end', () => {
        try {
            data = JSON.parse(data)
            if (data.status == "200") {  
                removeSong(data.channelId, message, args[0]);
            } else {
                message.inlineReply('No songs in queue.');
            }
        } catch (error) {
            message.inlineReply('An error occurred trying to get the resource.')
        }
    });
    }).on("error", (err) => {
        message.inlineReply('An error occurred trying to get the resource.')
    });
};


function removeSong(channelId, message, number) {
    http.get('http://localhost:1800/rhapsody/removeFromQueue?g='+channelId+'&pos='+number+'', (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
        data += chunk;
    });
    resp.on('end', () => {
        data = JSON.parse(data);
        if (data.status == 200) {
            message.inlineReply('Removed from queue.');
        } else if (data.status == 404) {
            message.inlineReply('That track is not valid.')
        } else {
            message.inlineReply('An error occured trying to get the resource.```status: ' +data.status+ '\nguildId: ' +message.guild.id+ '```Please contact us if the error persists.')
        }
    });
    }).on("error", (err) => {
         message.inlineReply('An error occurred trying to get the resource.')
    });
    
}