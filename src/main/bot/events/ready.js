const chalk = require('chalk');
module.exports = (client) => ***REMOVED***
  console.log(chalk.green.bold('[Logged-in Notice]') + ' Logged in as ' + `$***REMOVED***client.user.tag***REMOVED***`);
  client.guilds.cache.forEach((guild) => ***REMOVED***
    console.log(chalk.gray.bold('[Member of]') + ' ' + guild.name)
  ***REMOVED***);
  client.user.setActivity('-help', (***REMOVED***type: "LISTENING"***REMOVED***))
***REMOVED***;
