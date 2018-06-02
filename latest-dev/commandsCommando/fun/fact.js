const { commando, Command } = require('discord.js-commando');
const consola = require('consola');

module.exports = class fact extends Command {
	constructor(client) {
		super(client, {
			name: 'fact',
			aliases: ['факт'],
			group: 'fun',
			memberName: 'fact',
			description: 'Выбирает рандомный факт из списка.',
			examples: ['fact'],
			guildOnly: true
		});
	}

	run(msg) {
		msg.channel.send(`За время, которое я потратил на ответ, было написано \`${msg.id-msg.guild.me.lastMessageID}\` сообщений.`);
		function randomInteger(min, max) {
      var rand = min - 0.5 + Math.random() * (max - min + 1);
      rand = Math.round(rand);
      return rand;
    }
	}
};
