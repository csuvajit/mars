const { EventEmitter } = require('events');
const { Collection } = require('discord.js');
const path = require('path');
const fs = require('fs');
const Category = require('../util/Category');

class Handler extends EventEmitter {
	constructor(client, { directory }) {
		super();

		this.client = client;

		this.directory = directory;

		this.modules = new Collection();

		this.categories = new Collection();
	}

	construct(instance) {
		this.modules.set(instance.id, Object.assign(instance, {
			client: this.client,
			handler: this
		}));
		if (!this.categories.has(instance.categoryID)) {
			this.categories.set(instance.categoryID, new Category(instance.categoryID));
		}
		const category = this.categories.get(instance.categoryID);
		category.set(instance.id, Object.assign(instance, { category }));
	}

	load() {
		const filepaths = this.readDirectory(this.directory);
		for (const filepath of filepaths) {
			const Instance = require(path.resolve(filepath));
			const instance = new Instance();
			this.construct(instance);
		}
	}

	readDirectory(directory) {
		const filepaths = [];
		(function read(dir) {
			const files = fs.readdirSync(dir);
			for (const file of files) {
				const filepath = path.join(dir, file);
				if (fs.statSync(filepath).isDirectory()) {
					read(filepath);
				} else {
					filepaths.push(filepath);
				}
			}
		})(directory);

		return filepaths;
	}
}

module.exports = Handler;

