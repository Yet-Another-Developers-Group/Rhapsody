require("../assets/ExtendedMessage");
const http = require('http');
exports.run = (client, message, args) => ***REMOVED***
    if(!args || args.length < 1) return message.inlineReply("I'm sorry, I didn't understand that.");
    http.get('http://localhost:1800/rhapsody/advanceQueue?g='+message.guild.id, (resp) => ***REMOVED***
        let data = '';
        resp.on('data', (chunk) => ***REMOVED***
        data += chunk;
    ***REMOVED***);
    resp.on('end', () => ***REMOVED***
        try ***REMOVED***
            data = JSON.parse(data)
            if (data.status == "200") ***REMOVED***  
                removeSong(data.channelId, message, args[0]);
            ***REMOVED*** else ***REMOVED***
                message.inlineReply('No songs in queue.');
            ***REMOVED***
        ***REMOVED*** catch (error) ***REMOVED***
            message.inlineReply('An error occurred trying to get the resource.')
        ***REMOVED***
    ***REMOVED***);
    ***REMOVED***).on("error", (err) => ***REMOVED***
        message.inlineReply('An error occurred trying to get the resource.')
    ***REMOVED***);
***REMOVED***;


function removeSong(channelId, message, number) ***REMOVED***
    http.get('http://localhost:1800/removeFromQueue?g='+channelId+'&pos='+number+'', (resp) => ***REMOVED***
    let data = '';
    resp.on('data', (chunk) => ***REMOVED***
        data += chunk;
    ***REMOVED***);
    resp.on('end', () => ***REMOVED***
        data = JSON.parse(data);
        if (data.status) ***REMOVED***
            message.inlineReply('Removed from queue.');
        ***REMOVED*** else ***REMOVED***
            message.inlineReply('That track is not valid.')
        ***REMOVED***
    ***REMOVED***);
    ***REMOVED***).on("error", (err) => ***REMOVED***
         message.inlineReply('An error occurred trying to get the resource.')
    ***REMOVED***);
    
***REMOVED***