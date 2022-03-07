const chalk = require('chalk');
const { ShardingManager } = require('discord.js');
const Logger = require('./helpers/logger');

const manager = new ShardingManager('./bot.js', {
     token: require('./secrets.json').token,
     totalShards: 'auto'
});

manager.on('shardCreate', shard => Logger.log(`${chalk.gray.bold("[Shard Launch Notice]")} Launched shard ${shard.id}`));

manager.spawn();