const Discord = require("discord.js");
var path=require('path');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');

exports.run = async (client, message, args, level) => {


  var backgroundArray = []
  for (var i of args) {
    i = i.replace(/\n/gi, "");
    i = i.replace(/'/gi, "");
    backgroundArray.push(`${i}`);
  }
  var newBackground = backgroundArray.join('');

  client.getProfile = sql.prepare('SELECT * FROM profiles WHERE userID = ?');
   let profileInfo = client.getProfile.get(message.author.id);
  client.getBackground = sql.prepare(`SELECT * FROM background_names WHERE name = ?`);

  if (!profileInfo) {
    message.reply(`you don't have a profile set up. To set it up, run the \`\`.setup\`\` command.`);
  } else {
    var getSavingStatus = client.getProfile.get(message.author.id).currentlySaving;
        if (getSavingStatus == 1){
            message.reply('that profile is currently being saved, please wait.');
        }
    else if (args === "") {
      message.reply('please specify the background name.');
    } else {
      let backgroundPath = client.getBackground.get(newBackground.toLowerCase());
      if(!backgroundPath){
        message.reply('that is an invalid background name.')
      } 
      else {
        client.getProfile = sql.prepare(`SELECT * FROM profiles WHERE userID = ?`);
        client.setBackground = sql.prepare(`UPDATE profiles SET backgroundName = '${backgroundPath.name}' WHERE userID = ?`);
        client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
       
        client.setBackground.run(message.author.id);
        message.reply(`you've successfuly changed your profile background to **${backgroundPath.alias}**!`);
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
  name: "setbackground",
  category: "Profile",
  description: "Change your profile background.",
  usage: "setbackground <background name>"
};
