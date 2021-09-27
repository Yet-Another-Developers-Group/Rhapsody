require("../assets/ExtendedMessage");
const Discord = require("discord.js");
var path = require('path');
const chalk = require('chalk');
const yts = require("yt-search");
const ytdl = require("ytdl-core");
const streamOptions = ***REMOVED***seek: 0, volume: 1***REMOVED***;
const http = require('http');

exports.run = (client, message, args) => ***REMOVED***
     const VoiceChannel = message.member.voice.channel;
     if (!VoiceChannel || typeof VoiceChannel == 'undefined') ***REMOVED***
          return message.inlineReply("You are not currently in any voice channel.");
     ***REMOVED***

     queryQueueServer(message, client)
***REMOVED***;

function queryQueueServer(message, client) ***REMOVED***
     http.get('http://localhost:1800/rhapsody/advanceQueue?g='+message.guild.id, (resp) => ***REMOVED***
     let data = '';
     resp.on('data', (chunk) => ***REMOVED***
          data += chunk;
     ***REMOVED***);
     resp.on('end', () => ***REMOVED***
          data = JSON.parse(data)
          if (data.status == "200") ***REMOVED***  
               playSong(data.nowPlaying, message, client);
          ***REMOVED*** else ***REMOVED***
               message.inlineReply('No songs to play. Use the `queue` command to queue songs.');
          ***REMOVED***
     ***REMOVED***);
     ***REMOVED***).on("error", (err) => ***REMOVED***
          message.inlineReply('An error occurred trying to get the resource.')
     ***REMOVED***); 
***REMOVED***

function playSong(array, message, client) ***REMOVED***
     http.get('http://localhost:1800/rhapsody/getChannelId?g='+ message.guild.id, (resp) => ***REMOVED***
     let data = '';
     resp.on('data', (chunk) => ***REMOVED***
          data += chunk;
     ***REMOVED***);
     resp.on('end', () => ***REMOVED***
          data = JSON.parse(data);
          var VoiceChannel = client.channels.cache.get(data.channelId);
          (async () => ***REMOVED***
               const song = ***REMOVED***
                    title: array[0],
                    url: array[1]
               ***REMOVED***;
               VoiceChannel.join().then(function(connection) ***REMOVED***
                    console.log(chalk.green.bold('[Connected]') + ' Successfully connected to voice channel "' + VoiceChannel.name + '" on "' + message.guild.name + '" by request of "' + message.author.tag + '". Playing "' + song.title + '"');
                    const stream = ytdl("https://"+song.url, ***REMOVED***filter: 'audioonly'***REMOVED***);
                    const dispatcher = connection.play(stream, streamOptions);
                    dispatcher.on('finish', function () ***REMOVED***
                         queryQueueServer(message, client);
                    ***REMOVED***)
                    const songEmbed = new Discord.MessageEmbed()
                    .setColor('#ff1111')
                    .setImage(array[2])
                    .addFields(
                         ***REMOVED*** name: 'Now Playing', value: song.title ***REMOVED***
                    );

                    message.inlineReply(songEmbed);
               ***REMOVED***)
          ***REMOVED***)()
     ***REMOVED***);
     ***REMOVED***).on("error", (err) => ***REMOVED***
          message.inlineReply('An error occurred trying to get the resource.')
     ***REMOVED***);
     
***REMOVED***