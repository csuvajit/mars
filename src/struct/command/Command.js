const Handler = require('../Handler');

class Command extends Handler {
	constructor(id, {
		aliases,
		description = {},
		category = 'default',
		args = []
	} = {}) {
		super(id, { category });

		this.id = id;

		this.aliases = aliases;

		this.description = description;

		this.category = category;

		this.categoryID = category;

		this.args = args;
	}

	exec() {
		throw new SyntaxError('This method needs to be overwritten inside of actual command!');
	}
}

module.exports = Command;
