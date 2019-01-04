const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {

    let wastedMessage;
    if (!message.mentions.users.first()){
        wastedMessage = `You wasted ${((message.createdTimestamp - message.member.joinedAt) / 86400000).toFixed()} days here.`;
    } else {
        wastedMessage = `${message.mentions.users.first().username} wasted ${((message.createdTimestamp - message.mentions.members.first().joinedAt) / 86400000).toFixed()} days here.`;
    } 

    const wastedEmbed = new Discord.RichEmbed()
    .setColor('#2ECC40')
    .setDescription(wastedMessage);
    message.channel.send(wastedEmbed);
}
    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: [],
        permLevel: "User"
      };
      
      exports.help = {
        name: "wastedon",
        category: "Profile",
        description: "How much did you waste here.",
        usage: "wastedon"
      };
      