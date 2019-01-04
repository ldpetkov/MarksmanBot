const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');
exports.run = async (client, message, args, level) => {

    const poseArguments = message.content.slice(9).trim().split(/=+/g);
    if (!poseArguments[0] || !poseArguments[1] || !poseArguments[2]) {
      message.reply(`you're missing some arguments there`)
  } else {
    client.getSkin = sql.prepare(`SELECT * FROM trophies_skins WHERE name = ?`);
    var getSkin = client.getSkin.get(poseArguments[0]);
  }




};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "addchampion",
  category: "Database",
  description: "Adds a new skin to the database.",
  usage: "addchampion <name> <alias> <price>"
};
