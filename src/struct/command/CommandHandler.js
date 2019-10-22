const Handler = require('../Handler.js');
const CommandUtil = require('./CommandUtil');
const { Collection } = require('discord.js');

class CommandHandler extends Handler {
	constructor(client, {
		directory,
		commandUtilSweepInterval = 6e5,
		commandUtilLifetime = 3e5,
		commandUtil = true,
		handleEdits = true,
		prefix = '?'
	} = {}) {
		super(client, { directory });

		this.client = client;

		this.directory = directory;

		this.commandUtil = commandUtil;

		this.handleEdits = handleEdits;

		this.prefix = typeof prefix === 'function' ? prefix.bind(this) : prefix;

		this.commandUtils = new Collection();

		this.commandUtilLifetime = commandUtilLifetime;

		this.commandUtilSweepInterval = commandUtilSweepInterval;

		if (this.commandUtilSweepInterval > 0) {
			this.client.setInterval(() => this.sweepCommandUtil(), this.commandUtilSweepInterval);
		}

		if (this.handleEdits && !this.commandUtil) {
			throw new Error('CommandUtil Explicit');
		}

		this.setup();
	}

	setup() {
		this.client.once('ready', () => {
			this.client.on('message', async msg => {
				if (msg.partial) await msg.fetch();
				this.handle(msg);
			});

			if (this.handleEdits) {
				this.client.on('messageUpdate', async (oldMsg, newMsg) => {
					if (oldMsg.partial) await oldMsg.fetch();
					if (newMsg.partial) await newMsg.fetch();
					if (oldMsg.content === newMsg.content) return;
					if (this.handleEdits) this.handle(newMsg);
				});
			}
		});
	}

	handle(message) {
		if (this.commandUtil) {
			if (this.commandUtils.has(message.id)) {
				message.util = this.commandUtils.get(message.id);
			} else {
				message.util = new CommandUtil(this, message);
				this.commandUtils.set(message.id, message.util);
			}

			this.run(message);
		}
	}

	async run(message) {
		if (message.author.bot) return;
		const prefix = this.call(this.prefix)(message);
		const parsed = this.parsePrefix(message, prefix);
		if (!parsed.command) return;
		return this.exec(message, parsed.command, parsed.content);
	}

	call(prefix) {
		if (typeof prefix === 'function') {
			return prefix;
		}

		return () => prefix;
	}

	parsePrefix(message, prefix) {
		const msg = message.content.toLowerCase();
		if (!msg.startsWith(prefix.toLowerCase())) return {};

		const endOfPrefix = msg.indexOf(prefix.toLowerCase()) + prefix.length;
		const startOfArgs = message.content.slice(endOfPrefix).search(/\S/) + prefix.length;
		const alias = message.content.slice(startOfArgs).split(/\s{1,}|\n{1,}/)[0];
		const command = this.modules.find(cmd => cmd.aliases.includes(alias.toLowerCase()));
		const content = message.content.slice(startOfArgs + alias.length + 1).trim();
		const afterPrefix = message.content.slice(prefix.length).trim();

		if (!command) {
			this.emit('commandInvalid', message, afterPrefix);
			return { prefix, alias, content, afterPrefix };
		}

		if (command.ownerOnly && !this.client.isOwner(message.author.id)) {
			this.emit('commandBlocked', message, command);
			return { prefix, alias, content, afterPrefix };
		}

		return { command, prefix, alias, content, afterPrefix };
	}

	async exec(message, command, args) {
		try {
			this.emit('commandStarted', message, command, args);
			await command.exec(message, args);
		} catch (error) {
			this.emit('error', error, message, command, args);
		}
	}

	sweepCommandUtil(lifetime = this.commandUtilLifetime) {
		let count = 0;
		for (const { message } of this.commandUtils.values()) {
			if (Date.now() - (message.editedTimestamp || message.createdTimestamp) > lifetime) {
				count++;
				this.commandUtils.delete(message.id);
			}
		}

		return count;
	}
}

module.exports = CommandHandler;
