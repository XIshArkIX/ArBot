// const stripIndents = require('common-tags').stripIndents;
const { commando, Command } = require('discord.js-commando');
const consola = require('consola');
const moment = require('moment');
const Discord = require('discord.js');

module.exports = class VoteMute extends Command {
	constructor(client) {
		super(client, {
			name: 'votemute',
			aliases: ['votem', 'vm', 'vmute'],
			group: 'command',
			memberName: 'votemute',
			description: 'Запрещает человеку общаться',
			examples: ['votemute @cokrychitel#7626', 'votemute cokrychitel'],
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 60
			},
			args: [
				{
					key: 'member',
					label: 'user',
					prompt: 'кто тебе не нравится?',
					type: 'member'
				}
			]
		});
	}

	async run(msg, args) {
		var x = 0,
				y = 0;
		const startDate = moment().locale('ru').format('LTS');
		const endDate = moment().add(15, 'seconds').locale('ru').format('LTS');
		const member = args.member;
		const user = member.user;
		const query = await msg.channel.send({embed:
			{
				title: `Замьютить ли **${user.username}#${user.discriminator}** (ID: ${user.id}) ?`,
				color: 4286945,
				footer: {
					text: `Заказано в ${startDate} ${msg.author.username}#${msg.author.discriminator}. Голосование закончится в ${endDate}.`
				},
				author: {
					name: `${msg.author.username}#${msg.author.discriminator}`,
					icon_url: msg.author.avatarURL
				},
				thumbnail: {
					url: user.avatarURL ? user.avatarURL : 'https://cdn.discordapp.com/embed/avatars/0.png'
				}
			}
		});
		const filter = reaction => reaction.emoji.name === '👍' || reaction.emoji.name === '👎';
		// query.awaitReactions(filter, { time: 15000 })
		//   .then(collected => {
				// const upArray = collected.filter(up => up.emoji.name === '👍');
				// const downArray = collected.filter(down => down.emoji.name === '👎');
				// const collectedsize = collected.size;
				// const up = upArray.size;
				// const down = downArray.size;
				// consola.info(`Collected ${collected.count} (${collectedsize}) of emoji`);
				// consola.info(`Collected ${upArray.count} (${up}) up's`);
				// consola.info(`Collected ${downArray.count} (${down}) down's`);
				// inf.edit(`All: ${collectedsize}\nUp: ${up}\nDown: ${down}`);
		// 	})
		//   .catch(error => {
		// 		consola.error(error);
		// 		inf.edit('```'+error+'```');
		// 	});
			const collector = new Discord.ReactionCollector(query, filter, { time: 15000 });
			try {
				collector.on('end', collected => {
					// const upArray = collected.filter(up => up.emoji.name === '👍');
					// const downArray = collected.filter(down => down.emoji.name === '👎');
					// const collectedsize = collected.size;
					// const up = upArray.size;
					// const down = downArray.size;
					// consola.info(`Collected ${collectedsize} of emoji\nCollected ${up} up's\nCollected ${down} down's`);
					if (x <= y) {
						query.edit({embed:
							{
								title: `Замьютить ли **${user.username}#${user.discriminator}** (ID: ${user.id}) ?`,
								color: 4286945,
								footer: {
									text: `Заказано в ${startDate} ${msg.author.username}#${msg.author.discriminator}. Голосование закончится в ${endDate}.`
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
										name: `**❯ Результаты**`,
										value: `👍 ${x} / ${y} 👎\nНабралось равное или недостаточное кол-во голосов, **${user.tag}** не будет замьючен.`
									}
								]
							}
						});
					} else {
						query.edit({embed:
							{
								title: `Замьютить ли **${user.username}#${user.discriminator}** (ID: ${user.id}) ?`,
								color: 4286945,
								footer: {
									text: `Заказано в ${startDate} ${msg.author.username}#${msg.author.discriminator}. Голосование закончится в ${endDate}.`
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
										name: `**❯ Результаты**`,
										value: `👍 ${x} / ${y} 👎\nНабралось достаточное кол-во голосов, **${user.tag}** будет замьючен.`
									}
								]
							}
						});
						// user.send(`Ты был замючен в **${msg.guild.name}**. Конец мута будет через 15 минут.`);
						let muted = msg.guild.roles.find("name", "Muted");
						// First step
						msg.channel.overwritePermissions(user, {
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
						member.addRole(muted).catch(error => consola.error(error));
						// Third step
						const unmute = () => {
							msg.channel.overwritePermissions(user, {
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
							member.removeRole(muted).catch(error => consola.error(error));
						}
						setTimeout(unmute, 900000);
					}
				});
				collector.on('collect', coll => {
					if (coll.emoji.name === "👍") {
						x++;
						query.edit({embed:
							{
								title: `Замьютить ли **${user.username}#${user.discriminator}** (ID: ${user.id}) ?`,
								color: 4286945,
								footer: {
									text: `Заказано в ${startDate} ${msg.author.username}#${msg.author.discriminator}. Голосование закончится в ${endDate}.`
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
										name: `**❯ Результаты**`,
										value: `👍 ${x} / ${y} 👎`
									}
								]
							}
						});
						// consola.info(`Collected ${coll.emoji.name}; All ${x}`);
					} else if (coll.emoji.name === "👎") {
						y++;
						query.edit({embed:
							{
								title: `Замьютить ли **${user.username}#${user.discriminator}** (ID: ${user.id}) ?`,
								color: 4286945,
								footer: {
									text: `Заказано в ${startDate} ${msg.author.username}#${msg.author.discriminator}. Голосование закончится в ${endDate}.`
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
										name: `**❯ Результаты**`,
										value: `👍 ${x} / ${y} 👎`
									}
								]
							}
						});
						// consola.info(`Collected ${coll.emoji.name}; All ${y}`);
					}
				});
			} catch (error) {
				consola.error(error);
				inf.edit('```'+error+'```');
			}
			await query.react('👍');
			await query.react('👎');
	}
};
