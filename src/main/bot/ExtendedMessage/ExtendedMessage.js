const { APIMessage, Structures } = require('discord.js');
/**
 * Extends API for messages
 * @constructor
 * @augments APIMessage
 */

class ExtAPIMessage extends APIMessage {
	resolveData() {
		if (this.data) return this;
		super.resolveData();
		const allowedMentions = this.options.allowedMentions || this.target.client.options.allowedMentions || {};
		if (allowedMentions.repliedUser !== undefined) {
			if (this.data.allowed_mentions === undefined) this.data.allowed_mentions = {};
			Object.assign(this.data.allowed_mentions, { replied_user: allowedMentions.repliedUser });
		}
		if (this.options.replyTo !== undefined) {
			Object.assign(this.data, { message_reference: { message_id: this.options.replyTo.id } });
		}
		return this;
	}
}

/**
 * Extends API for messages with [inlineReply]{@link inlineReply} and [edit]{@link edit}
 * @constructor
 * @extends Message
 */
class Message extends Structures.get('Message') {

	/**
	 * Allows bot to use inline replies.
	 * @param {string} content - content of the reply to send
	 * @param {string} options - options for the reply to send
	 * @returns Message
	 */
	inlineReply(content, options) {
		return this.channel.send(ExtAPIMessage.create(this, content, options, { replyTo: this }).resolveData());
	}

	/**
	 * Allows bot to edit messages it sent.
	 * @param {string} content - content to change message's existing content to
	 * @param {string} options - options
	 * @returns Message
	 */
	edit(content, options) {
		return super.edit(ExtAPIMessage.create(this, content, options).resolveData());
	}
}

Structures.extend('Message', () => Message);
