const { commando, Command } = require('discord.js-commando');
const consola = require('consola');
const moment = require('moment');
require('moment/locale/ru');

module.exports = class ServerInfo extends Command {
	constructor(client) {
		super(client, {
			name: 'serverinfo',
			aliases: ['sys', 'server'],
			group: 'command',
			memberName: 'serverinfo',
			description: 'Узнаёт небольшую информацию о сервере',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 60
			}
		});
	}

	run(msg) {
		// Время захода
    msg.channel.send({
        embed:
				{
          color: 0x00AFFF,
          title: `Информация о сервере`,
          author: {
              name: msg.author.username,
              icon_url: msg.author.displayAvatarURL,
          },
          footer: {
              text: `${moment().format('LTS')} | ${msg.author.username}#${msg.author.discriminator}`,
          },
					thumbnail: {
						url: msg.guild.owner.user.avatarURL
					},
          fields: [
              {
                  name: 'Имя сервера:',
                  value: msg.guild.name,
                  inline: true,
              },
              {
                  name: 'Кол-во участников:',
                  value: msg.guild.memberCount,
                  inline: true,
              },
              {
                  name: 'Владелец сервера:',
                  value: msg.guild.owner.user.tag,
                  inline: true,
              },
              {
                  name: 'Сервер создан:',
                  value: moment(msg.guild.createdAt, "YYYYMMDD").fromNow(),
                  inline: true,
              }
          ]
        }
    }).catch(error => consola.error(error));
  }
};
