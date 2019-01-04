const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');
module.exports = (client, member, message) => {

  const settings = client.getGuildSettings(member.guild);
    var leaveDate = new Date();
    let guild = member.guild;
     var leaveEmbed = new Discord.RichEmbed()
    .setDescription(`${member.user} ${member.user.tag}`)
    .setAuthor("Member Left", `${member.user.displayAvatarURL}`)
    .setColor("#FF4136")
    .setThumbnail(`${member.user.displayAvatarURL}`)
    .setFooter(`User ID: ${member.user.id}`)
    .setTimestamp(leaveDate);
    client.channels.get('418015132019458048').send(leaveEmbed);
    client.getProfile = sql.prepare(`SELECT * FROM profiles WHERE userID = ?`);
    let profileInfo = client.getProfile.get(member.user.id);
    if (!profileInfo){

    } else {
      var getChamps = sql.prepare('SELECT * FROM trophies_champions');
      for (var row of getChamps.all()) {
          client.getProfilePoses = sql.prepare(`SELECT * FROM ${row.name}_poses WHERE userID = ?`);
          var getProfilePoses = client.getProfilePoses.get(member.user.id);
          if(!getProfilePoses) {

          } else {
              client.setPoses = sql.prepare(`DELETE FROM ${row.name}_poses WHERE userID = '${member.user.id}'`).run();
          }
            
      }
      client.clearProfiles = sql.prepare(`DELETE FROM profiles WHERE userID = '${member.user.id}'`).run();
      client.clearOverlays = sql.prepare(`DELETE FROM avatar_overlays WHERE userID = '${member.user.id}'`).run();
      client.clearElo = sql.prepare(`DELETE FROM duel_elo WHERE userID = '${member.user.id}'`).run();
      var deleteEmbed = new Discord.RichEmbed()
        .addField(`Profile deleted 🗑️`, `**${member.user.tag}** has been removed from the database.`)
        .setAuthor(`${client.user.username}`, `${client.user.avatarURL}`)
        .setThumbnail(member.user.displayAvatarURL)
        .setColor("#FF4136")
        .setFooter(`User ID: ${member.user.id}`)
        .setTimestamp(new Date());
        client.channels.get('487230070763552768').send(deleteEmbed).catch(console.error);
        console.log(`Deleted the profile in the database for ${member.user.id}`);
    }
    
};