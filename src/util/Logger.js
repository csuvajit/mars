const { markup, foreground } = require('./Colors');

class Logger {
	constructor(client) {
		this.client = client;
	}

	debug(text) {
		return console.log(`[${this.timestamp()}] ${this.shard()} ${markup.bright}${foreground.yellow}[DEBUG]${markup.reset} » ${text}`);
	}

	info(text) {
		return console.log(`[${this.timestamp()}] ${this.shard()} ${markup.bright}${foreground.cyan}[INFO ]${markup.reset} » ${text}`);
	}

	warn(text) {
		return console.log(`[${this.timestamp()}] ${this.shard()} ${markup.bright}${foreground.magenta}[WARN ]${markup.reset} » ${text}`);
	}

	error(text) {
		return console.log(`[${this.timestamp()}] ${this.shard()} ${markup.bright}${foreground.red}[ERROR]${markup.reset} » ${text}`);
	}

	shard() {
		return this.client.shard.ids ? `[SHARD ${this.client.shard.ids.join(' ')}]` : '';
	}

	timestamp() {
		const { date, month, year, hour, min, sec } = this.date();
		return `${[date, month, year].join('-')} ${[hour, min, sec].join(':')}`;
	}

	date() {
		const date = new Date();
		return {
			date: date.getDate()
				.toString()
				.padStart(2, '0'),
			month: (date.getMonth() + 1)
				.toString()
				.padStart(2, '0'),
			year: date.getFullYear()
				.toString()
				.padStart(2, '0'),
			hour: date.getHours()
				.toString()
				.padStart(2, '0'),
			min: date.getMinutes()
				.toString()
				.padStart(2, '0'),
			sec: date.getSeconds()
				.toString()
				.padStart(2, '0')
		};
	}
}

module.exports = Logger;
