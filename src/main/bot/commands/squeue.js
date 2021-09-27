require("../assets/ExtendedMessage");
const http = require('http');
exports.run = (client, message, args) => {
    http.get('http://localhost:1800/rhapsody/getQueueList?g='+message.guild.id, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
            data += chunk;
    });
    resp.on('end', () => {
          data = JSON.parse(data)
            if (data.status == "200") {
                
                message.inlineReply(data.queue)
            } else {
                message.inlineReply('An error occurred trying to get the resource.```status: ' +resp.statusCode+ '\nguildId: ' +message.guild.id+ '```');
            }
    });
    }).on("error", (err) => {
            message.inlineReply('An error occurred trying to get the resource.')
    }); 
};
