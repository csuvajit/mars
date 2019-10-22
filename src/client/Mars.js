const { Client } = require('discord.js');
const Logger = require('../util/Logger');
const ListenerHandler = require('../struct/listener/ListenerHandler');
const CommandHandler = require('../struct/command/CommandHandler');
const path = require('path');

class Mars extends Client {
	constructor() {
		super({
			disableEveryone: true,
			disabledEvents: ['TYPING_START']
		});

		this.logger = new Logger(this);

		this.commandHandler = new CommandHandler(this, {
			directory: path.join(__dirname, '..', 'commands'),
			prefix: message => {
				if (message.guild) return '?';
				return '';
			},
			commandUtil: true,
			commandUtilLifetime: 10000,
			commandUtilSweepInterval: 10000,
			handleEdits: true
		});

		this.listenerHandler = new ListenerHandler(this, {
			directory: path.join(__dirname, '..', 'listeners')
		});
	}

	async init() {
		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			listenerHandler: this.listenerHandler
		});
		this.commandHandler.load();
		this.listenerHandler.load();
	}

	async start() {
		await this.init();
		return this.login(process.env.TOKEN);
	}
}

module.exports = Mars;
