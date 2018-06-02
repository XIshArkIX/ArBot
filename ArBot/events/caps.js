module.exports = {
  name: 'caps',
  execute(msg) {
    if (msg.author.bot) return;
    const customPattern = /[А-ЯЁA-Z]/g;
    if (!customPattern.test(msg.content)) return;
    if (msg.content.match(customPattern).length>=msg.content.length/2) {
      msg.delete();
    } else {
      return;
    }
  }
};
