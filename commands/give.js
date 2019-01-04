const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');
exports.run = async (client, message, args, level) => {

    if(!message.mentions.members.first()){
        message.reply('please mention a member.')
    } else {
        client.getProfile = sql.prepare('SELECT * FROM profiles WHERE userID = ?');
        var getProfile = client.getProfile.get(message.mentions.members.first().id)
        if (!getProfile) {
            message.reply(`I don't have an account for **${message.mentions.members.first().user.tag}**. To set up an account, that users needs to run the \`\`.setup\`\` command.`);
        } else {
            var giveawayEmbed = new Discord.RichEmbed()
            .setAuthor('Giveaway', client.user.displayAvatarURL)
            .addField('Mythic', '<:mythic:496077876852948993>')
            .addField('Ultimate', '<:ultimate:496077877087830030>')
            .addField('Legendary', '<:legendary:496077876974583834> ')
            .addField('Epic', '<:epic:496077877154938880>')
            .addField('Superior', '<:superior:496088854025994240>')
            .addField('Deluxe', '<:deluxe:496088854185377793>')
            .addField('Common', '<:common:496088854223257601>')
            .setFooter(`Target member: ${message.mentions.members.first().user.tag}`, message.mentions.members.first().user.displayAvatarURL)
            message.channel.send(giveawayEmbed).then (msg => {
            msg.react('🔼').then (r => {
                msg.react(':mythic:496077876852948993').then (r => {
                    msg.react(':ultimate:496077877087830030').then (r => {
                        msg.react(':legendary:496077876974583834').then (r => {
                            msg.react(':epic:496077877154938880').then (r => {
                                msg.react(':superior:496088854025994240').then (r => {
                                    msg.react(':deluxe:496088854185377793').then (r => {
                                        msg.react(':common:496088854223257601')
                                    })
                                })
                            })
                        })
                    })
                })
            })

                const cancelFilter = (reaction, user) => reaction.emoji.name === `🔼` && user.id === message.author.id;
                const mythicFilter = (reaction, user) => reaction.emoji.identifier === `mythic:496077876852948993` && user.id === message.author.id;
                const ultimateFilter = (reaction, user) => reaction.emoji.identifier === `ultimate:496077877087830030` && user.id === message.author.id;
                const legendaryFilter = (reaction, user) => reaction.emoji.identifier === `legendary:496077876974583834` && user.id === message.author.id;
                const epicFilter = (reaction, user) => reaction.emoji.identifier === `epic:496077877154938880` && user.id === message.author.id;
                const superiorFilter = (reaction, user) => reaction.emoji.identifier === `superior:496088854025994240` && user.id === message.author.id;
                const deluxeFilter = (reaction, user) => reaction.emoji.identifier === `deluxe:496088854185377793` && user.id === message.author.id;
                const commonFilter = (reaction, user) => reaction.emoji.identifier === `common:496088854223257601` && user.id === message.author.id;

                const cancelOption = msg.createReactionCollector(cancelFilter, {max: 1, time: 60000 });
                const mythicOption = msg.createReactionCollector(mythicFilter, {max: 1, time: 60000 });
                const ultimateOption = msg.createReactionCollector(ultimateFilter, {max: 1, time: 60000 });
                const legendaryOption = msg.createReactionCollector(legendaryFilter, {max: 1, time: 60000 });
                const epicOption = msg.createReactionCollector(epicFilter, {max: 1, time: 60000 });
                const superiorOption = msg.createReactionCollector(superiorFilter, {max: 1, time: 60000 });
                const deluxeOption = msg.createReactionCollector(deluxeFilter, {max: 1, time: 60000 });
                const commonOption = msg.createReactionCollector(commonFilter, {max: 1, time: 60000 });

                cancelOption.on('collect', r => {
                    msg.delete();
                    message.reply('giveaway cancelled.')
                });
                cancelOption.on('end', collected => {
                    if (!msg) {

                    } else {
                        msg.clearReactions();
                    }
                    
                })
                mythicOption.on('collect', r => {
                    client.selectPose = sql.prepare(`SELECT * FROM trophies_poses WHERE price = ?`);
                    var selectPose = sql.prepare(`SELECT * FROM trophies_poses WHERE price = ?`);
                    var posesArray = [];
                    var posesAmount = 0;
                    for (var row of selectPose.all(10000)){
                        posesArray.push(row.alias);
                        posesAmount++;
                
                    }
                    var poseRoll = Math.floor(Math.random() * posesAmount);
                    client.getPoseFromAlias = sql.prepare(`SELECT * FROM trophies_poses WHERE alias = ?`);
                    var getPoseFromAlias = client.getPoseFromAlias.get(posesArray[poseRoll]).name;
                    var getChampionName = client.getPoseFromAlias.get(posesArray[poseRoll]).champion;
                    var trophyIcon = client.getPoseFromAlias.get(posesArray[poseRoll]).imgurLink
                    client.getPoseAmount = sql.prepare(`SELECT ${getPoseFromAlias} FROM ${getChampionName}_poses WHERE userID = ?`);
                    var getPoseAmount1 = client.getPoseAmount.get(message.mentions.members.first().user.id);
                    var poseAmount2 = Object.values(getPoseAmount1);
                    var actualAmount = poseAmount2[0]
                    var newNumber = actualAmount + 1
    
                    client.addTrophy = sql.prepare(`UPDATE ${getChampionName}_poses SET ${getPoseFromAlias} = ${newNumber} WHERE userID = '${message.mentions.members.first().user.id}'`).run();
                    msg.delete();

                    var giveawayResultEmbed = new Discord.RichEmbed()
                    .addField(`Unboxing`, `**${message.mentions.members.first().user.tag}** received **${posesArray[poseRoll]}** from the giveaway.`)
                    .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL}`)
                    .setColor("#A31F9F")
                    .setThumbnail(trophyIcon)
                    .setTimestamp(new Date());
                    client.channels.get('487230070763552768').send(giveawayResultEmbed);
                    message.channel.send(giveawayResultEmbed);
                })

                ultimateOption.on('collect', r => {
                    client.selectPose = sql.prepare(`SELECT * FROM trophies_poses WHERE price = ?`);
                    var selectPose = sql.prepare(`SELECT * FROM trophies_poses WHERE price = ?`);
                    var posesArray = [];
                    var posesAmount = 0;
                    for (var row of selectPose.all(3250)){
                        posesArray.push(row.alias);
                        posesAmount++;
                
                    }
                    var poseRoll = Math.floor(Math.random() * posesAmount);
                    client.getPoseFromAlias = sql.prepare(`SELECT * FROM trophies_poses WHERE alias = ?`);
                    var getPoseFromAlias = client.getPoseFromAlias.get(posesArray[poseRoll]).name;
                    var getChampionName = client.getPoseFromAlias.get(posesArray[poseRoll]).champion;
                    var trophyIcon = client.getPoseFromAlias.get(posesArray[poseRoll]).imgurLink
                    client.getPoseAmount = sql.prepare(`SELECT ${getPoseFromAlias} FROM ${getChampionName}_poses WHERE userID = ?`);
                    var getPoseAmount1 = client.getPoseAmount.get(message.mentions.members.first().user.id);
                    var poseAmount2 = Object.values(getPoseAmount1);
                    var actualAmount = poseAmount2[0]
                    var newNumber = actualAmount + 1
    
                    client.addTrophy = sql.prepare(`UPDATE ${getChampionName}_poses SET ${getPoseFromAlias} = ${newNumber} WHERE userID = '${message.mentions.members.first().user.id}'`).run();
                    msg.delete();

                    var giveawayResultEmbed = new Discord.RichEmbed()
                    .addField(`Unboxing`, `**${message.mentions.members.first().user.tag}** received **${posesArray[poseRoll]}** from the giveaway.`)
                    .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL}`)
                    .setColor("#F9961A")
                    .setThumbnail(trophyIcon)
                    .setTimestamp(new Date());
                    client.channels.get('487230070763552768').send(giveawayResultEmbed);
                    message.channel.send(giveawayResultEmbed);
                })

                legendaryOption.on('collect', r => {
                    client.selectPose = sql.prepare(`SELECT * FROM trophies_poses WHERE price = ?`);
                    var selectPose = sql.prepare(`SELECT * FROM trophies_poses WHERE price = ?`);
                    var posesArray = [];
                    var posesAmount = 0;
                    for (var row of selectPose.all(1820)){
                        posesArray.push(row.alias);
                        posesAmount++;
                
                    }
                    var poseRoll = Math.floor(Math.random() * posesAmount);
                    client.getPoseFromAlias = sql.prepare(`SELECT * FROM trophies_poses WHERE alias = ?`);
                    var getPoseFromAlias = client.getPoseFromAlias.get(posesArray[poseRoll]).name;
                    var getChampionName = client.getPoseFromAlias.get(posesArray[poseRoll]).champion;
                    var trophyIcon = client.getPoseFromAlias.get(posesArray[poseRoll]).imgurLink
                    client.getPoseAmount = sql.prepare(`SELECT ${getPoseFromAlias} FROM ${getChampionName}_poses WHERE userID = ?`);
                    var getPoseAmount1 = client.getPoseAmount.get(message.mentions.members.first().user.id);
                    var poseAmount2 = Object.values(getPoseAmount1);
                    var actualAmount = poseAmount2[0]
                    var newNumber = actualAmount + 1
    
                    client.addTrophy = sql.prepare(`UPDATE ${getChampionName}_poses SET ${getPoseFromAlias} = ${newNumber} WHERE userID = '${message.mentions.members.first().user.id}'`).run();
                    msg.delete();

                    var giveawayResultEmbed = new Discord.RichEmbed()
                    .addField(`Unboxing`, `**${message.mentions.members.first().user.tag}** received **${posesArray[poseRoll]}** from the giveaway.`)
                    .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL}`)
                    .setColor("#FA0912")
                    .setThumbnail(trophyIcon)
                    .setTimestamp(new Date());
                    client.channels.get('487230070763552768').send(giveawayResultEmbed);
                    message.channel.send(giveawayResultEmbed);
                })

                epicOption.on('collect', r => {
                    client.selectPose = sql.prepare(`SELECT * FROM trophies_poses WHERE price = ?`);
                    var selectPose = sql.prepare(`SELECT * FROM trophies_poses WHERE price = ?`);
                    var posesArray = [];
                    var posesAmount = 0;
                    for (var row of selectPose.all(1350)){
                        posesArray.push(row.alias);
                        posesAmount++;
                
                    }
                    var poseRoll = Math.floor(Math.random() * posesAmount);
                    client.getPoseFromAlias = sql.prepare(`SELECT * FROM trophies_poses WHERE alias = ?`);
                    var getPoseFromAlias = client.getPoseFromAlias.get(posesArray[poseRoll]).name;
                    var getChampionName = client.getPoseFromAlias.get(posesArray[poseRoll]).champion;
                    var trophyIcon = client.getPoseFromAlias.get(posesArray[poseRoll]).imgurLink
                    client.getPoseAmount = sql.prepare(`SELECT ${getPoseFromAlias} FROM ${getChampionName}_poses WHERE userID = ?`);
                    var getPoseAmount1 = client.getPoseAmount.get(message.mentions.members.first().user.id);
                    var poseAmount2 = Object.values(getPoseAmount1);
                    var actualAmount = poseAmount2[0]
                    var newNumber = actualAmount + 1
    
                    client.addTrophy = sql.prepare(`UPDATE ${getChampionName}_poses SET ${getPoseFromAlias} = ${newNumber} WHERE userID = '${message.mentions.members.first().user.id}'`).run();
                    msg.delete();

                    var giveawayResultEmbed = new Discord.RichEmbed()
                    .addField(`Unboxing`, `**${message.mentions.members.first().user.tag}** received **${posesArray[poseRoll]}** from the giveaway.`)
                    .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL}`)
                    .setColor("#01F4ED")
                    .setThumbnail(trophyIcon)
                    .setTimestamp(new Date());
                    client.channels.get('487230070763552768').send(giveawayResultEmbed);
                    message.channel.send(giveawayResultEmbed);
                })

                superiorOption.on('collect', r => {
                    client.selectPose = sql.prepare(`SELECT * FROM trophies_poses WHERE price = ?`);
                    var selectPose = sql.prepare(`SELECT * FROM trophies_poses WHERE price = ?`);
                    var posesArray = [];
                    var posesAmount = 0;
                    for (var row of selectPose.all(975)){
                        posesArray.push(row.alias);
                        posesAmount++;
                
                    }
                    var poseRoll = Math.floor(Math.random() * posesAmount);
                    client.getPoseFromAlias = sql.prepare(`SELECT * FROM trophies_poses WHERE alias = ?`);
                    var getPoseFromAlias = client.getPoseFromAlias.get(posesArray[poseRoll]).name;
                    var getChampionName = client.getPoseFromAlias.get(posesArray[poseRoll]).champion;
                    var trophyIcon = client.getPoseFromAlias.get(posesArray[poseRoll]).imgurLink
                    client.getPoseAmount = sql.prepare(`SELECT ${getPoseFromAlias} FROM ${getChampionName}_poses WHERE userID = ?`);
                    var getPoseAmount1 = client.getPoseAmount.get(message.mentions.members.first().user.id);
                    var poseAmount2 = Object.values(getPoseAmount1);
                    var actualAmount = poseAmount2[0]
                    var newNumber = actualAmount + 1
    
                    client.addTrophy = sql.prepare(`UPDATE ${getChampionName}_poses SET ${getPoseFromAlias} = ${newNumber} WHERE userID = '${message.mentions.members.first().user.id}'`).run();
                    msg.delete();

                    var giveawayResultEmbed = new Discord.RichEmbed()
                    .addField(`Unboxing`, `**${message.mentions.members.first().user.tag}** received **${posesArray[poseRoll]}** from the giveaway.`)
                    .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL}`)
                    .setColor("#0074D9")
                    .setThumbnail(trophyIcon)
                    .setTimestamp(new Date());
                    client.channels.get('487230070763552768').send(giveawayResultEmbed);
                    message.channel.send(giveawayResultEmbed);
                })

                deluxeOption.on('collect', r => {
                    client.selectPose = sql.prepare(`SELECT * FROM trophies_poses WHERE price = ?`);
                    var selectPose = sql.prepare(`SELECT * FROM trophies_poses WHERE price = ?`);
                    var posesArray = [];
                    var posesAmount = 0;
                    for (var row of selectPose.all(750)){
                        posesArray.push(row.alias);
                        posesAmount++;
                
                    }
                    var poseRoll = Math.floor(Math.random() * posesAmount);
                    client.getPoseFromAlias = sql.prepare(`SELECT * FROM trophies_poses WHERE alias = ?`);
                    var getPoseFromAlias = client.getPoseFromAlias.get(posesArray[poseRoll]).name;
                    var getChampionName = client.getPoseFromAlias.get(posesArray[poseRoll]).champion;
                    var trophyIcon = client.getPoseFromAlias.get(posesArray[poseRoll]).imgurLink
                    client.getPoseAmount = sql.prepare(`SELECT ${getPoseFromAlias} FROM ${getChampionName}_poses WHERE userID = ?`);
                    var getPoseAmount1 = client.getPoseAmount.get(message.mentions.members.first().user.id);
                    var poseAmount2 = Object.values(getPoseAmount1);
                    var actualAmount = poseAmount2[0]
                    var newNumber = actualAmount + 1
    
                    client.addTrophy = sql.prepare(`UPDATE ${getChampionName}_poses SET ${getPoseFromAlias} = ${newNumber} WHERE userID = '${message.mentions.members.first().user.id}'`).run();
                    msg.delete();

                    var giveawayResultEmbed = new Discord.RichEmbed()
                    .addField(`Unboxing`, `**${message.mentions.members.first().user.tag}** received **${posesArray[poseRoll]}** from the giveaway.`)
                    .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL}`)
                    .setColor("#2ECC40")
                    .setThumbnail(trophyIcon)
                    .setTimestamp(new Date());
                    client.channels.get('487230070763552768').send(giveawayResultEmbed);
                    message.channel.send(giveawayResultEmbed);
                })

                commonOption.on('collect', r => {
                    client.selectPose = sql.prepare(`SELECT * FROM trophies_poses WHERE price = ?`);
                    var selectPose = sql.prepare(`SELECT * FROM trophies_poses WHERE price = ?`);
                    var posesArray = [];
                    var posesAmount = 0;
                    for (var row of selectPose.all(520)){
                        posesArray.push(row.alias);
                        posesAmount++;
                
                    }
                    var poseRoll = Math.floor(Math.random() * posesAmount);
                    client.getPoseFromAlias = sql.prepare(`SELECT * FROM trophies_poses WHERE alias = ?`);
                    var getPoseFromAlias = client.getPoseFromAlias.get(posesArray[poseRoll]).name;
                    var getChampionName = client.getPoseFromAlias.get(posesArray[poseRoll]).champion;
                    var trophyIcon = client.getPoseFromAlias.get(posesArray[poseRoll]).imgurLink
                    client.getPoseAmount = sql.prepare(`SELECT ${getPoseFromAlias} FROM ${getChampionName}_poses WHERE userID = ?`);
                    var getPoseAmount1 = client.getPoseAmount.get(message.mentions.members.first().user.id);
                    var poseAmount2 = Object.values(getPoseAmount1);
                    var actualAmount = poseAmount2[0]
                    var newNumber = actualAmount + 1
    
                    client.addTrophy = sql.prepare(`UPDATE ${getChampionName}_poses SET ${getPoseFromAlias} = ${newNumber} WHERE userID = '${message.mentions.members.first().user.id}'`).run();
                    msg.delete();

                    var giveawayResultEmbed = new Discord.RichEmbed()
                    .addField(`Unboxing`, `**${message.mentions.members.first().user.tag}** received **${posesArray[poseRoll]}** from the giveaway.`)
                    .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL}`)
                    .setColor("#4F545C")
                    .setThumbnail(trophyIcon)
                    .setTimestamp(new Date());
                    client.channels.get('487230070763552768').send(giveawayResultEmbed);
                    message.channel.send(giveawayResultEmbed);
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
  name: "give",
  category: "Database",
  description: "Give a random pose to someone.",
  usage: "give @member <pose name>"
};
