const Command = require('../../struct/command/Command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const os = require('os');
require('moment-duration-format');
const { version } = require('../../../package.json');

class StatsCommand extends Command {
	constructor() {
		super('stats', {
			aliases: ['stats'],
			category: 'util',
			description: {}
		});
	}

	async exec(message) {
		const embed = new MessageEmbed()
			.setColor(3093046)
			.setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
			.setTitle('Stats')
			.addField('Uptime', [
				moment.duration(process.uptime() * 1000).format('D [days], H [hrs], m [mins], s [secs]', { trim: 'both mid' })
			])
			.addField('Memory Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
			.addField('Version', `v${version}`, true)
			.addField('Node.JS', process.version, true)
			.setFooter(`© 2019 ${this.owner.username}`, this.owner.displayAvatarURL());

		return message.util.send({ embed });
	}

	get owner() {
		return this.client.users.get(process.env.OWNER);
	}

	freemem() {
		return os.freemem() / (1024 * 1024);
	}
}

module.exports = StatsCommand;
