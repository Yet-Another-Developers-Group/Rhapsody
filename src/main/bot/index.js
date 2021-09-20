const Discord = require("discord.js")
const fs = require("fs");
const client = new Discord.Client()
const config = require("./config.json");
const secrets = require("./secrets.json");
const chalk = require('chalk');
client.config = config

fs.readdir(__dirname + "/./events/", (err, files) => ***REMOVED***
  if (err) return console.error(err);
  files.forEach(file => ***REMOVED***
    if (!file.endsWith(".js")) return;
    const event = require(__dirname + `/./events/$***REMOVED***file***REMOVED***`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  ***REMOVED***);
***REMOVED***);

client.commands = new Discord.Collection();

fs.readdir(__dirname + "/./commands/", (err, files) => ***REMOVED***
  if (err) return console.error(err);
  files.forEach(file => ***REMOVED***
    if (!file.endsWith(".js")) return;
    let props = require(__dirname + `/./commands/$***REMOVED***file***REMOVED***`);
    let commandName = file.split(".")[0];
    console.log(chalk.magenta.bold('[Loading Command]') + ` $***REMOVED***commandName***REMOVED***...`);
    client.commands.set(commandName, props);
  ***REMOVED***);
***REMOVED***);

client.login(secrets.token)
client.on('ready', () => ***REMOVED***
  console.log(chalk.green.bold('[Logged-in Notice]') + ' Logged in as ' + `$***REMOVED***client.user.tag***REMOVED***`);
  client.guilds.cache.forEach((guild) => ***REMOVED***
    console.log(chalk.gray.bold('[Member of]') + ' ' + guild.name)
  ***REMOVED***)
***REMOVED***);