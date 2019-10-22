const Listener = require('../struct/listener/Listener');

class MessageEvent extends Listener {
	constructor() {
		super('commandStarted', {
			event: 'commandStarted',
			category: 'commandHandler',
			emitter: 'commandHandler'
		});
	}

	async exec(message, command, args) {
		this.client.logger.debug(message.id, command.id, args);
	}
}

module.exports = MessageEvent;
