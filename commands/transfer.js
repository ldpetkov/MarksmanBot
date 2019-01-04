const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');
const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {

    var getProfiles = sql.prepare(`SELECT * FROM profiles`);
    for (var row of getProfiles.all()){
        client.setPoses = sql.prepare(`INSERT INTO profile_hats (userID) VALUES (${row.userID});`).run();
        client.updateToZero = sql.prepare(`UPDATE profile_hats SET bewitching_hat = 0 WHERE userID = ${row.userID}`).run();
    }
    message.reply('successfuly transferred all the users to ' + `**profile_hats**`)



};
  
exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: "Bot owner"
};

exports.help = {
name: "transfer",
category: "Profile",
description: "Transfer command.",
usage: "transfer"

};