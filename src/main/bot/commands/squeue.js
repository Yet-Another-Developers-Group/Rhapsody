require("../assets/ExtendedMessage");
const Discord = require("discord.js")
const http = require('http');
exports.run = (client, message, args) => ***REMOVED***
    http.get('http://localhost:1800/rhapsody/queue/getQueueList?g='+message.guild.id, (resp) => ***REMOVED***
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

                const attachment = new Discord.MessageAttachment('assets/squeue.png', 'icon.png');
                const embed = new Discord.MessageEmbed()
                .setColor('#ff1111')
                .attachFiles(attachment)
                .setThumbnail('attachment://icon.png')
                .addField('Queue', '```'+result+'```')
                message.inlineReply(embed).catch(console.error);

            ***REMOVED*** else ***REMOVED***
                message.inlineReply('No songs in queue.');
            ***REMOVED***
    ***REMOVED***);
    ***REMOVED***).on("error", (err) => ***REMOVED***
            message.inlineReply('An error occurred while trying to get the resource.')
    ***REMOVED***); 
***REMOVED***;
