const Command = require('../../struct/command/Command');
const util = require('util');

class EvalCommand extends Command {
	constructor() {
		super('eval', {
			description: 'Calculates current ping',
			usage: '',
			aliases: ['eval']
		});
	}

	async exec(message, code) {
		try {
			const evaled = eval(code); // eslint-disable-line
			const arg = util.inspect(await evaled, { depth: 0 });
			return message.util.send(`${arg}`, { code: 'js' });
		} catch (error) {
			return message.util.send(`${error}`, { code: 'js' });
		}
	}
}

module.exports = EvalCommand;
