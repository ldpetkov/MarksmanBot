const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');
exports.run = async (client, message, args, level) => {
    if(!message.mentions.users.first()){
        message.reply('please specify a user.');
      } else {
        profileTarget = message.mentions.users.first().id;
        userName = message.mentions.users.first().username;

        client.getProfile = sql.prepare(`SELECT * FROM profiles WHERE userID = ?`);
        let profileInfo = client.getProfile.get(profileTarget);
        if(!profileInfo) {
            message.reply('this user doesn\'t have an account in the database');
        } else {
            clearEmbed = new Discord.RichEmbed()
            .setAuthor(`Delete a profile.`, message.client.avatarURL)
            .setDescription(`This will delete ${userName}'s profile from the database. Are you sure?`)
            message.channel.send(clearEmbed).then (msg => {
              msg.react(`✅`).then (r => {
              msg.react(`⛔`)
              });
          
          
              const acceptFilter = (reaction, user) => reaction.emoji.name === `✅` && user.id === message.author.id;
              const cancelFilter = (reaction, user) => reaction.emoji.name === `⛔` && user.id === message.author.id;
              
              const acceptProfiles = msg.createReactionCollector(acceptFilter, { time: 60000});
              const cancelProfiles = msg.createReactionCollector(cancelFilter, { time: 60000});
          
              acceptProfiles.on('collect', r => {
                var getChamps = sql.prepare('SELECT * FROM trophies_champions');
                for (var row of getChamps.all()) {
                    client.getProfilePoses = sql.prepare(`SELECT * FROM ${row.name}_poses WHERE userID = ?`);
                    var getProfilePoses = client.getProfilePoses.get(profileTarget);
                    if(!getProfilePoses) {

                    } else {
                        client.setPoses = sql.prepare(`DELETE FROM ${row.name}_poses WHERE userID = ${profileTarget}`).run();
                    }
                      
                }

                client.clearProfiles = sql.prepare(`DELETE FROM profiles WHERE userID = ${profileTarget}`).run();
                client.clearOverlays = sql.prepare(`DELETE FROM avatar_overlays WHERE userID = ${profileTarget}`).run();
                client.clearElo = sql.prepare(`DELETE FROM duel_elo WHERE userID = ${profileTarget}`).run();
                msg.delete();
                message.channel.send(`${userName}'s profile has been successfuly erased. To set it up again, ${userName} needs to run the \`\`.setup\`\` command again.`).then (msg => {

                  var deleteEmbed = new Discord.RichEmbed()
                  .addField(`Profile deleted 🗑️`, `**${message.mentions.users.first().tag}** has been removed from the database.`)
                  .setAuthor(`${client.user.username}`, `${client.user.avatarURL}`)
                  .setThumbnail(message.author.displayAvatarURL)
                  .setColor("#FF4136")
                  .setFooter(`User ID: ${profileTarget}`)
                  .setTimestamp(new Date());
                  client.channels.get('487230070763552768').send(deleteEmbed).catch(console.error);
                })
                
              });
            
              cancelProfiles.on('collect', r => {
                msg.delete();
                message.channel.send('Profile deletion cancelled.')
              });
            });
        }




      }
  

  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Mod"
};

exports.help = {
  name: "deleteprofile",
  category: "Database",
  description: "Wipes a user's profile.",
  usage: "deleteprofile"
};
