  exports.run = async (client, message, args, level) => {
      message.delete().catch(O_o=>{}); 
      message.channel.send("", { file: "./reactions/files/grooves.gif"})
        };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "grooves",
  category: "Reactions",
  description: "muzak",
  usage: "grooves"
};
