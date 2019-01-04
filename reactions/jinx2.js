  exports.run = async (client, message, args, level) => {
      message.delete().catch(O_o=>{}); 
      message.channel.send("", { file: "./reactions/files/jinx2.png"})
        };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "jinx2",
  category: "Reactions",
  description: "Jinx",
  usage: "jinx2"
};
