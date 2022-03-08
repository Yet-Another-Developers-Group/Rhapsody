const chalk = require('chalk');
const { ShardingManager } = require('discord.js');
const Logger = require('./helpers/logger');
const { printStartupBanner } = require('./helpers/printStartupBanner');

console.clear();
printStartupBanner()

const manager = new ShardingManager('./bot.js', {
     token: require('./secrets.json').token,
     totalShards: 'auto'
});
manager.on('shardCreate', shard => {
     Logger.log(`${chalk.gray.bold("[Shard Launch Notice]")} Launched shard ${shard.id} succesfuly!`);
     shard.on("ready", () => {
          Logger.log(`${chalk.green.bold("[Shard Connect Notice]")} Shard ${shard.id} connected succesfuly!`);
     });
     shard.on("message", (message) => {
          Logger.log(`${chalk.gray.bold(`shard${shard.id}`)} ${message}`);
     });
});

manager.spawn();