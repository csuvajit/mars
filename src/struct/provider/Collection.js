const Discord = require('discord.js');

class Collection {
	constructor() {
		this.items = new Discord.Collection();
	}

	init() {
		throw new Error(`${this.constructor.name}#init has not been implemented.`);
	}

	get() {
		throw new Error(`${this.constructor.name}#get has not been implemented.`);
	}

	set() {
		throw new Error(`${this.constructor.name}#set has not been implemented.`);
	}

	delete() {
		throw new Error(`${this.constructor.name}#delete has not been implemented.`);
	}

	clear() {
		throw new Error(`${this.constructor.name}#clear has not been implemented.`);
	}
}

module.exports = Collection;
