exports.run = async (client, message, args, level) => {
    message.delete().catch(O_o=>{}); 
    message.channel.send(`${message.author} takes a drink!`, { file: "./reactions/files/drink.jpg"})
      };

exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: "User"
};

exports.help = {
name: "drink",
category: "Reactions",
description: "Take a drink.",
usage: "drink"
};
