const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');
exports.run = async (client, message, args, level) => {
client.clearTable = sql.prepare(`DELETE FROM ${args[0]}_poses`).run();;
message.reply(`Successfuly cleared the ${args}_poses`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "cleartable",
  category: "Database",
  description: "Clear a table.",
  usage: "cleartable <table>"
};
