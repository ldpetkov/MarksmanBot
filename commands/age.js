const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
        let ageMessage;
    if (!message.mentions.users.first()){
        ageMessage = `${message.author.username}, your account is ${((message.createdTimestamp - message.author.createdAt) / 86400000).toFixed()} days old.`;
    } else {
        ageMessage = `${message.mentions.users.first().username}'s account is ${((message.createdTimestamp - message.mentions.users.first().createdAt) / 86400000).toFixed()} days old.`;
    } 

    const wastedEmbed = new Discord.RichEmbed()
    .setColor('#2ECC40')
    .setDescription(ageMessage);

    message.channel.send(wastedEmbed);
}
    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: [],
        permLevel: "User"
      };
      
      exports.help = {
        name: "age",
        category: "Profile",
        description: "Account age.",
        usage: "age"
      };
      