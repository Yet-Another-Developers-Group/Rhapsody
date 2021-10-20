require("../assets/ExtendedMessage");
const http = require('http');
 exports.run = (client, message, args) => ***REMOVED***
     const VoiceChannel = message.member.voice.channel;
     if (!VoiceChannel || typeof VoiceChannel == 'undefined') ***REMOVED***
          return message.inlineReply("You are not currently in any voice channel.");
     ***REMOVED***
     http.get('http://localhost:1800/rhapsody/guild/addNewGuildChannel?g='+ message.guild.id +'&c='+ VoiceChannel.id, (resp) => ***REMOVED***
     let data = '';
     resp.on('data', (chunk) => ***REMOVED***
          data += chunk;
     ***REMOVED***);
     resp.on('end', () => ***REMOVED***
          if (resp.statusCode == "200") ***REMOVED***
               data = JSON.parse(data)
               if (data.status == 200) ***REMOVED***      
                    VoiceChannel.join();
                    message.inlineReply('Joined Voice Channel.');
               ***REMOVED*** else ***REMOVED***
                    message.inlineReply('You seem to be already streaming in this server. If you aren\'t, try using `stop` and then using `join` again. If that doesn\'t work, contact us.');
               ***REMOVED***
          ***REMOVED*** else ***REMOVED***
               message.inlineReply('An error occurred while trying to get the resource.```status: ' +resp.statusCode+ '\nvoiceChannelId: ' +VoiceChannel.id+ '\nguildId: ' +message.guild.id+ '```Try using `stop` and then using `join` again. If that doesn\'t work, contact us.');
          ***REMOVED***
     ***REMOVED***);
     ***REMOVED***).on("error", (err) => ***REMOVED***
          message.inlineReply('An error occurred while trying to get the resource.')
     ***REMOVED***);  
 ***REMOVED***;