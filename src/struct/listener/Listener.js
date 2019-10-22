const Module = require('../Module');

class Listener extends Module {
	constructor(id, {
		event,
		type = 'on',
		category,
		emitter
	} = {}) {
		super(id, { category });

		this.id = id;

		this.type = type;

		this.event = event;

		this.emitter = emitter;

		this.category = category;
	}

	exec() {
		throw new SyntaxError('This method needs to be overwritten inside of actual event!');
	}
}

module.exports = Listener;
