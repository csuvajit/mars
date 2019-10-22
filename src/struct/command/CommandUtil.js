const { APIMessage } = require('discord.js');

class CommandUtil {
	constructor(handler, message) {
		this.handler = handler;

		this.message = message;

		this.parsed = null;

		this.shouldEdit = false;

		this.lastResponse = null;

		this.messages = null;
	}

	setLastResponse(message) {
		if (Array.isArray(message)) {
			this.lastResponse = message.slice(-1)[0]; // eslint-disable-line
		} else {
			this.lastResponse = message;
		}

		return this.lastResponse;
	}

	setEditable(state) {
		this.shouldEdit = Boolean(state);
		return this;
	}

	async send(content, options) {
		const msg = this.constructor.apiMessage(content, options);
		const hasFiles = (msg.files && msg.files.length > 0) ||
            (msg.embed && msg.embed.files && msg.embed.files.length > 0);

		if (this.shouldEdit && (this.command ? this.command.editable : true) && !hasFiles && !this.lastResponse.attachments.size) {
			return this.lastResponse.edit(msg);
		}

		const sent = await this.message.channel.send(msg);
		const lastSent = this.setLastResponse(sent);
		this.setEditable(!lastSent.attachments.size);
		return sent;
	}

	reply(content, options) {
		return this.send(this.constructor.apiMessage(content, options, {
			reply: this.message.member || this.message.author
		}));
	}

	edit(content, options) {
		return this.lastResponse.edit(content, options);
	}

	static apiMessage(content, options, extra) {
		const msg = APIMessage.transformOptions(content, options, extra);
		if (!msg.content) msg.content = null;
		if (!msg.embed) msg.embed = null;
		return msg;
	}
}

module.exports = CommandUtil;
