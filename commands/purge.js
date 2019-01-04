const Discord = require("discord.js");
const purgeCooldown = new Set();
exports.run = async (client, message, args, level) => {
// Removes messages in a single channel up to 100
const deleteCount = parseInt(args[0], 10);
        if (purgeCooldown.has(message.author.id)) {
        message.reply("please wait **3 seconds** between each command.");
} else {
  if(!deleteCount || deleteCount < 2 || deleteCount > 100)
  return message.reply("please provide a number between 2 and 100 for the number of messages to delete");

const fetched = await message.channel.fetchMessages({limit: deleteCount});
message.channel.bulkDelete(fetched)
  .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    message.channel.send('Purged ' + deleteCount + ' messages.')
 var purgelogEmbed = new Discord.RichEmbed()
.setAuthor("Purge", message.author.displayAvatarURL)
.setColor("#FF851B")
.addField("Moderator", message.author)
.addField("Channel", message.channel)
.addField("# of messages purged.", deleteCount)
.setTimestamp(new Date());
client.channels.get('319917089630453787').send(purgelogEmbed);
        purgeCooldown.add(message.author.id);
    setTimeout(() => {
      purgeCooldown.delete(message.author.id);
    }, 3000);
}
};

exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: "Mod"
};

exports.help = {
name: "purge",
category: "Moderation",
description: "Purge command.",
usage: "purge"

};