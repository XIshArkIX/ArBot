const { commando, Command } = require('discord.js-commando');
const consola = require('consola');
const moment = require('moment');

module.exports = class warn extends Command {
	constructor(client) {
		super(client, {
			name: 'warn',
			aliases: ['w', 'warning'],
			group: 'command',
			memberName: 'warn',
			description: 'Предупреждает человека о том, что он плохо себя вёл',
			examples: ['warn @cokrychitel#7626', 'w cokrychitel'],
			guildOnly: true,
			args: [
				{
					key: 'user',
					label: 'user',
					prompt: 'кто тебе не нравится?',
					type: 'user'
				},
				{
					key: 'warning',
					label: 'warning',
					prompt: 'сообщение, возможно, причина оповещения',
					type: 'string',
					default: 'По желанию модератора'
				}
			]
		});
	}

	run(msg, { user, warning }) {
		if(!msg.member.hasPermission(["MUTE_MEMBERS", "KICK_MEMBERS"]))	return msg.reply(`прости, но ты не можешь это использовать.\nНужные права: \`MUTE_MEMBERS\`, \`KICK_MEMBERS\``);
		return user.send(`Вы были предупреждены, потому что:\n${warning}`);
	}
};
