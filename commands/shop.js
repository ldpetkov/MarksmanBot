const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');
exports.run = async (client, message, args, level) => {

  client.getProfile = sql.prepare('SELECT * FROM profiles WHERE userID = ?');
    let profileInfo = client.getProfile.get(message.author.id);

    if (!profileInfo) {
      message.reply(`you don't have a profile set up. To set it up, run the \`\`.setup\`\` command.`);
    } else {
      var profileRP = client.getProfile.get(message.author.id).rpAmount

  var shopEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL)
  .setTitle('Shop')
  .setDescription('<:one:487249300183711745> Random avatar overlay - 1000 RP\n<:two:487249300338769931> Random pose shard - 1820 RP')
  .setFooter(`Balance: ${profileRP} RP`);
  message.channel.send(shopEmbed).then( msg => {
    msg.react(`:up:487254692510826505`).then (r => {
      msg.react(`:one:487249300183711745`).then (r => {
        msg.react(`:two:487249300338769931`)
      })
    });
    const upFilter = (reaction, user) => reaction.emoji.identifier === `up:487254692510826505` && user.id === message.author.id;
  const firstFilter = (reaction, user) => reaction.emoji.identifier === `one:487249300183711745` && user.id === message.author.id;
  const secondFilter = (reaction, user) => reaction.emoji.identifier === `two:487249300338769931` && user.id === message.author.id;
  const upOption = msg.createReactionCollector(upFilter, {time: 60000 });
  const firstOption = msg.createReactionCollector(firstFilter, {time: 60000});
  const secondOption = msg.createReactionCollector(secondFilter, {time: 60000});

  upOption.on('collect', r => {
    msg.delete();
    message.reply('shop closed.')
  });



  firstOption.on('collect', r => {
    var profileRP = client.getProfile.get(message.author.id).rpAmount
    if(profileRP < 1000){
      r.remove(message.author.id);
      message.reply(`you don't have enough RP to buy this item.`);
    } else {
      
      var tierRoll = Math.floor(Math.random() * 100 + 1);
      var overlayTier;
      if (tierRoll <= 10){
        overlayTier = 'tier2'
      } else {
        overlayTier = 'tier1'
      }
      var getOverlays = sql.prepare(`SELECT * FROM avatar_overlay_info WHERE tier = ?`);
      var overlayArray = [];
      var overlayAmount = 0;
      for (var row of getOverlays.all(overlayTier)){
        overlayArray.push(row.name);
        overlayAmount++;
      }
      var overlayRoll = Math.floor(Math.random() * overlayAmount);
            client.setRP = sql.prepare(`UPDATE profiles SET rpAmount = rpAmount - 1000 WHERE userID = ${message.author.id}`).run();
            client.addOverlay = sql.prepare(`UPDATE avatar_overlays SET ${overlayArray[overlayRoll]} = ${overlayArray[overlayRoll]} + 1 WHERE userID = ${message.author.id}`).run();
            client.overlayInfo = sql.prepare(`SELECT * FROM avatar_overlay_info WHERE name = ?`);
            var overlayAlias = client.overlayInfo.get(overlayArray[overlayRoll]).alias
            var overlayImgur = client.overlayInfo.get(overlayArray[overlayRoll]).imgurLink
            var purchaseEmbed = new Discord.RichEmbed()
            .setAuthor(client.user.username, client.user.avatarURL)
            .setTitle('Thank you for your purchase!')
            .setDescription(`${message.author.username} received **${overlayAlias}** from the celestial chest!`)
            .setThumbnail(overlayImgur)
            message.channel.send(purchaseEmbed);
            r.remove(message.author.id);
            client.channels.get('487230070763552768').send(purchaseEmbed);
      overlayArray = [];
      overlayAmount = 0;
      var newProfileRP = client.getProfile.get(message.author.id).rpAmount
      var newShopEmbed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL)
                .setTitle('Shop')
                .setDescription('<:one:487249300183711745> Random avatar overlay - 1000 RP\n<:two:487249300338769931> Random pose shard - 1820 RP')
                .setFooter(`Balance: ${newProfileRP} RP`);
                msg.edit('', {embed: newShopEmbed});

    }
  })



  secondOption.on('collect', r => {
    var profileRP = client.getProfile.get(message.author.id).rpAmount
    if(profileRP < 1820){
      r.remove(message.author.id);
      message.reply(`you don't have enough RP to buy this item.`);
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
                .addField(`Unboxing`, `**${message.author.tag}** unboxed **${trophyAlias}** from the celestial chest!`)
                .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL}`)
                .setThumbnail(trophyIcon)
                .setColor(poseTierColor)
                .setTimestamp(new Date());
                message.channel.send(unboxEmbed);
                client.channels.get('487230070763552768').send(unboxEmbed);
                r.remove(message.author.id);
                client.getPoseAmount = sql.prepare(`SELECT ${getPoseFromAlias} FROM ${getChampionName}_poses WHERE userID = ?`);
                var getPoseAmount1 = client.getPoseAmount.get(message.author.id);
                var poseAmount2 = Object.values(getPoseAmount1);
                var actualAmount = poseAmount2[0]
                var newNumber = actualAmount + 1
                client.setRP = sql.prepare(`UPDATE profiles SET rpAmount = rpAmount - 1820 WHERE userID = ${message.author.id}`).run();
                client.addTrophy = sql.prepare(`UPDATE ${getChampionName}_poses SET ${getPoseFromAlias} = ${newNumber} WHERE userID = '${message.author.id}'`).run();
                var newProfileRP = client.getProfile.get(message.author.id).rpAmount
                var poseShopEmbed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL)
                .setTitle('Shop')
                .setDescription('<:one:487249300183711745> Random avatar overlay - 1000 RP\n<:two:487249300338769931> Random pose shard - 1820 RP')
                .setFooter(`Balance: ${newProfileRP} RP`);
                msg.edit('', {embed: poseShopEmbed});
    }
  })






  });

    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "shop",
  category: "Profile",
  description: "Profile command.",
  usage: "shop"
};
