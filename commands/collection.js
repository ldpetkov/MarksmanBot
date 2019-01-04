const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');
exports.run = async (client, message, args, level) => {
    var collectionTargetID;
    var collectionTarget;
    var collectionTargetAvatar;
    if(!message.mentions.users.first()){
        collectionTargetID = message.author.id;
        collectionTarget = message.author.username;
        collectionTargetAvatar = message.author.displayAvatarURL;
    } else {
        collectionTargetID = message.mentions.users.first().id;
        collectionTarget = message.mentions.users.first().username;
        collectionTargetAvatar = message.mentions.users.first().displayAvatarURL;
    }
    client.getProfile = sql.prepare(`SELECT * FROM profiles WHERE userID = ?`);
    var getProfile = client.getProfile.get(collectionTargetID);
    if (!getProfile){
        message.reply(`I don't have a profile set up for ${collectionTarget}. To set it up, that users needs to run the \`\`.setup\`\` command.`);
    } else {
        client.getAllPoses = sql.prepare(`SELECT * FROM trophies_poses`);
        var getPosesByPrice = sql.prepare(`SELECT * FROM trophies_poses WHERE price = ?`);

        var getAllposes = sql.prepare(`SELECT * FROM trophies_poses`);
        var totalPoses = 0;
        var uniqueCollected = 0;
        var totalCollectedPoses = 0;
        var poseTotalValue = 0;
        for (var row of getAllposes.all()){
            client.getAPose = sql.prepare(`SELECT ${row.name} FROM ${row.champion}_poses WHERE userID = ?`);
            var getAPose = client.getAPose.get(collectionTargetID);
            var poseAmount = Object.values(getAPose);
            var amountInt = parseInt(poseAmount);
            if(poseAmount > 0){
                uniqueCollected++;
                totalCollectedPoses = totalCollectedPoses + amountInt;
                client.getPosePrice = sql.prepare(`SELECT * FROM trophies_poses WHERE name = ?`);
                var getPosePrice = client.getPosePrice.get(row.name).price;
                for(i = 0; i < poseAmount; i++){
                    poseTotalValue = poseTotalValue + getPosePrice;
                }
                
            }
            totalPoses++;
        }
        var onePercent = totalPoses/100;
        var currentPercent = Math.round(uniqueCollected/onePercent);


        var mythicUniqueCollected = 0;
        var totalMythicPoses = 0;
        for (var row of getPosesByPrice.all(10000)){
            client.getAPose = sql.prepare(`SELECT ${row.name} FROM ${row.champion}_poses WHERE userID = ?`);
            var getAPose = client.getAPose.get(collectionTargetID);
            var poseAmount = Object.values(getAPose);
            var amountInt = parseInt(poseAmount);
            if(poseAmount > 0){
                mythicUniqueCollected++;
            }
            totalMythicPoses++;
        }
        var mythicOnePercent = totalMythicPoses/100;
        var mythicCurrentPercent = Math.round(mythicUniqueCollected/mythicOnePercent);

        var ultimateUniqueCollected = 0;
        var totalUltimatePoses = 0;
        for (var row of getPosesByPrice.all(3250)){
            client.getAPose = sql.prepare(`SELECT ${row.name} FROM ${row.champion}_poses WHERE userID = ?`);
            var getAPose = client.getAPose.get(collectionTargetID);
            var poseAmount = Object.values(getAPose);
            var amountInt = parseInt(poseAmount);
            if(poseAmount > 0){
                ultimateUniqueCollected++;
            }
            totalUltimatePoses++;
        }
        var ultimateOnePercent = totalUltimatePoses/100;
        var ultimateCurrentPercent = Math.round(ultimateUniqueCollected/ultimateOnePercent);

        var legendaryUniqueCollected = 0;
        var totalLegendaryPoses = 0;
        for (var row of getPosesByPrice.all(1820)){
            client.getAPose = sql.prepare(`SELECT ${row.name} FROM ${row.champion}_poses WHERE userID = ?`);
            var getAPose = client.getAPose.get(collectionTargetID);
            var poseAmount = Object.values(getAPose);
            var amountInt = parseInt(poseAmount);
            if(poseAmount > 0){
                legendaryUniqueCollected++;
            }
            totalLegendaryPoses++;
        }
        var legendaryOnePercent = totalLegendaryPoses/100;
        var legendaryCurrentPercent = Math.round(legendaryUniqueCollected/legendaryOnePercent);

        var epicUniqueCollected = 0;
        var totalEpicPoses = 0;
        for (var row of getPosesByPrice.all(1350)){
            client.getAPose = sql.prepare(`SELECT ${row.name} FROM ${row.champion}_poses WHERE userID = ?`);
            var getAPose = client.getAPose.get(collectionTargetID);
            var poseAmount = Object.values(getAPose);
            var amountInt = parseInt(poseAmount);
            if(poseAmount > 0){
                epicUniqueCollected++;
            }
            totalEpicPoses++;
        }
        var epicOnePercent = totalEpicPoses/100;
        var epicCurrentPercent = Math.round(epicUniqueCollected/epicOnePercent);

        var superiorUniqueCollected = 0;
        var totalSuperiorPoses = 0;
        for (var row of getPosesByPrice.all(975)){
            client.getAPose = sql.prepare(`SELECT ${row.name} FROM ${row.champion}_poses WHERE userID = ?`);
            var getAPose = client.getAPose.get(collectionTargetID);
            var poseAmount = Object.values(getAPose);
            var amountInt = parseInt(poseAmount);
            if(poseAmount > 0){
                superiorUniqueCollected++;
            }
            totalSuperiorPoses++;
        }
        var superiorOnePercent = totalSuperiorPoses/100;
        var superiorCurrentPercent = Math.round(superiorUniqueCollected/superiorOnePercent);

        var deluxeUniqueCollected = 0;
        var totalDeluxePoses = 0;
        for (var row of getPosesByPrice.all(750)){
            client.getAPose = sql.prepare(`SELECT ${row.name} FROM ${row.champion}_poses WHERE userID = ?`);
            var getAPose = client.getAPose.get(collectionTargetID);
            var poseAmount = Object.values(getAPose);
            var amountInt = parseInt(poseAmount);
            if(poseAmount > 0){
                deluxeUniqueCollected++;
            }
            totalDeluxePoses++;
        }
        var deluxeOnePercent = totalDeluxePoses/100;
        var deluxeCurrentPercent = Math.round(deluxeUniqueCollected/deluxeOnePercent);

        var commonUniqueCollected = 0;
        var totalCommonPoses = 0;
        for (var row of getPosesByPrice.all(520)){
            client.getAPose = sql.prepare(`SELECT ${row.name} FROM ${row.champion}_poses WHERE userID = ?`);
            var getAPose = client.getAPose.get(collectionTargetID);
            var poseAmount = Object.values(getAPose);
            var amountInt = parseInt(poseAmount);
            if(poseAmount > 0){
                commonUniqueCollected++;
            }
            totalCommonPoses++;
        }
        var commonOnePercent = totalCommonPoses/100;
        var commonCurrentPercent = Math.round(commonUniqueCollected/commonOnePercent);




        collectionEmbed = new Discord.RichEmbed()
        .setAuthor(collectionTarget, collectionTargetAvatar)
        .setTitle(`${collectionTarget}'s collection.`)
        .setColor('#FF851B')
        .setDescription(`Unique poses collected: ${uniqueCollected}/${totalPoses} (${currentPercent}%)
        <:mythic:496077876852948993> Mythic: ${mythicUniqueCollected}/${totalMythicPoses} (${mythicCurrentPercent}%)
        <:ultimate:496077877087830030> Ultimate: ${ultimateUniqueCollected}/${totalUltimatePoses} (${ultimateCurrentPercent}%)
        <:legendary:496077876974583834> Legendary: ${legendaryUniqueCollected}/${totalLegendaryPoses} (${legendaryCurrentPercent}%)
        <:epic:496077877154938880> Epic: ${epicUniqueCollected}/${totalEpicPoses} (${epicCurrentPercent}%)
        <:superior:496088854025994240> Superior: ${superiorUniqueCollected}/${totalSuperiorPoses} (${superiorCurrentPercent}%)
        <:deluxe:496088854185377793> Deluxe: ${deluxeUniqueCollected}/${totalDeluxePoses} (${deluxeCurrentPercent}%)
        <:common:496088854223257601> Common: ${commonUniqueCollected}/${totalCommonPoses} (${commonCurrentPercent}%)
        \nTotal poses collected: ${totalCollectedPoses}`)
        .setFooter(`Profile value: ${poseTotalValue} RP`)
        message.channel.send(collectionEmbed)
    }
    



};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "collection",
  category: "Database",
  description: "View your collection completion.",
  usage: "collection"
};
