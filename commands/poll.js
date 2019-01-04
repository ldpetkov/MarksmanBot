const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {

    const sayMessage = args.join(" ");

var poll = new Discord.RichEmbed()
  .setDescription(sayMessage)
  .setAuthor("Poll", client.user.avatarURL)
  .setColor("#FF851B")
  .setFooter(message.author.username, message.author.displayAvatarURL)
  message.reply("poll submitted.")
  client.channels.get('314905618815254529').send('@everyone', { disableEveryone: false });
let msg = await client.channels.get('314905618815254529').send(poll);
await msg.react(':check:469652562782584863');
await msg.react(':no:469652563013140480');
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Mod"
};

exports.help = {
  name: "poll",
  category: "Miscelaneous",
  description: "Command for making polls.",
  usage: "poll"

};