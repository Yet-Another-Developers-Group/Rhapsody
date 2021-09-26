require("../assets/ExtendedMessage");
 var path = require('path');
 const chalk = require('chalk');
 const yts = require("yt-search");
 const ytdl = require("ytdl-core");
 const streamOptions = {seek: 0, volume: 1};
 exports.run = (client, message, args) => {
      if(!args || args.length < 1) return message.inlineReply("I'm sorry, I didn't understand that.");
      

      http.get('http://localhost:1800/rhapsody/getChannelId?g='+message.guild.id, (resp) => {
     let data = '';
     resp.on('data', (chunk) => {
          data += chunk;
     });
     resp.on('end', () => {
          if (resp.statusCode == "200") {
               data = JSON.parse(data)
               if (data.status == 404) {
                    message.inlineReply('You are not currently in a voice channel. Use the `join` command.');
               } else {
                    playSong(data.channelId)
               }
          } else {
               message.inlineReply('An error occurred trying to get the resource.```status: ' +resp.statusCode+ '\nguildId: ' +message.guild.id+ '```');
          }
     });
     }).on("error", (err) => {
          message.inlineReply('An error occurred trying to get the resource.')
     }); 
     function playSong() {
          const song = {
               title: "something",
               url: "somethingelse"
          }
          const VoiceChannel = 
          (async () => {
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
     }
          
 };