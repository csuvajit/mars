class Module {
	constructor(id, { category = 'default' } = {}) {
		this.id = id;

		this.categoryID = category;

		this.category = null;

		this.filepath = null;

		this.client = null;

		this.handler = null;
	}

	toString() {
		return this.id;
	}
}

module.exports = Module;
