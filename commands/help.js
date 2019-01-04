exports.run = (client, message, args, level) => {
  message.author.send(`Hi <:wave:465949859111763968>`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "halp"],
  permLevel: "User"
};

exports.help = {
  name: "help",
  category: "System",
  description: "Help command.",
  usage: "help"
};
