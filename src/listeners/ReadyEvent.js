const Listener = require('../struct/listener/Listener');

class ReadyEvent extends Listener {
	constructor() {
		super('ready', {
			event: 'ready',
			category: 'client',
			emitter: 'client',
			type: 'on'
		});
	}

	exec() {
		this.client.logger.info(`[READY] ${this.client.user.tag} launched with ${this.client.guilds.size} guilds and ${this.client.users.size} users`);
	}
}

module.exports = ReadyEvent;
