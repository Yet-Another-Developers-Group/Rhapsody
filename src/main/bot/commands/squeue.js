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
            if (data.status == "200") ***REMOVED***
                
                message.inlineReply(data.queue)
            ***REMOVED*** else ***REMOVED***
                message.inlineReply('An error occurred trying to get the resource.```status: ' +resp.statusCode+ '\nguildId: ' +message.guild.id+ '```');
            ***REMOVED***
    ***REMOVED***);
    ***REMOVED***).on("error", (err) => ***REMOVED***
            message.inlineReply('An error occurred trying to get the resource.')
    ***REMOVED***); 
***REMOVED***;
