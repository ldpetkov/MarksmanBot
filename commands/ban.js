exports.run = async (client, message, args, level) => {
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("please mention a valid member.");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
  
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    member.send(`You have been banned for the following reason: \n**${reason}**`);
    // Hammer time.
    await member.ban(reason)
    .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
  
  };
  
  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Mod"
  };
  
  exports.help = {
  name: "ban",
  category: "Moderation",
  description: "Ban command.",
  usage: "ban"
  
  };