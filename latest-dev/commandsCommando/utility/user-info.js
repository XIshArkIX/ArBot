// const stripIndents = require('common-tags').stripIndents;
const { commando, Command } = require('discord.js-commando');
const moment = require('moment');
require('moment/locale/ru');

module.exports = class UserInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'user-info',
			aliases: ['user', '🗒'],
			group: 'util',
			memberName: 'user-info',
			description: 'Получает информацию о пользователе',
			examples: ['user-info @cokrychitel#7626', 'user cokrychitel'],
			guildOnly: true,
			throttling: {
				usages: 20,
				duration: 60
			},
			args: [
				{
					key: 'member',
					label: 'user',
					prompt: 'за кем мне проследить?',
					type: 'member'
				}
			]
		});
	}

	async run(msg, args) {
		const member = args.member;
		const user = member.user;
		var a1 = '',
				a2 = '';

		if (user.presence.game) {
			if (user.presence.game.streaming) {
				a1 = `[Twitch](${user.presence.game.url})`;
			} else {
				a1 = "Twitch: Не стримит";
			}
			// switch (user.presence.game.type) {
			// 	case 'PLAYING':
			// 		a2 = `Играет в ${user.presence.game.name}`;
			// 		break;
			// 	case 'STREAMING':
			// 		a2 = `Стримит ${user.presence.game.name}`;
			// 		break;
			// 	case 'LISTENING':
			// 		a2 = `Слушает ${user.presence.game.name}`;
			// 		break;
			// 	case 'WATCHING':
			// 		a2 = `Смотрит ${user.presence.game.name}`;
			// 		break;
			// 	default:
			// 		break;
			// }
			// if (user.presence.game.type === 'PLAYING') {
			// 		a2 = `Играет в ${user.presence.game.name}`;
			// }
		}

		return msg.channel.send({embed:
			{
				title: `Информация на **${user.username}#${user.discriminator}** (ID: ${user.id})`,
				color: 3310186,
				footer: {
					text: `Заказано в ${moment().format('LTS')} ${msg.author.username}#${msg.author.discriminator}`
				},
				author: {
					name: `${msg.author.username}#${msg.author.discriminator}`,
					icon_url: msg.author.avatarURL
				},
				thumbnail: {
					url: user.avatarURL ? user.avatarURL : 'https://cdn.discordapp.com/embed/avatars/0.png'
				},
				fields: [
					{
						name: `**❯ Детали жителя гильдии**`,
						value: `${member.nickname !== null ? `• Никнейм: ${member.nickname}` : '• Никнейм: Стандартный'}\n• Роли: ${member.roles.map(roles => `\`${roles.name}:${roles.position}\``).join(', ')}\n• Впервые вошёл: ${moment(member.joinedAt).fromNow()}`
					},
					{
						name: `**❯ Детали пользователя**`,
						value: `• Статус: ${user.presence.status}\n• Игра: ${user.presence.game ? user.presence.game.name : 'Не играет'}\n• Создан: ${moment(user.createdAt, "YYYYMMDD").locale('ru').fromNow()}${user.bot ? '\n• Это бот аккаунт <:robot:431885729749270541>' : ''}\n• ${user.avatarURL ? `Аватар: [ссылка](${user.avatarURL})` : 'Аватар: стандартный'}\n• ${a1}`
					}
				]
			}
		});
	}
};
