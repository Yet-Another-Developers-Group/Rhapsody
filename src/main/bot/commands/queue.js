require("../assets/ExtendedMessage");
const http = require('http');
exports.run = (client, message, args) => {
    if(!args || args.length < 1) return message.inlineReply("I'm sorry, I didn't understand that.");
    http.get('http://localhost:1800/rhapsody/addToQueue?g='+message.guild.id+'&n='+args.toString().replace(/,/gi, ' '), (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
            data += chunk;
    });
    resp.on('end', () => {
            if (resp.statusCode == "200") {
                data = JSON.parse(data);
                if (data.status == 200) {
                    message.inlineReply('Queued audio.')
                } else {
                    message.inlineReply('An error occurred while trying to get the resource.')
                }
            } else {
                message.inlineReply('An error occurred while trying to get the resource.```status: ' +resp.statusCode+ '\nguildId: ' +message.guild.id+ '```');
            }
    });
    }).on("error", (err) => {
            message.inlineReply('An error occurred trying to get the resource.')
    }); 
};
