const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');
exports.run = async (client, message, args, level) => {

  clearEmbed = new Discord.RichEmbed()
  .setAuthor('Delete all profiles.', message.client.avatarURL)
  .setDescription('This will delete all the saved profiles in the database. Are you sure?')
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
              client.setPoses = sql.prepare(`DELETE FROM ${row.name}_poses`).run();
     
        }

      client.clearProfiles = sql.prepare('DELETE FROM profiles').run();
      msg.delete();
      message.channel.send(`Profile database erased.`).then (msg => {

        var deleteEmbed = new Discord.RichEmbed()
        .addField(`Database wiped 🗑️`, `Entire profile database wiped.`)
        .setAuthor(`${client.user.username}`, `${client.user.avatarURL}`)
        .setThumbnail(message.guild.iconURL)
        .setColor("#FF4136")
        .setFooter(`Caller ID: ${message.author.id}`)
        .setTimestamp(new Date());
        client.channels.get('487230070763552768').send(deleteEmbed).catch(console.error);
      })
    });
  
    cancelProfiles.on('collect', r => {
      message.reply(`⛔`);
      r.remove(message.author.id);
    });
  });


  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "clearprofiles",
  category: "Database",
  description: "Wipes the profiles table.",
  usage: "clearprofiles"
};
