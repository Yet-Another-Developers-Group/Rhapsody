const Discord = require("discord.js")
const fs = require("fs");
const client = new Discord.Client()
const config = require("./config.json");
const secrets = require("./secrets.json");
const chalk = require('chalk');
client.config = config

fs.readdir(__dirname + "/./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(__dirname + `/./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Discord.Collection();

fs.readdir(__dirname + "/./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(__dirname + `/./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(chalk.magenta.bold('[Loading Command]') + ` ${commandName}...`);
    client.commands.set(commandName, props);
  });
});

client.login(secrets.token)
client.on('ready', () => {
  console.log(chalk.green.bold('[Logged-in Notice]') + ' Logged in as ' + `${client.user.tag}`);
  client.guilds.cache.forEach((guild) => {
    console.log(chalk.gray.bold('[Member of]') + ' ' + guild.name)
  })
});