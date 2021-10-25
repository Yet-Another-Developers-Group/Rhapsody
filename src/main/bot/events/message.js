require("../assets/ExtendedMessage");
module.exports = (client, message) => ***REMOVED***
    if (message.author.bot) return;
    if (message.content.includes("@here") || message.content.includes("@everyone")) return;
    if (message.mentions.has(client.user.id)) ***REMOVED***
        message.channel.send('Hi there! Use the `-help` command to get started.');
        return;
    ***REMOVED***;
    if (message.channel.type === 'dm') ***REMOVED***
        message.inlineReply('Sorry, mate. I don\'t work with DMs.');
        return;
    ***REMOVED***
    if (message.content.indexOf(client.config.prefix) !== 0) return;

    // Our standard argument/command name definition.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;

    // Run the command
    cmd.run(client, message, args);
***REMOVED***;
