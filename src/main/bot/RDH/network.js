const Discord = require("discord.js")

exports.run = (client, message, args) => ***REMOVED***
     const attachment = new Discord.MessageAttachment('assets/ethernet.png', 'icon.png');
     const embed = new Discord.MessageEmbed()
     .setColor('#2f3136')
     .setTitle('RhapsodyDiagnosticsHandler')
     .attachFiles(attachment)
     .setThumbnail('attachment://icon.png')
     .addFields(
          ***REMOVED*** name: 'Coming soon.', value: 'Coming soon.' ***REMOVED***
     )
     message.channel.send(embed).catch(console.error);
***REMOVED***

