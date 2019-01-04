// Runs anytime a message is received
const Canvas = require('canvas');
const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');
module.exports = async (client, message) => {
  // Ignore all bots
  if (message.author.bot) return;

  if(message.channel.type == 'dm'){
    message.reply('no');
    return;
  } else {

  const swearWords = ["nigga", "nibba", "nigger", "nigglet", "nignog", "kike", "n!gger", "n!gg3r", "n1gger", "n1gg3r", "nigg3r", "n1gga", "n1gg@", "nigg@"];
  if( swearWords.some(word => message.content.toLowerCase().includes(word)) ) {
    message.delete();
    let muterole = message.guild.roles.find(r => r.id === "313987743153782794");
    let muteTime = 1800000;
    message.member.addRole(muterole).then(msg => {
      setTimeout(() => { 
        if (!message.member){

        } else {
          message.member.removeRole(muterole); 
          var unmuteEmbed = new Discord.RichEmbed()
          .setDescription(`**${message.author.tag}** has been unmuted.`)
          .setAuthor(message.guild.name, message.guild.iconURL)
          .setThumbnail(`${message.author.displayAvatarURL}`)
          .setColor("#0074D9")
          .setFooter(`User ID: ${message.author.id}`)
          .setTimestamp(new Date());
          message.channel.send(unmuteEmbed);
        }
      }, muteTime);
      var muteEmbed = new Discord.RichEmbed()
      .setDescription(`**${message.author.tag}** has been muted.\n\n**Time:** 30 min.\n\n**User ID:** ${message.author.id}`)
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setThumbnail(`${message.author.displayAvatarURL}`)
      .setColor("#FF4136")
      .setFooter(`Moderator: ${client.user.username}`)
      .setTimestamp(new Date());
      message.channel.send(muteEmbed);
    
    });
  }




    if(message.channel.id != "313985685839413248"){
  
    } else {
  
      var randomRoll = Math.floor(Math.random() * 100 + 1);
      console.log(`Roll: ${message.author.tag} - ${randomRoll}`);
      if (randomRoll <= 3) {
        client.channels.get('313985685839413248').send('', {files: ['./assets/img/hextech_chest.png']}).then (msg => {
          msg.react(':hextech_key:487604792781176840');
          const filter = (reaction, user) => reaction.emoji.identifier === "hextech_key:487604792781176840"  && user.id !== client.user.id;
          msg.awaitReactions(filter, {max: 1}).then (collected => {
            var collectedUserDirect = collected.map(x => x.users.last());
            var collectedUser = collected.map(x => x.users.last().id);
            var collectedUserTag = collected.map(x => x.users.last().tag);
            client.getUserProfile = sql.prepare(`SELECT * FROM profiles WHERE userID = ?`); //resolve the user that reacted the first
            var getUserProfile = client.getUserProfile.get(collectedUser) //resolve the user that reacted the first
            if(!getUserProfile) {
              client.channels.get('313985685839413248').send(`${collectedUserDirect}, nice going bud, but you forgot to setup your profile <:OMEGALUL:453598272083329025>\nYou can go ahead and do that by using the \`\`.setup\`\` command.`).then (msg => {
                msg.react(':OMEGALUL:453598272083329025');
              })
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
              // var minRoll = 0.0
              // var maxRoll = 100.0
              // var randoDecimale = Math.random() * (maxRoll - minRoll) + minRoll;
              // var decimalFinale = randoDecimale.toFixed(1);
              // if (decimalFinale >= 0.0 && decimalFinale <= 0.5){
              //   poseTier = 10000;
              //   poseTierColor = "#A31F9F"
              //   console.log(`Gemstone`)
              // } else if(decimalFinale <= 4.0 && decimalFinale > 0.5){
              //   poseTier = 3250;
              //   poseTierColor = "#F9961A"
              //   console.log(`Rolled: 3250`);
              // } else if(decimalFinale <= 10.0 && decimalFinale > 4.0){
              //   poseTier = 1820
              //   poseTierColor = "#FA0912"
              //   console.log(`Rolled 1820`)
              // } else if(decimalFinale <= 25.0 && decimalFinale > 10.0){
              //   poseTier = 1350
              //   poseTierColor = "#01F4ED"
              //   console.log(`Rolled 1350`)
              // } else if(decimalFinale <= 45.0 && decimalFinale > 25.0){
              //   poseTier = 975
              //   poseTierColor = "#0074D9"
              //   console.log(`Rolled 975`)
              // } else if(decimalFinale <= 70.0 && decimalFinale > 45.0){
              //   poseTier = 750
              //   poseTierColor = "#2ECC40"
              //   console.log(`Rolled 750`)
              // } else {
              //   poseTier = 520
              //   poseTierColor = "#4F545C"
              //   console.log(`Rolled 520`)
              // }
  
  
  
  
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
  
                var getChampionName = client.getPoseFromAlias.get(posesArray[poseRoll]).champion; // Get champion name
                var trophyAlias = client.getPoseFromAlias.get(posesArray[poseRoll]).alias; // Trophy alias
                var trophyIcon = client.getPoseFromAlias.get(posesArray[poseRoll]).imgurLink;
                var unboxEmbed = new Discord.RichEmbed()
                .addField(`Unboxing`, `**${collectedUserTag}** unboxed **${trophyAlias}**.`)
                .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL}`)
                .setThumbnail(trophyIcon)
                .setColor(poseTierColor)
                .setTimestamp(new Date());
                client.channels.get('487230070763552768').send(unboxEmbed);
                client.channels.get('313985685839413248').send(unboxEmbed);
    
                client.getPoseAmount = sql.prepare(`SELECT ${getPoseFromAlias} FROM ${getChampionName}_poses WHERE userID = ?`);
                var getPoseAmount1 = client.getPoseAmount.get(collectedUser);
                var poseAmount2 = Object.values(getPoseAmount1);
                var actualAmount = poseAmount2[0]
                var newNumber = actualAmount + 1
    
                client.addTrophy = sql.prepare(`UPDATE ${getChampionName}_poses SET ${getPoseFromAlias} = ${newNumber} WHERE userID = '${collectedUser}'`).run();
                client.getElo = sql.prepare(`SELECT * FROM duel_elo WHERE userID = ?`);
                var getElo = client.getElo.get(collectedUser).elo;
                console.log('old elo ' + getElo)
                client.addElo = sql.prepare(`UPDATE duel_elo SET elo = elo + 2 WHERE userID = '${collectedUser}'`).run();
                var getNewElo = client.getElo.get(collectedUser).elo;
                console.log('new elo ' + getNewElo)
                msg.delete();
            }
          });
        });
      }
    }
  }



  // Get the settings for the server from Enmap.
  const settings = message.settings = client.getGuildSettings(message.guild);


  var reactionArray = [
    {
      Name: "hol up",
      Reaction: { file: "https://i.imgur.com/uPDw304.png"}
    },
    {
      Name: "hmmm",
      Reaction: { file: "https://i.imgur.com/ZDul0Gh.png"}
    },
    {
      Name: "uwu",
      Reaction: "😡 👉 🚪 WEEBS OUT"
    },
    {
      Name: "owo",
      Reaction: "😡 👉 🚪 WEEBS OUT"
    },
    {
      Name: "yikes",
      Reaction: "😬 **YIKES** 😬"
    },
    {
      Name: "drink",
      Reaction: { file: "https://i.imgur.com/iThrltV.jpg"}
    }
    ]
  let reactionResult = reactionArray.find(obj => {
    return obj.Name === message.content.toLowerCase();
  });
  if(!reactionResult) {
  } else {
    message.channel.send(reactionResult.Reaction);
  }

  // Checks if the bot was mentioned, with no message after it, returns the prefix.
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix on this guild is \`${settings.prefix}\``);
  }

  // Ignore messages that don't start with the predefined prefix.
  if (message.content.indexOf(settings.prefix) !== 0) return;

  // Separate commands from arguments
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Fetch the user if not cached
  if (message.guild && !message.member) await message.guild.fetchMember(message.author);

  // Get the member perm level
  const level = client.permlevel(message);

  // Check whether the command, or alias, exist in the collections defined in app.js.
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  if (!cmd) return;

  // Restrict DM usage
  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");



    










  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return message.channel.send(`You do not have permission to use this command.
  Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name})
  This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
    } else {
      return;
    }
  }

  // To simplify message arguments, the author's level is now put on level (not member so it is supported in DMs)
  // The "level" command module argument will be deprecated in the future.
  message.author.permLevel = level;
  
  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }
  // If the command exists, **AND** the user has permission, run it.
  client.logger.cmd(`[CMD] ${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);
  cmd.run(client, message, args, level);
};
