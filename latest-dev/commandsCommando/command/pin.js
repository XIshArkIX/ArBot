// const stripIndents = require('common-tags').stripIndents;
const { commando, Command } = require('discord.js-commando');
// const signale = require('signale');
const consola = require('consola');

module.exports = class pinMsg extends Command {
	constructor(client) {
		super(client, {
			name: 'pin',
			aliases: ['закрепить', 'пин'],
			group: 'command',
			memberName: 'pin',
			description: 'Закрепляет сообщение.',
			details: 'Если команда запущена без параметров, то бот выбирает последнее сообщение в чате. Если указан номер сообщения, то бот выбирает его.',
			examples: ['pin <msg.id или ничего>'],
			guildOnly: true,
			args: [
				{
					key: 'number',
					label: 'number',
					prompt: 'ID сообщения для закрепления.',
					type: 'integer'
					// default: ''
				}
			]
		});
	}

	async run(msg, args) {
		// const mtu = msg.guild.members.get(msg.author.id);
		const msg_id = msg.id;
		consola.info('Msg ID: ' + msg_id);
		// consola.info('Author: ' + mtu.nickname);
		// if (author.has('MANAGE_MESSAGE')) {
		// 	signale.debug('Author has permission <MANAGE_MESSAGE>');
		// } else {
		// 	signale.error('Author has no permission <MANAGE_MESSAGE>');
		// }
	}
};
