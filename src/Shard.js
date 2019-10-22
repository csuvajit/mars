const { ShardingManager } = require('discord.js');
const path = require('path');
const Logger = require('./util/Logger');

class Manager extends ShardingManager {
	constructor() {
		super(path.join(__dirname, 'Main.js'), {
			token: process.env.TOKEN,
			totalShards: Number(process.env.TOTAL_SHARDS)
		});

		this.logger = new Logger();

		this.id = Number(process.env.SHARD_ID);
	}

	init() {
		const shard = this.createShard(this.id);
		return shard.spawn();
	}
}

module.exports = Manager;
