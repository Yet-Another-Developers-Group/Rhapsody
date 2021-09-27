require("../assets/ExtendedMessage");
exports.run = (client, message, args) => {
    if(!args || args.length < 1) return message.reply("`Error: Argument not present!`");
    const commandName = args[0];
    if(!client.commands.has(commandName)) {
        return message.inlineReply('`Error: Command ' + commandName + ' is an invalid command!`');
    }
    delete require.cache[require.resolve(`./${commandName}.js`)];
    client.commands.delete(commandName);
    const props = require(`./${commandName}.js`);
    client.commands.set(commandName, props);
    message.inlineReply(`The command ${commandName} has been reloaded`);
};
