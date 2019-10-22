const Command = require('../../struct/command/Command');

class PingCommand extends Command {
	constructor() {
		super('ping', {
			aliases: ['ping'],
			category: 'util',
			description: {}
		});
	}

	exec(message) {
		const call = Date.now();
		return message.util.send('xx');
	}
}

module.exports = PingCommand;
