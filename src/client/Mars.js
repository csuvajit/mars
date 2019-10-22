const { Client } = require('discord.js');
const Logger = require('../util/Logger');
const ListenerHandler = require('../struct/listener/ListenerHandler');
const CommandHandler = require('../struct/command/CommandHandler');
const path = require('path');
const Settings = require('../struct/provider/Settings');
const Database = require('../core/database/Database');

class Mars extends Client {
	constructor() {
		super({
			disableEveryone: true,
			disabledEvents: ['TYPING_START']
		});

		this.logger = new Logger(this);

		this.commandHandler = new CommandHandler(this, {
			directory: path.join(__dirname, '..', 'commands'),
			prefix: message => this.settings.get(message.guild, 'prefix', '?'),
			commandUtil: true,
			handleEdits: true,
			lifeTime: 3e5,
			sweepInterval: 6e5
		});

		this.listenerHandler = new ListenerHandler(this, {
			directory: path.join(__dirname, '..', 'listeners')
		});
	}

	async init() {
		this.db = new Database(this);
		this.settings = new Settings(this.db.firestore.collection('mars_settings'));


		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			listenerHandler: this.listenerHandler
		});
		this.commandHandler.load();
		this.listenerHandler.load();
	}

	isOwner(id) {
		return id === process.env.OWNER;
	}

	async start() {
		await this.init();
		return this.login(process.env.TOKEN);
	}
}

module.exports = Mars;
