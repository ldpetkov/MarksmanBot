const Discord = require("discord.js");
  exports.run = async (client, message, args, level) => {

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    member.send(`You have been kicked for the following reason: \n**${reason}**`);
    // Kicking time
    await member.kick(reason)
    .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    var kickEmbed = new Discord.RichEmbed()
    .setDescription(`**${member.user.tag}** has been kicked.\n\n**Reason:** ${reason}`)
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setColor("#FF4136")
    message.channel.send(kickEmbed);

    var kicklogEmbed = new Discord.RichEmbed()
    .setAuthor(`Kick | ${member.user.tag}`, `${member.user.displayAvatarURL}`)
    .setColor("#AAAAAA")
    .setFooter(`User ID: ${member.user.id}`)
    .addField("User", `${member.user}\n${member.user.tag}`)
    .addField("Moderator", message.author)
    .addField("Reason", `${reason}`)
    .setColor("#FF4136");
    client.channels.get('319917089630453787').send(kicklogEmbed);
  };

  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Mod"
};

exports.help = {
  name: "kick",
  category: "Moderation",
  description: "Kick command.",
  usage: "kick"

};