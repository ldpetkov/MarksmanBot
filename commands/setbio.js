const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');
exports.run = async (client, message, args, level) => {
  client.getProfile = sql.prepare('SELECT * FROM profiles WHERE userID = ?');
  profileInfo = client.getProfile.get(message.author.id);
  if (!profileInfo) {
    message.reply(`you don't have a profile set up. To set it up, run the \`\`.setup\`\` command.`);
  } else {
    var getSavingStatus = client.getProfile.get(message.author.id).currentlySaving;
        if (getSavingStatus == 1){
            message.reply('that profile is currently being saved, please wait.');
        } else {
          var newArray = []
    for (var i of args) {
      i = i.replace(/\n/gi, "");
      i = i.replace(/'/gi, "''");
      newArray.push(`${i} `)
    }
    var newBio = newArray.join('');
    var characterSplit = newBio.split('');
    var formattedBioText = newArray.join(' ');
    if (characterSplit.length > 150) {
      message.reply(`You're over the limit bud.\n${characterSplit.length}/150`)
    } else {
      var offset = 0;
    for (var i = 0; i < formattedBioText.length; i++){
      offset++
      if((characterSplit[i] == " " && offset > 24) || offset > 30){
        characterSplit.splice(i, 0, '\n');
        characterSplit.splice(i + 1, 1, '');
        offset = 0
      }
    }
    var finalBio = characterSplit.join('');
  
    client.setBio = sql.prepare(`UPDATE profiles SET bioText = "${finalBio}" WHERE userID = ${message.author.id}`).run();
    client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
    message.reply('new bio succesfuly set!');
    }
        }
    
  }
  
  

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "setbio",
  category: "Profile",
  description: "Profile command.",
  usage: "setbio"
};
