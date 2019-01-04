const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');
module.exports = async client => {
  // Log that the bot is online.
  client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "ready");

  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'profiles';").get();
  if (!table['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE profiles (userID TEXT, rpAmount INTEGER, backgroundName TEXT, bioText TEXT, trophyName TEXT, trophyTier TEXT);").run();
    // Ensure that the "id" row is always unique and indexed.
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }

  var getChampions = sql.prepare(`SELECT * FROM champion_list`);
  var rowAmount = 0;
  for (var row of getChampions.all()){
    rowAmount++;
  }
  var status = setInterval (function () {
    var championRoll = Math.floor(Math.random() * rowAmount + 1);
    client.getRandomChampion = sql.prepare(`SELECT * FROM champion_list WHERE id = ?`);
    var getRandomChampion = client.getRandomChampion.get(championRoll).alias
        client.user.setActivity(` ${getRandomChampion}`);
        console.log(`Playing ${getRandomChampion}`);
      }, 1 * 60000);
  client.channels.get('416749539068870672').send(`I'm online! <:wave:465949859111763968>`);
};
