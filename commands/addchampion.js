const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');
exports.run = async (client, message, args, level) => {

  const poseArguments = message.content.slice(13).trim().split(/=+/g);
  if (!poseArguments[0] || !poseArguments[1] || !poseArguments[2]) {
    message.reply(`you're missing some arguments there.`)
} else {
  client.getChampion = sql.prepare(`SELECT * FROM trophies_champions WHERE name = ?`);
    var getChampion = client.getChampion.get(poseArguments[0]);
    if (!getChampion){
      var tableName = `${poseArguments[0]}_poses`
      sql.prepare(`CREATE TABLE '${tableName}' (userID TEXT);`).run();
      client.addChampion = sql.prepare(`INSERT INTO trophies_champions (name, alias, price) VALUES ("${poseArguments[0]}", "${poseArguments[1]}", "${poseArguments[2]}");`).run();
      message.reply(`successfuly added **${poseArguments[1]}** to the database`)
    } else {
      return message.reply('that champion already exists in the DB')
    }
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
  description: "Adds a new champion to the database.",
  usage: "addchampion <name> <alias> <price>"
};
