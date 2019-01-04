const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');
const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    
    if (!message.mentions.users.first()) {
        message.reply('please mention a user you want to trade with');
    } else { 
        client.getProfile = sql.prepare('SELECT * FROM profiles WHERE userID = ?');
    var poseNameArray = []
  for (var i of args) {
    i = i.replace(/\n/gi, "");
    i = i.replace(/'/gi, "'");
    poseNameArray.push(`${i}`);
  }
    var shiftedValue = poseNameArray.shift();
    var newArg = poseNameArray.join(' ');
    newArg = newArg.toLowerCase();
    var getTargetProfile = client.getProfile.get(message.mentions.users.first().id)
    var getSelfProfile = client.getProfile.get(message.author.id);
    if (!getSelfProfile) {
        message.reply(`you don't have a profile set up. To set it up, run the \`\`.setup\`\` command.`);
    } else if(!getTargetProfile) {
        message.reply(`I don't have an account for ${message.mentions.users.first()}. To set up an account, that users needs to run the \`\`.setup\`\` command.`);
    } else {
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
                 message.reply('you don\'t have enough shards to trade');
             } else if (getPoseAmount == 1 && getTheNameFFS == `${getPoseNameFromAlias}`)
             {
                 message.reply(`You can't trade an equipped shard.`)
             }
             else {
                 var trophyPicture = client.getPoseNameFromAlias.get(newArg).imgurLink;
                 var tradeEmbed = new Discord.RichEmbed()
                 .setTitle('Trade')
                 .setAuthor(message.author.username, message.author.displayAvatarURL)
                 .setThumbnail(trophyPicture)
                 .setDescription(`Are you sure you want to trade your **${getPoseAliasFromCallName}** to ${message.mentions.users.first().tag}?`);
                 message.channel.send(tradeEmbed).then (msg => {
                     msg.react('✅').then (r => {
                         msg.react('⛔')
                     });
                     const acceptFilter = (reaction, user) => reaction.emoji.name === `✅` && user.id === message.author.id;
                     const cancelFilter = (reaction, user) => reaction.emoji.name === `⛔` && user.id === message.author.id;
                           
                     const acceptTrade = msg.createReactionCollector(acceptFilter, { time: 60000});
                     const cancelTrade = msg.createReactionCollector(cancelFilter, { time: 60000});

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
                            message.reply('you don\'t have enough shards to trade');
                        } else if (getPoseAmount == 1 && getTheNameFFS == `${getPoseNameFromAlias}`)
                        {
                            msg.delete();
                            message.reply(`You can't trade an equipped shard.`)
                        }
                        else {
                         msg.clearReactions();
                         msg.edit(`${message.author} traded their **${getPoseAliasFromCallName}** to ${message.mentions.users.first().tag}`, {embed: null});
                         client.setFirstValue = sql.prepare(`UPDATE ${getPoses}_poses SET ${getPoseNameFromAlias} = ${getPoseNameFromAlias} - 1 WHERE userID = ${message.author.id}`).run();
                         client.setSecondValue = sql.prepare(`UPDATE ${getPoses}_poses SET ${getPoseNameFromAlias} = ${getPoseNameFromAlias} + 1 WHERE userID = ${message.mentions.users.first().id}`).run();
                        }
                        });
                     cancelTrade.on('collect', r => {
                         msg.delete();
                         message.reply('trade cancelled');
                     })
                 });
             }
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
name: "trade",
category: "Profile",
description: "Trade command.",
usage: "trade <target> item"

};