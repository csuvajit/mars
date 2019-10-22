const Command = require('../../struct/command/Command');

class PingCommand extends Command {
	constructor() {
		super('ping', {
			aliases: ['ping', 'pong'],
			category: 'util',
			description: {}
		});
	}

	async exec(message) {
		const msg = await message.util.send('Pinging~');
		// eslint-disable-next-line max-len
		const latency = (msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp);
		return message.util.send({
			embed: {
				description: `**Gateway Ping~ ${latency.toString()}ms** \n**API Ping~ ${Math.round(this.client.ws.ping).toString()}ms**`,
				color: 3093046
			}
		});
	}
}

module.exports = PingCommand;
