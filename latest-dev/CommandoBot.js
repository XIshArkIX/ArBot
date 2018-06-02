const { CommandoClient, SQLiteProvider, Command, commando, FriendlyError } = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
const oneLine = require('common-tags').oneLine;
const token = "";
const consola = require('consola');
const moment = require('moment');
const discord = require('discord.js');
// const enmap = require('enmap');
const fs = require('fs');

const client = new CommandoClient({
    commandPrefix: '?',
    owner: '230290535141605376',
    invite: 'https://discord.gg/mqFwXWH'
});

// require('./event/eventLoader.js')(client);

// v1

// const commandFiles = fs.readdirSync('./events');
// for (const file of commandFiles) {
//     const command = require(`./events/${file}`);
//     client.commands.set(command.name, command);
// }

 v2

client.events = new discord.Collection();

fs.readdir("./events/", (err, files) => {
  if (err) {
    consola.error(err);
    return;
  } else {
    consola.info(`[${moment().locale('ru').format('LTS')}] [EVENT] Loaded ${files.length} events.`);
    files.forEach(file => {
      const event = require(`./events/${file}`);
      consola.info(`[${moment().locale('ru').format('LTS')}] [EVENT] Loaded ${event.name} event.`);
      client.events.set(event.name, event);
    });
  }
});

// v3

// fs.readdir("./events/", (err, files) => {
//   if (err) return consola.error(err);
//   files.forEach(file => {
//     const event = require(`./events/${file}`);
//     let eventName = file.split(".")[0];
//     client.on(eventName, event.bind(null, client));
//   });
// });

client
	.on('error', console.error)
	.on('warn', console.warn)
	.on('debug', debug => consola.info(debug))
  .on('load', load => consola.start(load))
	.on('ready', () => {
		consola.start(`[${moment().locale('ru').format('LTS')}] [MAIN] Зашёл как ${client.user.tag} (${client.user.id})`);
	})
	.on('disconnect', () => { consola.error('Отключён!'); })
	.on('reconnect', () => { consola.info('Переподключение...'); })
	.on('commandError', (cmd, err) => {
		if(err instanceof FriendlyError) return;
		consola.error(`Ошибка при исполнении команды [${cmd.groupID}:${cmd.memberName}]`, err);
	})
	.on('commandBlocked', (msg, reason) => {
		consola.info(oneLine`[MENTOR]
			Команда ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			заблокирована; ${reason}
		`);
	})
	.on('commandPrefixChange', (guild, prefix) => {
		consola.info(oneLine`[PREFIX]
			Префикс ${prefix === '' ? 'убран' : `заменён на ${prefix || 'стандартный'}`}
			${guild ? `в гильдии ${guild.name} (${guild.id})` : 'глобально'}.
		`);
	})
	.on('commandStatusChange', (guild, command, enabled) => {
		consola.info(oneLine`[MENTOR]
			Команда ${command.groupID}:${command.memberName}
			${enabled ? 'включена' : 'выключена'}
			${guild ? `в гильдии ${guild.name} (${guild.id})` : 'глобально'}.
		`);
	})
	.on('groupStatusChange', (guild, group, enabled) => {
		consola.info(oneLine`[MENTOR]
			Группа команд ${group.id}
			${enabled ? 'включена' : 'выключена'}
			${guild ? `в гильдии ${guild.name} (${guild.id})` : 'глобально'}.
		`);
	})
  .on('message', msg => {
    // if (msg.channel.type !== 'text') return;
    client.events.get('caps').execute(msg);
  });

sqlite.open(path.join(__dirname, "settings.sqlite3")).then((db) => {
    client.setProvider(new SQLiteProvider(db));
}).catch(error => consola.error(error));

client.registry
    .registerDefaultTypes()
    // .registerEvent()
    .registerGroups([
        // ['group1', 'Первая группа команд'],
        // ['group2', 'Вторая группа команд'],
				['math', 'Математические команды'],
				// ['mafia', 'Команды для игры в мафию'],
        ['command', 'Обычные команды'],
        ['fun', 'Команды для веселья'],
        ['utility', 'Вспомогающие команды'],
        ['events', 'Ивенты']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commandsCommando'))
    .registerEventsIn(path.join(__dirname, 'events'));

	client.login(token);
