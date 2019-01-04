const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');
exports.run = async (client, message, args, level) => {
    var getProfiles = sql.prepare(`SELECT * FROM profiles`);
    var currentMember;
    var currentID;
    for(var row of getProfiles.all()){
        currentID = row.userID;
        currentMember = message.guild.members.find(m => m.id === `${row.userID}`);
        if(!currentMember){
            console.log(`${row.userID} left`)

            var getChamps = sql.prepare('SELECT * FROM trophies_champions');
            for (var rows of getChamps.all()) {
                console.log(rows.name)
                console.log(currentID)
                client.getProfilePoses = sql.prepare(`SELECT * FROM ${rows.name}_poses WHERE userID = ?`);
                var getProfilePoses = client.getProfilePoses.get(currentID);
                if(!getProfilePoses) {

                } else {
                    client.setPoses = sql.prepare(`DELETE FROM ${rows.name}_poses WHERE userID = ${currentID}`).run();
                }
                  
            }
            client.clearProfiles = sql.prepare(`DELETE FROM profiles WHERE userID = ${currentID}`).run();
                client.clearOverlays = sql.prepare(`DELETE FROM avatar_overlays WHERE userID = ${currentID}`).run();
                client.clearElo = sql.prepare(`DELETE FROM duel_elo WHERE userID = ${currentID}`).run();



        } else {
            // console.log(currentMember.user.username)
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
  name: "clearleft",
  category: "Database",
  description: "Wipes the left profiles table.",
  usage: "clearleft"
};
