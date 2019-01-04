const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');
const prettyMs = require('pretty-ms');
exports.run = async (client, message, args, level) => {
    client.getProfile = sql.prepare('SELECT * FROM profiles WHERE userID = ?');
    var getProfile = client.getProfile.get(message.author.id)
    if (!getProfile) {
        message.reply(`you don't have a profile set up. To set it up, run the \`\`.setup\`\` command.`);
    } else {
    var lastGeneratedChest = client.getProfile.get(message.author.id).lastChest;
    var timePassed = message.createdTimestamp - lastGeneratedChest;
    
    if (timePassed < 86400000){
        var nextChest = lastGeneratedChest + 86400000;
    var leftTime = nextChest - message.createdTimestamp;
    var leftTimeConverted = prettyMs(leftTime, {verbose: true, secDecimalDigits: 0});
        message.reply(`you can get your next free chest in **${leftTimeConverted}**`)
    } else {
        var poseTier;
              var poseTierColor;
              var firstRoll = Math.floor(Math.random() * 100 + 1);
              
              if (firstRoll == 1){
                poseTier = 10000;
                poseTierColor = "#A31F9F"
                console.log(`Gemstone`)
              } else if(firstRoll < 5 && firstRoll > 1){
                poseTier = 3250;
                poseTierColor = "#F9961A"
                console.log(`Rolled: 3250`);
              } else if(firstRoll < 11 && firstRoll > 4){
                poseTier = 1820
                poseTierColor = "#FA0912"
                console.log(`Rolled 1820`)
              } else if(firstRoll < 26 && firstRoll > 10){
                poseTier = 1350
                poseTierColor = "#01F4ED"
                console.log(`Rolled 1350`)
              } else if(firstRoll < 46 && firstRoll > 25){
                poseTier = 975
                poseTierColor = "#0074D9"
                console.log(`Rolled 975`)
              } else if(firstRoll < 71 && firstRoll > 45){
                poseTier = 750
                poseTierColor = "#2ECC40"
                console.log(`Rolled 750`)
              } else {
                poseTier = 520
                poseTierColor = "#4F545C"
                console.log(`Rolled 520`)
              }


          client.selectPose = sql.prepare(`SELECT * FROM trophies_poses WHERE price = ?`);
              var selectPose = sql.prepare(`SELECT * FROM trophies_poses WHERE price = ?`);
              var posesArray = [];
              var posesAmount = 0;
              for (var row of selectPose.all(poseTier)){
                posesArray.push(row.alias);
                posesAmount++;
                
              }
              var poseRoll = Math.floor(Math.random() * posesAmount);
              console.log(posesArray[poseRoll])
  
                client.getPoseFromAlias = sql.prepare(`SELECT * FROM trophies_poses WHERE alias = ?`);
                var getPoseFromAlias = client.getPoseFromAlias.get(posesArray[poseRoll]).name;
                var getChampionName = client.getPoseFromAlias.get(posesArray[poseRoll]).champion; // get champion name
                var trophyAlias = client.getPoseFromAlias.get(posesArray[poseRoll]).alias; // trophy alias
                var trophyIcon = client.getPoseFromAlias.get(posesArray[poseRoll]).imgurLink;
                var unboxEmbed = new Discord.RichEmbed()
                .addField(`Unboxing`, `**${message.author.tag}** got **${trophyAlias}** from their daily chest!`)
                .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL}`)
                .setThumbnail(trophyIcon)
                .setColor(poseTierColor)
                .setTimestamp(new Date());
                message.channel.send(unboxEmbed);
                client.channels.get('487230070763552768').send(unboxEmbed);
                client.updateLastChest = sql.prepare(`UPDATE profiles SET lastChest = '${message.createdTimestamp}' WHERE userID = ${message.author.id}`).run();
                client.getPoseAmount = sql.prepare(`SELECT ${getPoseFromAlias} FROM ${getChampionName}_poses WHERE userID = ?`);
                var getPoseAmount1 = client.getPoseAmount.get(message.author.id);
                var poseAmount2 = Object.values(getPoseAmount1);
                var actualAmount = poseAmount2[0]
                var newNumber = actualAmount + 1
    
                client.addTrophy = sql.prepare(`UPDATE ${getChampionName}_poses SET ${getPoseFromAlias} = ${newNumber} WHERE userID = '${message.author.id}'`).run();
        
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
  name: "generatechest",
  category: "Profiles",
  description: "24 hour chest.",
  usage: "generatechest"
};
