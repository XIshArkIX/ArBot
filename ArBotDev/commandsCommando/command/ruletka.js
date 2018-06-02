const { commando, Command } = require('discord.js-commando');
// const discord = require('discord.js');
const moment = require('moment');
const consola = require('consola');

module.exports = class ruletka extends Command {
	constructor(client) {
		super(client, {
			name: 'ruletka',
			group: 'command',
			memberName: 'ruletka',
			aliases: ['lucky', 'get-lucky', 'удача', 'рулетка'],
			description: 'Проверяет Вашу удачу',
			examples: ['ruletka'],
			guildOnly: true,
			throttling: {
				usages: 1,
				duration:	14400
			}
		});
	}

	async run(msg, user) {
		const answers = [
			// "вот это тебе повезло! Ты получаешь мутхаммер в размере одной штуки.", // 1
			// "а ты везунчик! Ты получаешь чатхаммер в размере одной штуки.", // 2
			"тебе ничего не выпало, попробуй в следующий раз :(", // 3 // 1
			"рулетка - дело рисковое, однако сейчас оно полностью оправдало себя. Держи роль повыше!", // 4 // 2
			"кажется, ты попал в переделку и твоё тело парализовало. Реабилитируйся!", // 5 // 3
			"проклинаю вызвавшего меня на дождь из какашек!" // 7 // 4
		];
		const elInArray = answers.length;
		var luckyVar = randomInteger(1, elInArray);
		const type = {
			"legendary": 16753696,
			"rare": 1191850,
			"default": 8353401,
			"bad": 16720896,
			"normal": 16711202
		};

		// msg.channel.send(`__**DEBUG INFO**__\nelInArray: ${elInArray}\nluckyVar: ${luckyVar}`);

		switch (luckyVar) {
			case 1:
				msg.channel.send({embed:
					{
						color: type.default,
						fields: [
							{
								name: `Ничего | Default`,
								value: `${msg.member.nickname ? msg.member.nickname : msg.author.username}, ${answers[0]}`
							}
						]
					}
				});
				break;
			case 2:
				msg.channel.send({embed:
					{
						color: type.rare,
						fields: [
							{
								name: `Роль | Rare`,
								value: `${msg.member.nickname ? msg.member.nickname : msg.author.username}, ${answers[1]}\n${moment().locale('ru').add(1, 'days').calendar()} роль закончиться!`
							},
							{
								name: `Получение`,
								value: `Бот попытается автоматически выдать роль выше твоей, если же ничего не изменилось, напиши модераторам.`
							}
						]
					}
				});
				const grz = msg.guild.roles.size-2;
				if (grz === 0) {
					msg.channel.send(`Чтобы выдать роль, сначала они должны быть.`);
					return;
				}
				msg.guild.fetchMember(msg.author).then(w => {
			    const cmhrnumber = w.highestRole.position;
					if (cmhrnumber>=grz) {
						msg.reply('у тебя и так самая высокая и статусная роль. Куда тебе ещё?');
					} else if (!msg.guild.me.hasPermission("MANAGE_ROLES")) {
							msg.reply('не могу выдать тебе роль, т.к. мне не хватает прав.');
						}	else {
							const gr = msg.guild.roles.find(nr => nr.position > cmhrnumber && nr.managed === false && nr.position !== 0);
							if (
								gr.hasPermission('ADMINISTRATOR') ||
								gr.hasPermission('KICK_MEMBERS') ||
								gr.hasPermission('BAN_MEMBERS') ||
								gr.hasPermission('MANAGE_CHANNELS') ||
								gr.hasPermission('MANAGE_GUILD') ||
								gr.hasPermission('MANAGE_MESSAGES') ||
								gr.hasPermission('MUTE_MEMBERS') ||
								gr.hasPermission('DEAFEN_MEMBERS') ||
								gr.hasPermission('MOVE_MEMBERS') ||
								gr.hasPermission('MANAGE_NICKNAMES') ||
								gr.hasPermission('MANAGE_ROLES') ||
								gr.hasPermission('MANAGE_WEBHOOKS') ||
								gr.hasPermission('MANAGE_EMOJIS')
							) {
								msg.reply('прости, но я не могу наделить тебя такими полномочиями.');
								return;
							} else if (gr === null) {
								const gr_1 = msg.guild.roles.find(nr_1 => nr_1.managed === false && nr_1.position !== 0);
								w.addRole(gr_1).catch(err => {
									consola.error(err);
									msg.reply('что-то пошло не так. Попроси модератора/администратора вручную добавить тебе роль.');
								});
								const rmRole_1 = () => {
									w.removeRole(gr_1).catch(error => consola.error(error));
								}
								setTimeout(rmRole_1, 86400000);
							} else {
								w.addRole(gr).catch(err => {
									consola.error(err);
									msg.reply('что-то пошло не так. Попроси модератора/администратора вручную добавить тебе роль.');
								});
								const rmRole = () => {
									w.removeRole(gr).catch(error => consola.error(error));
								}
								setTimeout(rmRole, 86400000);
							}
						}
				});
				break;
			case 3:
				msg.guild.fetchMember(msg.author).then( response => {
					let muted = msg.guild.roles.find('name', 'Muted');
					// First step
					msg.channel.overwritePermissions(response, {
						SEND_MESSAGES: false,
						SPEAK: false,
						SEND_TTS_MESSAGES: false,
						EMBED_LINKS: false,
						ATTACH_FILES: false,
						MENTION_EVERYONE: false,
						USE_EXTERNAL_EMOJIS: false,
						CONNECT: false,
						USE_VAD: false
					})
					.catch(error => consola.error(error));
					// Second step
					response.addRole(muted).catch(error => consola.error(error));
					// Third step
					const unmute = () => {
						msg.channel.overwritePermissions(response, {
							SEND_MESSAGES: true,
							SPEAK: true,
							SEND_TTS_MESSAGES: true,
							EMBED_LINKS: true,
							ATTACH_FILES: true,
							MENTION_EVERYONE: true,
							USE_EXTERNAL_EMOJIS: true,
							CONNECT: true,
							USE_VAD: true
						})
						.catch(error => consola.error(error));
						response.removeRole(muted).catch(error => consola.error(error));
					}
					setTimeout(unmute, 300000);
					msg.channel.send({embed:
						{
							color: type.bad,
							fields: [
								{
									name: `Перестрелка | Bad`,
									value: `${response.nickname ? response.nickname : msg.author.username}, ${answers[2]}`
								}
							]
						}
					});
				}).catch( error => consola.error(error));
				break;
			case 4:
				msg.channel.fetchMessage(msg.id).then(m => m.react('💩'));
				msg.channel.send({embed:
					{
						color: type.normal,
						fields: [
							{
								name: `Дождь | Normal`,
								value: `${msg.member.nickname ? msg.member.nickname : msg.author.username}, ${answers[3]}`
							}
						]
					}
				});
				break;
			case 5:
				const case1 = await msg.channel.send({embed:
					{
						color: type.legendary,
						fields: [
							{
								name: `Мутхаммер | Legendary`,
								value: `${msg.member.nickname ? msg.member.nickname : msg.author.username}, ${answers[0]}`
							},
							{
								name: `Использование`,
								value: `После этого сообщения бот заберёт ник того человека, которого ты хотел бы замутить.\nПиши так: **@username**\nНапример: **@cokrychitel#7626**`
							}
						]
					}
				});
				// const filter1 = m => m.content === msg.guild.fetchMember(msg.mentions.members.first());
				// msg.channel.awaitMessages(filter1, { maxMatches: 1, time: 10000, errors: ['time'] })
				// 	.then(collected => {
				// 		msg.channel.send(`Прости, ${collected.first().content}, но везунчик выбрал тебя!`);
				// 		case1.react('✅');
				// 	})
				// 	.catch(err => {
				// 		msg.reply('произошла какая-то ошибка. Не пытался ли ты замутить модера/админа?');
				// 		consola.error(err);
				// 		case1.react('❎');
				// 	});
				break;
			case 6:
				const case2 = await msg.channel.send({embed:
					{
						color: type.legendary,
						fields: [
							{
								name: `Чатхаммер | Legendary`,
								value: `${msg.member.nickname ? msg.member.nickname : msg.author.username}, ${answers[1]}`
							},
							{
								name: `Использование`,
								value: `После этого сообщения бот заберёт ник того человека, которого ты хотел бы замутить.\nПиши так: **@username**\nНапример: **@cokrychitel#7626**`
							}
						]
					}
				});
				// const filter2 = m => m.content === msg.guild.fetchMember(msg.mentions.members.first());
				// msg.channel.awaitMessages(filter2, { maxMatches: 1, time: 10000, errors: ['time'] })
				// 	.then(collected => {
				// 		msg.channel.send(`Прости, ${collected.first().content}, но везунчик выбрал тебя!`);
				// 		case2.react('✅');
				// 	})
				// 	.catch(err => {
				// 		msg.reply('произошла какая-то ошибка. Не пытался ли ты замутить модера/админа?');
				// 		consola.error(err);
				// 		case2.react('❎');
				// 	});
				break;
			default:
				break;
		}

		function randomInteger(min, max) {
      var rand = min - 0.5 + Math.random() * (max - min + 1);
      rand = Math.round(rand);
			// if (rand === 0) return rand = 1;
      return rand;
    }
	}
};
