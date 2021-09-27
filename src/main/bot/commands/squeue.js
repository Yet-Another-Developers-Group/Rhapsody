require("../assets/ExtendedMessage");
const http = require('http');
exports.run = (client, message, args) => ***REMOVED***
    http.get('http://localhost:1800/rhapsody/getQueueList?g='+message.guild.id, (resp) => ***REMOVED***
    let data = '';
    resp.on('data', (chunk) => ***REMOVED***
            data += chunk;
    ***REMOVED***);
    resp.on('end', () => ***REMOVED***
          data = JSON.parse(data)
            if (data.status == "200" && data.queue.length > 0) ***REMOVED***
                var result = '';
                for (let i = 0; i < data.queue.length; i++) ***REMOVED***
                    const element = data.queue[i];
                    result+= (i+1)+". "+element[0]+"\n";
                ***REMOVED***
                message.inlineReply('```'+result+'```')
            ***REMOVED*** else ***REMOVED***
                message.inlineReply('No songs in queue.');
            ***REMOVED***
    ***REMOVED***);
    ***REMOVED***).on("error", (err) => ***REMOVED***
            message.inlineReply('An error occurred trying to get the resource.')
    ***REMOVED***); 
***REMOVED***;
