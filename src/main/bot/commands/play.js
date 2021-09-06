require("../assets/ExtendedMessage");
var path = require('path');
const chalk = require('chalk');
const yts = require("yt-search");
const ytdl = require("ytdl-core");
const streamOptions = ***REMOVED***seek: 0, volume: 1***REMOVED***;
exports.run = (client, message, args) => ***REMOVED***
     if(!args || args.length < 1) return message.inlineReply("I'm sorry, I didn't understand that.");
     const VoiceChannel = message.member.voice.channel;
     if (!VoiceChannel || typeof VoiceChannel == 'undefined') ***REMOVED***
          return message.inlineReply("You are not currently in any voice channel.");
     ***REMOVED***

     

     
     (async () => ***REMOVED***
          // Searches YouTube with the message content (this joins the arguments
          // together because songs can have spaces)
          const ***REMOVED***videos***REMOVED*** = await yts(args.toString().replace(/,/gi, ' '));
          if (!videos.length) return message.inlineReply("No songs were found!");
          const song = ***REMOVED***
               title: videos[0].title,
               url: videos[0].url
          ***REMOVED***;
          //message.inlineReply(song.url);
          VoiceChannel.join().then(function(connection) ***REMOVED***
               console.log(chalk.green.bold('[Connected]') + ' Successfully connected to voice channel "' + VoiceChannel.name + '" on "' + message.guild.name + '" by request of "' + message.author.tag + '". Playing "' + song.title + '"');
               const stream = ytdl(song.url, ***REMOVED***filter: 'audioonly'***REMOVED***);
               const dispatcher = connection.play(stream, streamOptions);
               dispatcher.on('end', () => ***REMOVED***
                    VoiceChannel.leave();
               ***REMOVED***)
               message.inlineReply('Playing "' + song.title + '".');
               //console.log(song.url);
          ***REMOVED***)
     ***REMOVED***)()    
***REMOVED***;
