const Mars = require('./client/Mars');

const client = new Mars();

client.on('error', error => client.logger.error(error));

client.start().then(client.logger.info('[LOGIN] Successfully logged into Discord API')).catch(error => client.logger.error(error));
