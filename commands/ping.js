
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const msg = await message.channel.send("Pong! 🏓");
  msg.edit(`Pong! 🏓 ${msg.createdTimestamp - message.createdTimestamp}ms.`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "ping",
  category: "Miscelaneous",
  description: "Pong!",
  usage: "ping"
};
