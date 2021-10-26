require("../assets/ExtendedMessage");
const Discord = require("discord.js");
const defaultEmbedColor = require('../config.json').defaultEmbedColor;
const http = require('http');
exports.run = (client, message, args) => {
    if(!args || args.length < 1) return message.inlineReply("I'm sorry, I didn't understand that.");
    http.get('http://localhost:1800/rhapsody/queue/addToQueue?g='+message.guild.id+'&n='+args.toString().replace(/,/gi, ' '), (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
            data += chunk;
    });
    resp.on('end', () => {
            if (resp.statusCode == "200") {
                data = JSON.parse(data);
                if (data.status == 200) {
                    const embed = new Discord.MessageEmbed()
                    .setColor(defaultEmbedColor)
                    .setTitle('Queued audio.')
                    message.inlineReply(embed).catch(console.error);
                } else {
                    message.inlineReply('You are not currently streaming in any voice channel.')
                }
            } else {
                message.inlineReply('An error occurred while trying to get the resource.```status: ' +resp.statusCode+ '\nguildId: ' +message.guild.id+ '```');
            }
    });
    }).on("error", (err) => {
            message.inlineReply('You are not currently streaming in any voice channel.')
    }); 
};
