  exports.run = async (client, message, args, level) => {
      message.delete().catch(O_o=>{}); 
      message.channel.send("", { file: "./reactions/files/vayne.png"})
        };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "vayne",
  category: "Reactions",
  description: "Vayne",
  usage: "vayne"
};
