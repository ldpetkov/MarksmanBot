const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    var text = args.join(' ');
    var announceEmbed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setTitle('Announcement')
    .setDescription(text)
    .setColor('#2ECC40')
    .setImage('https://i.imgur.com/bQcG714.png');
    client.channels.get('314905618815254529').send('@everyone', { disableEveryone: false });
    client.channels.get('314905618815254529').send(announceEmbed);
      };
  
    exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Mod"
  };
  
  exports.help = {
    name: "announce",
    category: "Moderation",
    description: "Announcement command.",
    usage: "announce"
  
  };