const { Firebase } = require('firestore-db');

const connection = new Firebase({
	projectId: process.env.PROJECT_ID,
	clientEmail: process.env.CLIENT_EMAIL,
	privateKey: process.env.PRIVATE_KEY
});

class Database {
	constructor(client) {
		this.client = client;
	}

	get firestore() {
		return connection.firestore();
	}

	get firebase() {
		return connection.database();
	}

	static get firestore() {
		return connection.firestore();
	}

	static get firebase() {
		return connection.database();
	}
}

module.exports = Database;
