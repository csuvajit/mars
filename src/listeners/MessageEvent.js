const Listener = require('../struct/listener/Listener');

class MessageEvent extends Listener {
	constructor() {
		super('message', {
			event: 'message',
			category: 'client',
			emitter: 'client'
		});
	}

	async exec(message) {
		// this.client.commandHandler.handle(message);
	}
}

module.exports = MessageEvent;
