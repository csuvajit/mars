const { Collection } = require('discord.js');

class Category extends Collection {
	constructor(id, iterable) {
		super(iterable);

		this.id = id;
	}
}

module.exports = Category;
