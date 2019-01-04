const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');
const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {

    client.getProfile = sql.prepare(`SELECT * FROM profiles WHERE userID = ?`);
    var getProfile = client.getProfile.get(message.author.id).rpAmount;
    var balanceEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setTitle(`Balance`)
    .setDescription(`Your balance is ${getProfile} RP`);
    message.channel.send(balanceEmbed);
};
  
exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: "User"
};

exports.help = {
name: "balance",
category: "Profile",
description: "Balance command",
usage: "balance"

};