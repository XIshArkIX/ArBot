module.exports = {
  name: 'caps',
  execute(msg) {
    // if (msg.channel.type !== 'text') return;
    if (msg.author.bot) return;
    const customPattern = /[А-ЯЁA-Z]/g;
    if (!customPattern.test(msg.content)) return;
    if (msg.content.match(customPattern).length>=msg.content.length/2) {
      msg.delete();
      // msg.channel.send(`Найденные совпадения: ${msg.content.match(customPattern)}\nКол-во совпадений: ${msg.content.match(customPattern).length}`);
    } else {
      return;
    }
  }
};
