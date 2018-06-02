const { commando, Command } = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class AddNumbersCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'add-numbers',
			aliases: ['add', 'add-nums'],
			group: 'math',
			memberName: 'add',
			description: 'Складывает два числа.',
			details: oneLine`
			Это невероятно полезная команда, которая находит сумму чисел.
			Эта команда является завистью ко всем другим командам.
			`,
			examples: ['add-numbers 42 1337'],
			args: [
				{
					key: 'numbers',
					label: 'number',
					prompt: 'Какие числа вы хотели бы сложить? Каждое отправленное вами сообщение будет интерпретироваться как одно число.',
					type: 'float',
					infinite: true
				}
			]
		});
	}

	async run(msg, args) {
		const total = args.numbers.reduce((prev, arg) => prev + parseFloat(arg), 0);
		return msg.reply(`**Сумма:** ${total}`);
	}
};
