require("../assets/ExtendedMessage");
const http = require('http');
exports.run = (client, message, args) => {
    http.get('http://localhost:1800/rhapsody/queue/getQueueList?g='+message.guild.id, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
            data += chunk;
    });
    resp.on('end', () => {
          data = JSON.parse(data)
            if (data.status == "200" && data.queue.length > 0) {
                var result = '';
                for (let i = 0; i < data.queue.length; i++) {
                    const element = data.queue[i];
                    result+= (i+1)+". "+element[0]+"\n";
                }
                message.inlineReply('```'+result+'```')
            } else {
                message.inlineReply('No songs in queue.');
            }
    });
    }).on("error", (err) => {
            message.inlineReply('An error occurred while trying to get the resource.')
    }); 
};
