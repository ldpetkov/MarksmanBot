  exports.run = async (client, message, args, level) => {
      message.delete().catch(O_o=>{}); 
      message.channel.send("", { file: "./reactions/files/doit.gif"})
        };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "doit",
  category: "Reactions",
  description: "Do it.",
  usage: "doit"
};
