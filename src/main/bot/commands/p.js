require("../assets/ExtendedMessage");
var path = require('path');
const chalk = require('chalk');
const yts = require("yt-search");
const ytdl = require("ytdl-core");
const streamOptions = {seek: 0, volume: 1};
exports.run = (client, message, args) => {
     if(!args || args.length < 1) return message.inlineReply("I'm sorry, I didn't understand that.");
     const VoiceChannel = message.member.voice.channel;
     if (!VoiceChannel || typeof VoiceChannel == 'undefined') {
          return message.inlineReply("You are not currently in any voice channel.");
     }

     

     
     (async () => {
          // Searches YouTube with the message content (this joins the arguments
          // together because songs can have spaces)
          const {videos} = await yts(args.toString().replace(/,/gi, ' '));
          if (!videos.length) return message.inlineReply("No songs were found!");
          const song = {
               title: videos[0].title,
               url: videos[0].url
          };
          //message.inlineReply(song.url);
          VoiceChannel.join().then(function(connection) {
               console.log(chalk.green.bold('[Connected]') + ' Successfully connected to voice channel "' + VoiceChannel.name + '" on "' + message.guild.name + '" by request of "' + message.author.tag + '". Playing "' + song.title + '"');
               const stream = ytdl(song.url, {filter: 'audioonly'});
               const dispatcher = connection.play(stream, streamOptions);
               dispatcher.on('end', () => {
                    VoiceChannel.leave();
               })
               message.inlineReply('Playing "' + song.title + '".');
               //console.log(song.url);
          })
     })()    
};
