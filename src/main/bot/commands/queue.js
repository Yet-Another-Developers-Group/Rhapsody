require("../assets/ExtendedMessage");
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
                    message.inlineReply('Queued audio.')
                ***REMOVED*** else ***REMOVED***
                    message.inlineReply('An error occurred while trying to get the resource.')
                ***REMOVED***
            ***REMOVED*** else ***REMOVED***
                message.inlineReply('An error occurred while trying to get the resource.```status: ' +resp.statusCode+ '\nguildId: ' +message.guild.id+ '```');
            ***REMOVED***
    ***REMOVED***);
    ***REMOVED***).on("error", (err) => ***REMOVED***
            message.inlineReply('An error occurred trying to get the resource.')
    ***REMOVED***); 
***REMOVED***;
