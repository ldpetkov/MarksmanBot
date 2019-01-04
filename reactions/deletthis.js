  exports.run = async (client, message, args, level) => {
      message.delete().catch(O_o=>{}); 
      message.channel.send("", { file: "./reactions/files/deletthis.gif"})
        };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "deletthis",
  category: "Reactions",
  description: "DELETTHIS",
  usage: "deletthis"
};
