const Discord = require("discord.js");
exports.run = async (client, message, args) => {
    let memberMention = message.mentions.members.first();
    let time = args[1];
    let caller = message.guild.members.get(message.author.id);
    if(!memberMention) return message.reply("Please mention a valid member.");
    if (time.match(/[a-z]/i)) return message.reply("please enter a valid timeout");
    let muterole = message.guild.roles.find(r => r.id === "313987743153782794");
    let newtime = time * 60000;
    memberMention.addRole(muterole).then(msg => {
        setTimeout(() => { 
        memberMention.removeRole(muterole); 
        var unmuteEmbed = new Discord.RichEmbed()
        .setDescription(`**${memberMention.user.tag}** has been unmuted.`)
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setThumbnail(`${memberMention.user.displayAvatarURL}`)
        .setColor("#0074D9")
        .setFooter(`User ID: ${memberMention.user.id}`)
        .setTimestamp(new Date());
        message.channel.send(unmuteEmbed);}, newtime);

        var muteEmbed = new Discord.RichEmbed()
        .setDescription(`**${memberMention.user.tag}** has been muted.\n\n**Time:** ${time} min.\n\n**User ID:** ${memberMention.user.id}`)
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setThumbnail(`${memberMention.user.displayAvatarURL}`)
        .setColor("#FF4136")
        .setFooter(`Moderator: ${caller.user.username}`)
        .setTimestamp(new Date());
        message.channel.send(muteEmbed);
    })
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Mod"
  };
  
  exports.help = {
    name: "mute",
    category: "Moderation",
    description: "Mute command.",
    usage: "mute"
  
  };