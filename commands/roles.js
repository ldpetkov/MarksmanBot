const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');

module.exports.run = async (client, message, args, level) => {
    
    var getChampions = sql.prepare(`SELECT * FROM champion_list`);
    var championArray = [];
    var championMemberCountArray = [];
  for (var row of getChampions.all()){
    var memberCount = message.guild.roles.find(r => r.name === row.alias).members.map(m => m).length;
    championArray.push(`${row.alias}\n`)
    championMemberCountArray.push(`${memberCount}\n`);
  }
  var miscMemberCountArray = [];
  var miscRoleArray = [];
  var getMiscRoles = sql.prepare(`SELECT * FROM assignable_roles`);
  for (var row of getMiscRoles.all()){
    var miscMemberCount = message.guild.roles.find(r => r.name === row.name).members.map(m => m).length;
    miscRoleArray.push(row.name);
    miscMemberCountArray.push(miscMemberCount);
  }
  
  
  
  var miscCount = miscMemberCountArray.join('\n')
  var championList = championArray.join('');
  var miscList = miscRoleArray.join('\n');
  var championMemberCountList = championMemberCountArray.join('');
  var rolesEmbed = new Discord.RichEmbed()
  .setThumbnail(message.guild.iconURL)
  .setColor('#0074D9')
  .addField(`Roles`, `**Champions**\n${championList}\n\n**Misc**\n${miscList}`, true)
  .addField(`Members`, `\u200B\n${championMemberCountList}\n\n\n${miscCount}`, true)
  .setFooter('Use the .role command to join a role. Only Misc roles are self-assignable.');
  message.channel.send(rolesEmbed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "roles",
  category: "Reactions",
  description: "List of most common roles.",
  usage: "roles"
};
