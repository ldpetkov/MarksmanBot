const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');
const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    client.getProfile = sql.prepare('SELECT * FROM profiles WHERE userID = ?');
    var poseNameArray = []
  for (var i of args) {
    i = i.replace(/\n/gi, "");
    i = i.replace(/'/gi, "'");
    poseNameArray.push(`${i}`);
  }
  var newArg = poseNameArray.join(' ');
    newArg = newArg.toLowerCase();
  var getSelfProfile = client.getProfile.get(message.author.id);
  if (!getSelfProfile) {
    message.reply(`you don't have a profile set up. To set it up, run the \`\`.setup\`\` command.`);
  }
  else {
    client.getPoses = sql.prepare(`SELECT * FROM trophies_poses WHERE callName = ?`);
    var getPoses = client.getPoses.get(newArg).champion;
    if(!getPoses) {
        message.reply('I can\'t find that pose in my database.')
    } else {
        client.getPoseNameFromAlias = sql.prepare(`SELECT * FROM trophies_poses WHERE callName = ?`);
        var getPoseNameFromAlias = client.getPoseNameFromAlias.get(newArg).name;
        var getPoseAliasFromCallName = client.getPoseNameFromAlias.get(newArg).alias;
        client.getPoseAmount = sql.prepare(`SELECT ${getPoseNameFromAlias} FROM ${getPoses}_poses WHERE userID = ?`);
        var getPoseAmount = Object.values(client.getPoseAmount.get(message.author.id));
        client.getProfileCurrentTrophy = sql.prepare(`SELECT trophyName FROM profiles WHERE userID = ?`);
        var getProfileCurrentTrophy = client.getProfileCurrentTrophy.get(message.author.id);
        var getTheNameFFS = Object.values(getProfileCurrentTrophy)
         if(getPoseAmount < 1) {
             message.reply('you don\'t have enough shards to sell');
         } else if (getPoseAmount == 1 && getTheNameFFS == `${getPoseNameFromAlias}`)
         {
             message.reply(`You can't sell an equipped shard.`)
         }
         else {
            
            var trophyPicture = client.getPoseNameFromAlias.get(newArg).imgurLink;
            client.getPosePrice = sql.prepare(`SELECT * FROM trophies_poses WHERE name = ?`);
                        var getPosePrice = client.getPosePrice.get(getPoseNameFromAlias).price
                        var getProfileRP = client.getProfile.get(message.author.id).rpAmount
            var newProfileRP = getProfileRP + getPosePrice
            var tradeEmbed = new Discord.RichEmbed()
            .setTitle('Trade')
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setColor('#FF851B')
            .setThumbnail(trophyPicture)
            .addField(`Old RP amount`, `${getProfileRP}`, true)
            .addField(`New RP amount`, `${newProfileRP}`, true)
            .setDescription(`Are you sure you want to sell your **${getPoseAliasFromCallName}** (${getPosePrice} RP)?`);
            message.channel.send(tradeEmbed).then (msg => {
                msg.react('✅').then (r => {
                    msg.react('⛔')
                });

                    const acceptFilter = (reaction, user) => reaction.emoji.name === `✅` && user.id === message.author.id;
                    const cancelFilter = (reaction, user) => reaction.emoji.name === `⛔` && user.id === message.author.id;
                           
                     const acceptTrade = msg.createReactionCollector(acceptFilter, {max: 1, time: 60000});
                     const cancelTrade = msg.createReactionCollector(cancelFilter, {max: 1, time: 60000});
                     acceptTrade.on('end', r => {
                         if(!msg){
                             return;
                         } else {
                            msg.clearReactions();
                         }
                     })
                     acceptTrade.on('collect', r => {
                        getPoseAmount = Object.values(client.getPoseAmount.get(message.author.id));
                        getProfileCurrentTrophy = client.getProfileCurrentTrophy.get(message.author.id);
                        getTheNameFFS = Object.values(getProfileCurrentTrophy)
                        if(getPoseAmount < 1) {
                            msg.delete();
                            message.reply('you don\'t have enough shards to sell');
                        } else if (getPoseAmount == 1 && getTheNameFFS == `${getPoseNameFromAlias}`)
                        {
                            msg.delete();
                            message.reply(`You can't sell an equipped shard.`)
                        }
                        else {
                        msg.clearReactions();
                        
                        client.setFirstValue = sql.prepare(`UPDATE ${getPoses}_poses SET ${getPoseNameFromAlias} = ${getPoseNameFromAlias} - 1 WHERE userID = ${message.author.id}`).run();
                        client.getPosePrice = sql.prepare(`SELECT * FROM trophies_poses WHERE name = ?`);
                        var getPosePrice = client.getPosePrice.get(getPoseNameFromAlias).price
                        client.setSecondValue = sql.prepare(`UPDATE profiles SET rpAmount = rpAmount + ${getPosePrice} WHERE userID = ${message.author.id}`).run();
                        msg.edit(`${message.author} sold their **${getPoseAliasFromCallName}** to the merchant.`, {embed: null});
                        }
                    });
                    cancelTrade.on('collect', r => {
                        msg.delete();
                        message.reply('cancelled selling.');
                    })
            });
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
name: "sell",
category: "Profile",
description: "Sell command",
usage: "sell <item>"

};