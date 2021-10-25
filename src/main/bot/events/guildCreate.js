const chalk = require('chalk');
module.exports = (client, guild) => {
     console.log(chalk.gray.bold('[Added to guild!]') + ' ' + guild.name);

     let defaultChannel = "";
     guild.channels.cache.forEach((channel) => {
          if(channel.type == "text" && defaultChannel == "") {
               if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                    defaultChannel = channel;
               }
          }
     })
     defaultChannel.send('Hi! I\'m Rhapsody. Use the `-help` command to get started.');

};
   