require("../assets/ExtendedMessage");
exports.run = (client, message, args) => ***REMOVED***
    if(!args || args.length < 1) return message.reply("`Error: Argument not present!`");
    const commandName = args[0];
    if(!client.commands.has(commandName)) ***REMOVED***
        return message.inlineReply('`Error: Command ' + commandName + ' is an invalid command!`');
    ***REMOVED***

    if (args[0].includes('rdh.')) ***REMOVED***
        message.inlineReply(`You cannot reload this command.`);
        return;
    ***REMOVED***

    delete require.cache[require.resolve(`../commands/$***REMOVED***commandName***REMOVED***.js`)];
    client.commands.delete(commandName);
    const props = require(`../commands/$***REMOVED***commandName***REMOVED***.js`);
    client.commands.set(commandName, props);
    message.inlineReply(`The command $***REMOVED***commandName***REMOVED*** has been reloaded`);
***REMOVED***;
