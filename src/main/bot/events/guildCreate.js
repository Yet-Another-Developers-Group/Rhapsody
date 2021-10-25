const chalk = require('chalk');
module.exports = (client, guild) => ***REMOVED***
     console.log(chalk.gray.bold('[Added to guild!]') + ' ' + guild.name);

     let defaultChannel = "";
     guild.channels.cache.forEach((channel) => ***REMOVED***
          if(channel.type == "text" && defaultChannel == "") ***REMOVED***
               if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) ***REMOVED***
                    defaultChannel = channel;
               ***REMOVED***
          ***REMOVED***
     ***REMOVED***)
     defaultChannel.send('Hi! I\'m Rhapsody. Use the `-help` command to get started.');

***REMOVED***;
   