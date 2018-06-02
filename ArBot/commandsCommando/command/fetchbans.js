const { commando, Command } = require('discord.js-commando');
const moment = require('moment');

module.exports = class fetchBans extends Command {
	constructor(client) {
		super(client, {
			name: 'bans',
			group: 'command',
			memberName: 'fetchbans',
			description: 'Проверяет наличие бана или кол-во банов на сервере',
			details: '',
			examples: ['bans <user>'],
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 60
			},
			args: [
				{
					key: 'user',
					label: 'user',
					prompt: 'введите имя пользователя.',
					type: 'user',
					default: ''
				}
			]
		});
	}

	async run(msg, args) {
		const date = moment().locale('ru').format('LTS');
		const a1 = msg.author.tag;
		if (!msg.mentions.users.size) {
				return msg.guild.fetchBans()
					.then(b1 => msg.channel.send({
							embed: {
								title: `Список банов в **${msg.guild.name} [${msg.guild.id}]**`,
								thumbnail: {
									url: "https://i.imgur.com/tq43DIX.png",
								},
								fields: [
									{
										name: "Информация",
										value: `Банов: ${b1.size}`,
									}
								],
								footer: {
									text: a1 + ' | ' + date,
								}
							}
						}))
					.catch(console.error);
		}
		msg.mentions.users.map((user, answer, color) => {
				return msg.guild.fetchBans()
					.then(b1 => {
							if (b1.exists('username', user.username)) {
								answer = 'Да';
								color = 16711680;
							} else {
								answer = 'Нет';
								color = 65280;
							}
							msg.channel.send({
								embed: {
									title: `Поиск по банам: **${user.username}#${user.discriminator}**`,
									color: color,
									thumbnail: {
										url: "https://i.imgur.com/tq43DIX.png",
									},
									fields: [
										{
											name: "Информация",
											value: `Забанен: ${answer}`,
										}
									],
									footer: {
										text: a1 + ' | ' + date,
									}
								}
							});
					}
					)
					.catch(console.error);
		});
	}
};
