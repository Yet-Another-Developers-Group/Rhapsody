require("../assets/ExtendedMessage");
const http = require('http');
 exports.run = (client, message, args) => {
     const VoiceChannel = message.member.voice.channel;
     if (!VoiceChannel || typeof VoiceChannel == 'undefined') {
          return message.inlineReply("You are not currently in any voice channel.");
     }
     http.get('http://localhost:1800/rhapsody/addNewGuildChannel?g='+ message.guild.id +'&c='+ VoiceChannel.id, (resp) => {
     let data = '';
     resp.on('data', (chunk) => {
          data += chunk;
     });
     resp.on('end', () => {
          if (resp.statusCode == "200") {
               data = JSON.parse(data)
               if (data.status == 200) {      
                    VoiceChannel.join();
                    message.inlineReply('Joined Voice Channel.');
               } else {
                    message.inlineReply('An error occurred trying to get the resource.```status: ' +data.status+ '\nvoiceChannelId: ' +VoiceChannel.id+ '\nguildId: ' +message.guild.id+ '```');
               }
          } else {
               message.inlineReply('An error occurred trying to get the resource.```status: ' +resp.statusCode+ '\nvoiceChannelId: ' +VoiceChannel.id+ '\nguildId: ' +message.guild.id+ '```');
          }
     });
     }).on("error", (err) => {
          message.inlineReply('An error occurred trying to get the resource.')
     });  
 };