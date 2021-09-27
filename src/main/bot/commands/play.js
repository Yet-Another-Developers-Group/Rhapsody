require("../assets/ExtendedMessage");
 var path = require('path');
 const chalk = require('chalk');
 const yts = require("yt-search");
 const ytdl = require("ytdl-core");
 const streamOptions = ***REMOVED***seek: 0, volume: 1***REMOVED***;
 exports.run = (client, message, args) => ***REMOVED***
      if(!args || args.length < 1) return message.inlineReply("I'm sorry, I didn't understand that.");
      

      http.get('http://localhost:1800/rhapsody/getChannelId?g='+message.guild.id, (resp) => ***REMOVED***
     let data = '';
     resp.on('data', (chunk) => ***REMOVED***
          data += chunk;
     ***REMOVED***);
     resp.on('end', () => ***REMOVED***
          if (resp.statusCode == "200") ***REMOVED***
               data = JSON.parse(data)
               if (data.status == 404) ***REMOVED***
                    message.inlineReply('You are not currently in a voice channel. Use the `join` command.');
               ***REMOVED*** else ***REMOVED***
                    playSong(data.channelId)
               ***REMOVED***
          ***REMOVED*** else ***REMOVED***
               message.inlineReply('An error occurred trying to get the resource.```status: ' +resp.statusCode+ '\nguildId: ' +message.guild.id+ '```');
          ***REMOVED***
     ***REMOVED***);
     ***REMOVED***).on("error", (err) => ***REMOVED***
          message.inlineReply('An error occurred trying to get the resource.')
     ***REMOVED***); 
     function playSong() ***REMOVED***
          const song = ***REMOVED***
               title: "something",
               url: "somethingelse"
          ***REMOVED***
          const VoiceChannel = 
          (async () => ***REMOVED***
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
     ***REMOVED***
          
 ***REMOVED***;