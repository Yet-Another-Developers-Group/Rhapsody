const ***REMOVED*** APIMessage, Structures ***REMOVED*** = require("discord.js");

class ExtAPIMessage extends APIMessage ***REMOVED***
    resolveData() ***REMOVED***
        if (this.data) return this;
        super.resolveData();
        const allowedMentions = this.options.allowedMentions || this.target.client.options.allowedMentions || ***REMOVED******REMOVED***;
        if (allowedMentions.repliedUser !== undefined) ***REMOVED***
            if (this.data.allowed_mentions === undefined) this.data.allowed_mentions = ***REMOVED******REMOVED***;
            Object.assign(this.data.allowed_mentions, ***REMOVED*** replied_user: allowedMentions.repliedUser ***REMOVED***);
        ***REMOVED***
        if (this.options.replyTo !== undefined) ***REMOVED***
            Object.assign(this.data, ***REMOVED*** message_reference: ***REMOVED*** message_id: this.options.replyTo.id ***REMOVED*** ***REMOVED***);
        ***REMOVED***
        return this;
    ***REMOVED***
***REMOVED***

class Message extends Structures.get("Message") ***REMOVED***
    inlineReply(content, options) ***REMOVED***
        return this.channel.send(ExtAPIMessage.create(this, content, options, ***REMOVED*** replyTo: this ***REMOVED***).resolveData());
    ***REMOVED***

    edit(content, options) ***REMOVED***
        return super.edit(ExtAPIMessage.create(this, content, options).resolveData());
    ***REMOVED***
***REMOVED***

Structures.extend("Message", () => Message);