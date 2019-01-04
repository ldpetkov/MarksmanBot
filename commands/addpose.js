const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');
exports.run = async (client, message, args, level) => {
    const settings = message.settings = client.getGuildSettings(message.guild);

    


    const poseArguments = message.content.slice(9).trim().split(/=+/g);
    if (!poseArguments[0] || !poseArguments[1] || !poseArguments[2] || !poseArguments[3]) {
      message.reply(`you're missing some arguments there`)
  } else {
    client.getSkin = sql.prepare(`SELECT * FROM trophies_skins WHERE name = ?`);
    var getSkin = client.getSkin.get(`${poseArguments[0]}_${poseArguments[1]}`);
    if(!getSkin){
      message.reply(`Skin not in the DB`);
      var getSkins = sql.prepare(`SELECT * FROM trophies_skins`);
      var skinCount = 0;
      for (var rows of getSkins.all()){
        skinCount++;
      }
      skinCount = skinCount + 2;
      console.log('skin count = ' + skinCount);
      var skinIndexNumber = 0
          var skinsIndex = sql.prepare(`SELECT * FROM trophies_skins WHERE champion = ?`);
          for (var rows of skinsIndex.all(poseArguments[0])) {
            skinIndexNumber++;
          }
          skinIndexNumber++;
          console.log('skin index = ' + skinIndexNumber);
      skinCount = skinCount + 1;
      var skinDBName = `${poseArguments[0]}_${poseArguments[1]}`;
      console.log(skinDBName);
      client.addSkinToDatabase = sql.prepare(`INSERT INTO trophies_skins (champion, name, orderID, alias, price) VALUES (@champion, @name, @orderID, @alias, @price);`);
    
      // client.addPoseToDatabase = sql.prepare(`INSERT OR REPLACE INTO trophies_poses (id, champion, skin, name, alias, price, path, poseIndex) VALUES (@id, @champion, @skin, @name, @alias, @price, @path, @poseIndex);`);
      var addSkinToDatabase = {
        champion: poseArguments[0],
        name: skinDBName,
        orderID: skinIndexNumber,
        alias: poseArguments[4],
        price: poseArguments[5]
      }
      client.addSkinToDatabase.run(addSkinToDatabase);
    
    
    
    }
    var fullSkinName = `${poseArguments[0]}_${poseArguments[1]}`
    var poseID = 0
          var posesLength = sql.prepare("SELECT * FROM trophies_poses", (err, results) => { console.log(results) });
          for (var rows of posesLength.all()) {
            poseID++;
          }
          poseID++;
    var poseIndexNumber = 0
          var posesIndex = sql.prepare(`SELECT * FROM trophies_poses WHERE skin = ?`);
          for (var rows of posesIndex.all(fullSkinName)) {
            poseIndexNumber++;
          }
          poseIndexNumber++;
    var champName = poseArguments[0];
    var skinName = poseArguments[1];
    var poseName = `${champName}_${skinName}_${poseArguments[2]}`;
    var poseAlias = poseArguments[3];
    var posePath = `./assets/img/profile/trophies/${champName}/${poseName}.png`
    client.getChampionPrice = sql.prepare(`SELECT * FROM trophies_champions WHERE name = ?`);
    client.getSkinPrice = sql.prepare(`SELECT * FROM trophies_skins WHERE name = ?`);
    var posePrice = client.getSkinPrice.get(fullSkinName).price;

    client.checkIfPoseExists = sql.prepare(`SELECT * FROM trophies_poses WHERE name = ?`);
    var checkIfPoseExists = client.checkIfPoseExists.get(poseName);
    if (checkIfPoseExists) {
      message.reply('that pose already exists in the database');
    } else {
      let newPoseEmbed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription('Add a new pose to the database')
      .addField('Pose #', poseID)
      .addField('Champion', champName)
      .addField('Skin', `${poseArguments[0]}_${skinName}`)
      .addField('Name', `${poseName}`)
      .addField('Alias', poseAlias)
      .addField('Price', posePrice)
      .addField('Path', posePath)
      .addField('Pose index', poseIndexNumber)
      message.channel.send('', {files: [`${posePath}`]})
      message.channel.send(newPoseEmbed).then (msg => {
          msg.react('✅').then (r => {
          msg.react('⛔');
          });
          const acceptFilter = (reaction, user) => reaction.emoji.name === `✅` && user.id === message.author.id;
          const cancelFilter = (reaction, user) => reaction.emoji.name === `⛔` && user.id === message.author.id;
                
          const acceptProfiles = msg.createReactionCollector(acceptFilter, { time: 60000});
          const cancelProfiles = msg.createReactionCollector(cancelFilter, { time: 60000});
  
          acceptProfiles.on('collect', r => {
            var poseCallName = poseAlias.toLowerCase();
            client.addPoseToDatabase = sql.prepare(`INSERT OR REPLACE INTO trophies_poses (champion, skin, name, alias, callName, price, path, poseIndex) VALUES (@champion, @skin, @name, @alias, @callName, @price, @path, @poseIndex);`);
            var addPoseToDatabase = {
              champion: champName,
              skin: fullSkinName,
              name: poseName,
              alias: poseAlias,
              callName: poseCallName,
              price: posePrice,
              path: posePath,
              poseIndex: poseIndexNumber
            }
            client.addPoseToDatabase.run(addPoseToDatabase);
  
              client.insertColumns = sql.prepare(`ALTER TABLE ${champName}_poses ADD ${poseName} INTEGER`).run();
            var insertColumnData = sql.prepare(`SELECT * FROM ${champName}_poses`);
            for (var rows of insertColumnData.all()){
              client.insertColumnData = sql.prepare(`UPDATE ${champName}_poses SET ${poseName} = ${0}`).run();
            }
            r.message.delete();
            message.reply(`added ${poseAlias} to the database!`);
          })
          cancelProfiles.on('collect', r => {
            r.message.delete();
            message.reply(`pose cancelled`);
          })
      })
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
  name: "addpose",
  category: "Database",
  description: "Adds a new pose to the database.",
  usage: "addpose <champion> <skin> <name> <alias>"
};
