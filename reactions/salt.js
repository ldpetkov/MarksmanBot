exports.run = async (client, message, args, level) => {
    message.delete().catch(O_o=>{}); 
    message.channel.send("", { file: "./reactions/files/salt.gif"})
      };

exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: "User"
};

exports.help = {
name: "salt",
category: "Reactions",
description: "Go into #salt_mine.",
usage: "salt"
};
