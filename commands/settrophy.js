const Discord = require("discord.js");
var path=require('path');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');

exports.run = async (client, message, args, level) => {
    client.getProfile = sql.prepare('SELECT * FROM profiles WHERE userID = ?');
    let profileInfo = client.getProfile.get(`${message.author.id}`);
 if (!profileInfo) {
   message.reply(`you don't have a profile set up. To set it up, run the \`\`.setup\`\` command.`);
 } else {
    var getSavingStatus = client.getProfile.get(`${message.author.id}`).currentlySaving;
    if (getSavingStatus == 1){
        message.reply('that profile is currently being saved, please wait.');
    } else {
        if(!args[0]){
            var reactionArray = [
                ':one:487249300183711745',
                ':two:487249300338769931',
                ':three:487249300678639656',
                ':four:487249300594884610',
                ':five:487249300301283329',
                ':six:487249300414267392',
                ':seven:487249300414398475',
                ':eight:487249300372455425',
                ':nine:487249300385038338',
                ':ten:487249300569587722'
              ]
              
              client.getChampionsFromName = sql.prepare('SELECT * FROM trophies_champions WHERE name = ?'); //GET CHAMPIONS FROM NAME
              client.getChampionsFromAlias = sql.prepare('SELECT * FROM trophies_champions WHERE alias = ?'); //GET CHAMPIONS FROM ALIAS
              client.getSkinsFromName = sql.prepare(`SELECT * FROM trophies_skins WHERE name = ?`); //GET SKINS FROM NAME
              client.getPosesFromName = sql.prepare(`SELECT * FROM trophies_poses WHERE name = ?`); //GET POSES FROM NAME
              client.getPosesFromChampion = sql.prepare('SELECT * FROM trophies_poses WHERE champion = ?'); //GET POSES FROM CHAMPION
              client.getPosesFromSkinName = sql.prepare(`SELECT * FROM trophies_poses WHERE skin = ?`); //GET POSES FROM SKIN
              client.getSkinsFromAlias = sql.prepare(`SELECT * FROM trophies_skins WHERE alias = ?`); //GET SKINS FROM ALIAS
              client.getPosesFromAlias = sql.prepare(`SELECT * FROM trophies_poses WHERE alias = ?`);
        
              var getChampions = sql.prepare(`SELECT * FROM trophies_champions ORDER BY name`); //GET EVERYTHING FROM TROPHIES_CHAMPIONS
              var getSkinsFromChampionName = sql.prepare(`SELECT * FROM trophies_skins WHERE champion = ?`); //GET SKINS FROM NAME
              var getPosesFromSkinName = sql.prepare(`SELECT * FROM trophies_poses WHERE skin = ?`); //GET POSES FROM SKIN NAME
              var championArray = [];
              var championArrayWithShards = [];
              var localSum = 0;
              var championNumber = -1;
              var currentChampion;
              for (var row of getChampions.all()) {
                championNumber++;
                if (championNumber > 9){
                    championNumber = 0
                  }
                  localSum = 0;
                  currentChampion = row.name;
                  var getPoses = sql.prepare(`SELECT * FROM trophies_poses WHERE champion = ?`);
                  for (var rows of getPoses.all(currentChampion)){
              
                    client.getPoses2 = sql.prepare(`SELECT ${rows.name} from ${currentChampion}_poses WHERE userID = ?`);
                    var getPoses2 = client.getPoses2.get(`${message.author.id}`);
                    localSum = parseInt(Object.values(getPoses2)) + localSum;
                  }
                championArray.push(`${row.alias}`);
                championArrayWithShards.push(`<${reactionArray[championNumber]}> ${row.alias} - ${localSum}`);
        
            }
        
            //PAGINATION SETTINGS
            var numberPerPage = 10;
            //PAGINATION FOR CHAMPIONS
        
            var championPageList = new Array();
            var championPageListWithShards = new Array();
            var championCurrentPage = 1;
            var championNumberOfPages = Math.ceil(championArray.length / numberPerPage);
            var championBegin = ((championCurrentPage - 1) * numberPerPage);
            var championEnd = championBegin + numberPerPage;
            championPageList = championArray.slice(championBegin, championEnd);
            championPageListWithShards = championArrayWithShards.slice(championBegin, championEnd);
            //PAGINATION FOR SKINS
        
            //PAGINATION FOR POSES
              
            
            let championsEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            // .setTitle('Champion Name - Shard count.')
            // .addField('Champion name', championArray, true)
            // .addField('Shard count', championArrayWithShards, true)
            .setColor('#56B48C')
            .setDescription(championPageListWithShards)
            .setFooter(`Page ${championCurrentPage}/${championNumberOfPages}`);
            message.channel.send(championsEmbed).then( msg => {
            msg.react(`:left:487251275973525528`).then (r => {
              msg.react(`:right:487252304064413697`).then ( r => {
                msg.react(`:up:487254692510826505`).then( r => {
                    let chain = Promise.resolve();
                    for (let i = 0; i < championPageList.length; i++) {
                      chain = chain.then(() => msg.react(reactionArray[i]));
                      
                    }
                })
            });
            });
            const leftFilter = (reaction, user) => reaction.emoji.identifier === `left:487251275973525528` && user.id === message.author.id;
            const rightFilter = (reaction, user) => reaction.emoji.identifier === `right:487252304064413697` && user.id === message.author.id;
            const upFilter = (reaction, user) => reaction.emoji.identifier === `up:487254692510826505` && user.id === message.author.id;
            const firstFilter = (reaction, user) => reaction.emoji.identifier === `one:487249300183711745` && user.id === message.author.id;
            const secondFilter = (reaction, user) => reaction.emoji.identifier === `two:487249300338769931` && user.id === message.author.id;
            const thirdFilter = (reaction, user) => reaction.emoji.identifier === `three:487249300678639656` && user.id === message.author.id;
            const fourthFilter = (reaction, user) => reaction.emoji.identifier === `four:487249300594884610` && user.id === message.author.id;
            const fifthFilter = (reaction, user) => reaction.emoji.identifier === `five:487249300301283329` && user.id === message.author.id;
            const sixthFilter = (reaction, user) => reaction.emoji.identifier === `six:487249300414267392` && user.id === message.author.id;
            const seventFilter = (reaction, user) => reaction.emoji.identifier === `seven:487249300414398475` && user.id === message.author.id;
            const eighthFilter = (reaction, user) => reaction.emoji.identifier === `eight:487249300372455425` && user.id === message.author.id;
            const ninthFilter = (reaction, user) => reaction.emoji.identifier === `nine:487249300385038338` && user.id === message.author.id;
            const tenthFilter = (reaction, user) => reaction.emoji.identifier === `ten:487249300569587722` && user.id === message.author.id;
        
            const leftOption = msg.createReactionCollector(leftFilter, {time: 60000 });
            const rightOption = msg.createReactionCollector(rightFilter, {time: 60000});
            const upOption = msg.createReactionCollector(upFilter, {time: 60000});
            const firstOption = msg.createReactionCollector(firstFilter, {time: 60000});
            const secondOption = msg.createReactionCollector(secondFilter, {time: 60000});
            const thirdOption = msg.createReactionCollector(thirdFilter, {time: 60000});
            const fourthOption = msg.createReactionCollector(fourthFilter, {time: 60000});
            const fifthOption = msg.createReactionCollector(fifthFilter, {time: 60000});
            const sixthOption = msg.createReactionCollector(sixthFilter, {time: 60000});
            const seventhOption = msg.createReactionCollector(seventFilter, {time: 60000});
            const eighthOption = msg.createReactionCollector(eighthFilter, {time: 60000});
            const ninthOption = msg.createReactionCollector(ninthFilter, {time: 60000});
            const tenthOption = msg.createReactionCollector(tenthFilter, {time: 60000});
            var levelSwitch = 0;
            var championAlias;
            var championName;
            var skinArray = [];
            var firstSkinPageList = new Array();
            var firstSkinPageListWithShards = new Array();
            var firstSkinCurrentPage;
            var firstSkinNumberOfPages;
            var firstSkinBegin;
            var firstSkinEnd;
        
            var skinAlias;
            var skinName;
            var poseArray = [];
            var firstPosePageList = new Array();
            var firstPoseCurrentPage;
            var firstPoseNumberOfPages;
            var firstPoseBegin;
            var firstPoseEnd;
        
            var poseName;
            var poseValue;
            
            var skinNumber;
            var currentSkin;
            var skinArrayWithShards = [];
            var skinLocalSum = 0;
        
            var poseArrayWithShards = [];
            var firstPosePageListWithShards = new Array;
        
            rightOption.on('collect', r => {
                if(levelSwitch == 0){
                    if (championCurrentPage == championNumberOfPages) {
                        r.remove(message.author.id);
                        return;
                    } else {
                    championCurrentPage++;
                    var championBegin = ((championCurrentPage - 1) * numberPerPage);
                    var championEnd = championBegin + numberPerPage;
            
                    championPageListWithShards = championArrayWithShards.slice(championBegin, championEnd);
                    championPageList = championArray.slice(championBegin, championEnd);
                    let championPaginationEmbedRight = new Discord.RichEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL)
                    .setColor('#56B48C')
                    .setDescription(championPageListWithShards)
                    .setFooter(`Page ${championCurrentPage}/${championNumberOfPages}`);
                    r.remove(message.author.id);
                    r.message.edit( {embed: championPaginationEmbedRight});
                    }
                } else if(levelSwitch == 1){
                    if (firstSkinCurrentPage == firstSkinNumberOfPages){
                        r.remove(message.author.id);
                        return;
                    } else {
                        firstSkinCurrentPage++;
                        var firstSkinBegin = ((firstSkinCurrentPage - 1) * numberPerPage);
                        var firstSkinEnd = firstSkinBegin + numberPerPage;
                        firstSkinPageListWithShards = skinArrayWithShards.slice(firstSkinBegin, firstSkinEnd);
                        firstSkinPageList = skinArray.slice(firstSkinBegin, firstSkinEnd);
                        let firtsSkinEmbedRight = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.displayAvatarURL)
                        .setTitle(championAlias)
                        .setColor('#56B48C')
                        .setDescription(firstSkinPageListWithShards)
                        .setFooter(`Page ${firstSkinCurrentPage}/${firstSkinNumberOfPages}`)
                        r.message.edit( {embed: firtsSkinEmbedRight});
                        r.remove(message.author.id);
                    }
                } else if(levelSwitch == 2){
                    if (firstPoseCurrentPage == firstPoseNumberOfPages){
                        r.remove(message.author.id);
                        return;
                    } else {
                        firstPoseCurrentPage++;
                        var firstPoseBegin = ((firstPoseCurrentPage - 1) * numberPerPage);
                        var firstPoseEnd = firstPoseBegin + numberPerPage;
                        firstPosePageList = poseArray.slice(firstPoseBegin, firstPoseEnd);
                        firstPosePageListWithShards = poseArrayWithShards.slice(firstPoseBegin, firstPoseEnd);
                        let firstPoseEmbedRight = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.displayAvatarURL)
                        .setTitle(skinAlias)
                        .setColor('#56B48C')
                        .setDescription(firstPosePageListWithShards)
                        .setFooter(`Page ${firstPoseCurrentPage}/${firstPoseNumberOfPages}`)
                        r.message.edit( {embed: firstPoseEmbedRight});
                        r.remove(message.author.id);
        
                    }
                }
                
            });
        
            leftOption.on('collect', r => {
                if(levelSwitch == 0){
                    if (championCurrentPage == 1) {
                        r.remove(message.author.id);
                        return;
                    } else {
                        championCurrentPage--;
                    var championBegin = ((championCurrentPage - 1) * numberPerPage);
                    var championEnd = championBegin + numberPerPage;
                    championPageList = championArray.slice(championBegin, championEnd);
                    championPageListWithShards = championArrayWithShards.slice(championBegin, championEnd);
                    let championPaginationEmbedLeft = new Discord.RichEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL)
                    .setColor('#56B48C')
                    .setDescription(championPageListWithShards)
                    .setFooter(`Page ${championCurrentPage}/${championNumberOfPages}`)
                    r.message.edit( {embed: championPaginationEmbedLeft});
                    r.remove(message.author.id);
                    }
                } else if(levelSwitch == 1){
                    if (firstSkinCurrentPage == 1){
                        r.remove(message.author.id);
                        return;
                    } else {
                        firstSkinCurrentPage--;
                        firstSkinBegin = ((firstSkinCurrentPage - 1) * numberPerPage);
                        var firstSkinEnd = firstSkinBegin + numberPerPage;
                        firstSkinPageListWithShards = skinArrayWithShards.slice(firstSkinBegin, firstSkinEnd);
                        firstSkinPageList = skinArray.slice(firstSkinBegin, firstSkinEnd);
                        let firstSkinEmbedLeft = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.displayAvatarURL)
                        .setTitle(championAlias)
                        .setColor('#56B48C')
                        .setDescription(firstSkinPageListWithShards)
                        .setFooter(`Page ${firstSkinCurrentPage}/${firstSkinNumberOfPages}`);
                        msg.edit ({embed : firstSkinEmbedLeft});
                        r.remove(message.author.id);
        
                    }
                } else if(levelSwitch == 2) {
                    if (firstPoseCurrentPage == 1) {
                        r.remove(message.author.id);
                        return;
                    } else {
                        firstPoseCurrentPage--;
                        firstPoseBegin = ((firstPoseCurrentPage - 1) * numberPerPage);
                        var firstPoseEnd = firstPoseBegin + numberPerPage;
                        firstPosePageList = poseArray.slice(firstPoseBegin, firstPoseEnd);
                        firstPosePageListWithShards = poseArrayWithShards.slice(firstPoseBegin, firstPoseEnd);
                        let firstPoseEmbedLeft = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.displayAvatarURL)
                        .setTitle(skinAlias)
                        .setColor('#56B48C')
                        .setDescription(firstPosePageListWithShards)
                        .setFooter(`Page ${firstPoseCurrentPage}/${firstPoseNumberOfPages}`);
                        msg.edit ({embed : firstPoseEmbedLeft});
                        r.remove(message.author.id);
        
                    }
                }
                
            });
        
            firstOption.on('collect', r => {
                if(!championPageList[0]){
                    message.reply('Error.');
                    r.remove(message.author.id);
                }   else if(levelSwitch == 0){
                        skinArray = [];
                        skinArrayWithShards = [];
                        reactNumber = 1;
                        r.remove(message.author.id);
                        levelSwitch++;
                        championAlias = championPageList[0];
                        championName = client.getChampionsFromAlias.get(championAlias).name;
                        for (var row of getSkinsFromChampionName.all(championName)) {
                            skinNumber++;
                            if (skinNumber > 9){
                                skinNumber = 0
                            }
                            skinLocalSum = 0;
                            currentSkin = row.name;
                            var getSkinsPoses = sql.prepare(`SELECT * FROM trophies_poses WHERE skin = ?`);
                            for (var rows of getSkinsPoses.all(currentSkin)){
                                client.getSkinAmount = sql.prepare(`SELECT ${rows.name} FROM ${championName}_poses WHERE userID = ?`)
                                var getSkinAmount = client.getSkinAmount.get(`${message.author.id}`)
                                skinLocalSum = parseInt(Object.values(getSkinAmount)) + skinLocalSum;
                            }
                            skinArray.push(`${row.alias}`);
                            skinArrayWithShards.push(`${row.alias} - ${skinLocalSum}`)
        
                        }
                        firstSkinCurrentPage = 1;
                        firstSkinNumberOfPages = Math.ceil(skinArray.length / numberPerPage);
                        firstSkinBegin = ((firstSkinCurrentPage - 1) * numberPerPage);
                        firstSkinEnd = firstSkinBegin + numberPerPage;
                        firstSkinPageList = skinArray.slice(firstSkinBegin, firstSkinEnd);
                        firstSkinPageListWithShards = skinArrayWithShards.slice(firstSkinBegin, firstSkinEnd);
                        var firstSkinEmbed = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.displayAvatarURL)
                        .setTitle(championAlias)
                        .setColor('#56B48C')
                        .setDescription(firstSkinPageListWithShards)
                        .setFooter(`Page ${firstSkinCurrentPage}/${firstSkinNumberOfPages}`)
                        msg.edit ({embed : firstSkinEmbed})
        
                        } else if(levelSwitch == 1){
                            if(!firstSkinPageList[0]){
                                r.remove(message.author.id);
                                message.reply('skin not found.');
                            } else {
                                r.remove(message.author.id);
                                levelSwitch++;
                                skinAlias = firstSkinPageList[0];
                                skinName = client.getSkinsFromAlias.get(skinAlias).name;
                                for (var row of getPosesFromSkinName.all(skinName)){
                                    client.getPosesQuantity = sql.prepare(`SELECT ${row.name} FROM ${championName}_poses WHERE userID = ?`);
                                    poseArray.push(`${row.alias}`);
                                    poseArrayWithShards.push(`${row.alias} - ${Object.values(client.getPosesQuantity.get(`${message.author.id}`))}`);
                                }
                                firstPoseCurrentPage = 1;
                                firstPoseNumberOfPages = Math.ceil(poseArray.length / numberPerPage);
                                firstPoseBegin = ((firstPoseCurrentPage - 1) * numberPerPage);
                                firstPoseEnd = firstPoseBegin + numberPerPage;
                                firstPosePageList = poseArray.slice(firstPoseBegin, firstPoseEnd);
                                firstPosePageListWithShards = poseArrayWithShards.slice(firstPoseBegin, firstPoseEnd);
                                let firstPoseEmbed = new Discord.RichEmbed()
                                .setAuthor(message.author.username, message.author.displayAvatarURL)
                                .setTitle(skinAlias)
                                .setColor('#56B48C')
                                .setDescription(firstPosePageListWithShards)
                                .setFooter(`Page ${firstPoseCurrentPage}/${firstPoseNumberOfPages}`)
                                msg.edit ({embed : firstPoseEmbed});
                            }    
                            } else if(levelSwitch == 2){
                                if(!firstPosePageList[0]){
                                    message.reply('pose not found');
                                    r.remove(message.author.id);
                                } else {
                                    getSavingStatus = client.getProfile.get(`${message.author.id}`).currentlySaving;
                                    if (getSavingStatus == 1){
                                    r.remove(message.author.id);
                                    message.reply('that profile is currently being saved, please wait.');
                                    } else {
                                    poseName = client.getPosesFromAlias.get(`${firstPosePageList[0]}`).name;
                                    client.getAmountOfPoses = sql.prepare(`SELECT ${poseName} FROM ${championName}_poses WHERE userID = ?`) //GET THE TOTAL AMOUNT OF POSES FOR A USER
                                    var getAmountOfPoses = client.getAmountOfPoses.get(message.author.id);
                                    poseValue = Object.values(getAmountOfPoses);
                                    var valueInt = parseInt(poseValue)
                                    if (valueInt < 1){
                                        r.remove(message.author.id);
                                        message.reply(`you don\'t have any **${firstPosePageList[0]}** pose shards.`);
                                    } else {
                                        client.setTrophy = sql.prepare(`UPDATE profiles SET trophyName = '${poseName}' WHERE userID = ${message.author.id}`).run();
                                        client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                                        r.message.delete();
                                        message.reply(`I've changed your trophy to **${firstPosePageList[0]}**.`);
                                    }
                                }
                                }
                                
                }
            });
        
            secondOption.on('collect', r => {
                if(levelSwitch == 0){
                    if(!championPageList[1]){
                        message.reply('Error.');
                        r.remove(message.author.id);
                    } else {
                        skinArray = [];
                        skinArrayWithShards = [];
                        reactNumber = 2;
                        r.remove(message.author.id);
                        levelSwitch++;
                        championAlias = championPageList[1];
                        championName = client.getChampionsFromAlias.get(championAlias).name;
                        for (var row of getSkinsFromChampionName.all(championName)) {
                            skinNumber++;
                            if (skinNumber > 9){
                                skinNumber = 0
                            }
                            skinLocalSum = 0;
                            currentSkin = row.name;
                            var getSkinsPoses = sql.prepare(`SELECT * FROM trophies_poses WHERE skin = ?`);
                            for (var rows of getSkinsPoses.all(currentSkin)){
                                client.getSkinAmount = sql.prepare(`SELECT ${rows.name} FROM ${championName}_poses WHERE userID = ?`)
                                var getSkinAmount = client.getSkinAmount.get(message.author.id)
                                skinLocalSum = parseInt(Object.values(getSkinAmount)) + skinLocalSum;
                            }
                            skinArray.push(`${row.alias}`);
                            skinArrayWithShards.push(`${row.alias} - ${skinLocalSum}`)
        
                        }
                        firstSkinCurrentPage = 1;
                        firstSkinNumberOfPages = Math.ceil(skinArray.length / numberPerPage);
                        firstSkinBegin = ((firstSkinCurrentPage - 1) * numberPerPage);
                        firstSkinEnd = firstSkinBegin + numberPerPage;
                        firstSkinPageList = skinArray.slice(firstSkinBegin, firstSkinEnd);
                        firstSkinPageListWithShards = skinArrayWithShards.slice(firstSkinBegin, firstSkinEnd);
                        var firstSkinEmbed = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.displayAvatarURL)
                        .setTitle(championAlias)
                        .setColor('#56B48C')
                        .setDescription(firstSkinPageListWithShards)
                        .setFooter(`Page ${firstSkinCurrentPage}/${firstSkinNumberOfPages}`)
                        msg.edit ({embed : firstSkinEmbed})
                    }
                        
        
                        } else if(levelSwitch == 1){
                            if(!firstSkinPageList[1]){
                                r.remove(message.author.id);
                                message.reply('skin not found.');
                            } else {
                                r.remove(message.author.id);
                                levelSwitch++;
                                skinAlias = firstSkinPageList[1];
                                skinName = client.getSkinsFromAlias.get(skinAlias).name;
                                for (var row of getPosesFromSkinName.all(skinName)){
                                    client.getPosesQuantity = sql.prepare(`SELECT ${row.name} FROM ${championName}_poses WHERE userID = ?`);
                                    poseArray.push(`${row.alias}`);
                                    poseArrayWithShards.push(`${row.alias} - ${Object.values(client.getPosesQuantity.get(message.author.id))}`);
                                }
                                firstPoseCurrentPage = 1;
                                firstPoseNumberOfPages = Math.ceil(poseArray.length / numberPerPage);
                                firstPoseBegin = ((firstPoseCurrentPage - 1) * numberPerPage);
                                firstPoseEnd = firstPoseBegin + numberPerPage;
                                firstPosePageList = poseArray.slice(firstPoseBegin, firstPoseEnd);
                        firstPosePageListWithShards = poseArrayWithShards.slice(firstPoseBegin, firstPoseEnd);
                                let firstPoseEmbed = new Discord.RichEmbed()
                                .setAuthor(message.author.username, message.author.displayAvatarURL)
                                .setTitle(skinAlias)
                                .setColor('#56B48C')
                                .setDescription(firstPosePageListWithShards)
                                .setFooter(`Page ${firstPoseCurrentPage}/${firstPoseNumberOfPages}`)
                                msg.edit ({embed : firstPoseEmbed});
                            }
                            } else if(levelSwitch == 2){
                                if(!firstPosePageList[1]){
                                    message.reply('pose not found');
                                    r.remove(message.author.id);
                                } else {
                                    getSavingStatus = client.getProfile.get(`${message.author.id}`).currentlySaving;
                                    if (getSavingStatus == 1){
                                    r.remove(message.author.id);
                                    message.reply('that profile is currently being saved, please wait.');
                                    } else {
                                    poseName = client.getPosesFromAlias.get(firstPosePageList[1]).name;
                                    client.getAmountOfPoses = sql.prepare(`SELECT ${poseName} FROM ${championName}_poses WHERE userID = ?`) //GET THE TOTAL AMOUNT OF POSES FOR A USER
                                    var getAmountOfPoses = client.getAmountOfPoses.get(message.author.id);
                                    poseValue = Object.values(getAmountOfPoses);
                                    var valueInt = parseInt(poseValue)
                                    if (valueInt < 1){
                                        message.reply(`you don\'t have any **${firstPosePageList[1]}** pose shards.`);
                                    } else {
                                        client.setTrophy = sql.prepare(`UPDATE profiles SET trophyName = '${poseName}' WHERE userID = ${message.author.id}`).run();
                                        client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                                        r.message.delete();
                                        message.reply(`I've changed your trophy to **${firstPosePageList[1]}**.`);
                                    }
                                }
                                }
                                
                }
            });
        
            thirdOption.on('collect', r => {
                   if(levelSwitch == 0){
                    if(!championPageList[2]){
                        message.reply('Error.');
                        r.remove(message.author.id);
                    } else {
                        skinArray = [];
                        skinArrayWithShards = [];
                        reactNumber = 3;
                        r.remove(message.author.id);
                        levelSwitch++;
                        championAlias = championPageList[2];
                        championName = client.getChampionsFromAlias.get(championAlias).name;
                        for (var row of getSkinsFromChampionName.all(championName)) {
                            skinNumber++;
                            if (skinNumber > 9){
                                skinNumber = 0
                            }
                            skinLocalSum = 0;
                            currentSkin = row.name;
                            var getSkinsPoses = sql.prepare(`SELECT * FROM trophies_poses WHERE skin = ?`);
                            for (var rows of getSkinsPoses.all(currentSkin)){
                                client.getSkinAmount = sql.prepare(`SELECT ${rows.name} FROM ${championName}_poses WHERE userID = ?`)
                                var getSkinAmount = client.getSkinAmount.get(message.author.id)
                                skinLocalSum = parseInt(Object.values(getSkinAmount)) + skinLocalSum;
                            }
                            skinArray.push(`${row.alias}`);
                            skinArrayWithShards.push(`${row.alias} - ${skinLocalSum}`)
        
                        }
                        firstSkinCurrentPage = 1;
                        firstSkinNumberOfPages = Math.ceil(skinArray.length / numberPerPage);
                        firstSkinBegin = ((firstSkinCurrentPage - 1) * numberPerPage);
                        firstSkinEnd = firstSkinBegin + numberPerPage;
                        firstSkinPageList = skinArray.slice(firstSkinBegin, firstSkinEnd);
                        firstSkinPageListWithShards = skinArrayWithShards.slice(firstSkinBegin, firstSkinEnd);
                        var firstSkinEmbed = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.displayAvatarURL)
                        .setTitle(championAlias)
                        .setColor('#56B48C')
                        .setDescription(firstSkinPageListWithShards)
                        .setFooter(`Page ${firstSkinCurrentPage}/${firstSkinNumberOfPages}`)
                        msg.edit ({embed : firstSkinEmbed})
                    }
                        
        
                        } else if(levelSwitch == 1){
                            if(!firstSkinPageList[2]){
                                r.remove(message.author.id);
                                message.reply('skin not found.');
                            } else {
                                r.remove(message.author.id);
                                levelSwitch++;
                                skinAlias = firstSkinPageList[2];
                                skinName = client.getSkinsFromAlias.get(skinAlias).name;
                                for (var row of getPosesFromSkinName.all(skinName)){
                                    client.getPosesQuantity = sql.prepare(`SELECT ${row.name} FROM ${championName}_poses WHERE userID = ?`);
                                    poseArray.push(`${row.alias}`);
                                    poseArrayWithShards.push(`${row.alias} - ${Object.values(client.getPosesQuantity.get(message.author.id))}`);
                                }
                                firstPoseCurrentPage = 1;
                                firstPoseNumberOfPages = Math.ceil(poseArray.length / numberPerPage);
                                firstPoseBegin = ((firstPoseCurrentPage - 1) * numberPerPage);
                                firstPoseEnd = firstPoseBegin + numberPerPage;
                                firstPosePageList = poseArray.slice(firstPoseBegin, firstPoseEnd);
                                firstPosePageListWithShards = poseArrayWithShards.slice(firstPoseBegin, firstPoseEnd);
                                let firstPoseEmbed = new Discord.RichEmbed()
                                .setAuthor(message.author.username, message.author.displayAvatarURL)
                                .setTitle(skinAlias)
                                .setColor('#56B48C')
                                .setDescription(firstPosePageListWithShards)
                                .setFooter(`Page ${firstPoseCurrentPage}/${firstPoseNumberOfPages}`)
                                msg.edit ({embed : firstPoseEmbed});
                            }
                            } else if(levelSwitch == 2){
                                if(!firstPosePageList[2]){
                                    message.reply('pose not found');
                                    r.remove(message.author.id);
                                } else {
                                    getSavingStatus = client.getProfile.get(`${message.author.id}`).currentlySaving;
                                    if (getSavingStatus == 1){
                                    r.remove(message.author.id);
                                    message.reply('that profile is currently being saved, please wait.');
                                    } else {
                                    poseName = client.getPosesFromAlias.get(firstPosePageList[2]).name;
                                    client.getAmountOfPoses = sql.prepare(`SELECT ${poseName} FROM ${championName}_poses WHERE userID = ?`) //GET THE TOTAL AMOUNT OF POSES FOR A USER
                                    var getAmountOfPoses = client.getAmountOfPoses.get(message.author.id);
                                    poseValue = Object.values(getAmountOfPoses);
                                    var valueInt = parseInt(poseValue)
                                    if (valueInt < 1){
                                        message.reply(`you don\'t have any **${firstPosePageList[2]}** pose shards.`);
                                    } else {
                                        client.setTrophy = sql.prepare(`UPDATE profiles SET trophyName = '${poseName}' WHERE userID = ${message.author.id}`).run();
                                        client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                                        r.message.delete();
                                        message.reply(`I've changed your trophy to **${firstPosePageList[2]}**.`);
                                    }
                                }
                                }
                                
                }
            });
            fourthOption.on('collect', r => {
                   if(levelSwitch == 0){
                    if(!championPageList[3]){
                        message.reply('Error.');
                        r.remove(message.author.id);
                    }   else {
                        skinArray = [];
                        skinArrayWithShards = [];
                        reactNumber = 4;
                        r.remove(message.author.id);
                        levelSwitch++;
                        championAlias = championPageList[3];
                        championName = client.getChampionsFromAlias.get(championAlias).name;
                        for (var row of getSkinsFromChampionName.all(championName)) {
                            skinNumber++;
                            if (skinNumber > 9){
                                skinNumber = 0
                            }
                            skinLocalSum = 0;
                            currentSkin = row.name;
                            var getSkinsPoses = sql.prepare(`SELECT * FROM trophies_poses WHERE skin = ?`);
                            for (var rows of getSkinsPoses.all(currentSkin)){
                                client.getSkinAmount = sql.prepare(`SELECT ${rows.name} FROM ${championName}_poses WHERE userID = ?`)
                                var getSkinAmount = client.getSkinAmount.get(message.author.id)
                                skinLocalSum = parseInt(Object.values(getSkinAmount)) + skinLocalSum;
                            }
                            skinArray.push(`${row.alias}`);
                            skinArrayWithShards.push(`${row.alias} - ${skinLocalSum}`)
        
                        }
                        firstSkinCurrentPage = 1;
                        firstSkinNumberOfPages = Math.ceil(skinArray.length / numberPerPage);
                        firstSkinBegin = ((firstSkinCurrentPage - 1) * numberPerPage);
                        firstSkinEnd = firstSkinBegin + numberPerPage;
                        firstSkinPageList = skinArray.slice(firstSkinBegin, firstSkinEnd);
                        firstSkinPageListWithShards = skinArrayWithShards.slice(firstSkinBegin, firstSkinEnd);
                        var firstSkinEmbed = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.displayAvatarURL)
                        .setTitle(championAlias)
                        .setColor('#56B48C')
                        .setDescription(firstSkinPageListWithShards)
                        .setFooter(`Page ${firstSkinCurrentPage}/${firstSkinNumberOfPages}`)
                        msg.edit ({embed : firstSkinEmbed})
                    }
                        
        
                        } else if(levelSwitch == 1){
                            if(!firstSkinPageList[3]){
                                r.remove(message.author.id);
                                message.reply('skin not found.');
                            } else {
                                r.remove(message.author.id);
                                levelSwitch++;
                                skinAlias = firstSkinPageList[3];
                                skinName = client.getSkinsFromAlias.get(skinAlias).name;
                                for (var row of getPosesFromSkinName.all(skinName)){
                                    client.getPosesQuantity = sql.prepare(`SELECT ${row.name} FROM ${championName}_poses WHERE userID = ?`);
                                    poseArray.push(`${row.alias}`);
                                    poseArrayWithShards.push(`${row.alias} - ${Object.values(client.getPosesQuantity.get(message.author.id))}`);
                                }
                                firstPoseCurrentPage = 1;
                                firstPoseNumberOfPages = Math.ceil(poseArray.length / numberPerPage);
                                firstPoseBegin = ((firstPoseCurrentPage - 1) * numberPerPage);
                                firstPoseEnd = firstPoseBegin + numberPerPage;
                                firstPosePageList = poseArray.slice(firstPoseBegin, firstPoseEnd);
                                firstPosePageListWithShards = poseArrayWithShards.slice(firstPoseBegin, firstPoseEnd);
                                let firstPoseEmbed = new Discord.RichEmbed()
                                .setAuthor(message.author.username, message.author.displayAvatarURL)
                                .setTitle(skinAlias)
                                .setColor('#56B48C')
                                .setDescription(firstPosePageListWithShards)
                                .setFooter(`Page ${firstPoseCurrentPage}/${firstPoseNumberOfPages}`)
                                msg.edit ({embed : firstPoseEmbed});
                            }
                            } else if(levelSwitch == 2){
                                if(!firstPosePageList[3]){
                                    message.reply('pose not found');
                                    r.remove(message.author.id);
                                } else {
                                    getSavingStatus = client.getProfile.get(`${message.author.id}`).currentlySaving;
                                    if (getSavingStatus == 1){
                                    r.remove(message.author.id);
                                    message.reply('that profile is currently being saved, please wait.');
                                    } else {
                                    poseName = client.getPosesFromAlias.get(firstPosePageList[3]).name;
                                    client.getAmountOfPoses = sql.prepare(`SELECT ${poseName} FROM ${championName}_poses WHERE userID = ?`) //GET THE TOTAL AMOUNT OF POSES FOR A USER
                                    var getAmountOfPoses = client.getAmountOfPoses.get(message.author.id);
                                    poseValue = Object.values(getAmountOfPoses);
                                    var valueInt = parseInt(poseValue)
                                    if (valueInt < 1){
                                        message.reply(`you don\'t have any **${firstPosePageList[3]}** pose shards.`);
                                    } else {
                                        client.setTrophy = sql.prepare(`UPDATE profiles SET trophyName = '${poseName}' WHERE userID = ${message.author.id}`).run();
                                        client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                                        r.message.delete();
                                        message.reply(`I've changed your trophy to **${firstPosePageList[3]}**.`);
                                    }
                                }
                                }
                                
                }
        
            });
            fifthOption.on('collect', r => {
                   if(levelSwitch == 0){
                    if(!championPageList[4]){
                        message.reply('Error.');
                        r.remove(message.author.id);
                    } else {
                        skinArray = [];
                        skinArrayWithShards = [];
                        reactNumber = 5;
                        r.remove(message.author.id);
                        levelSwitch++;
                        championAlias = championPageList[4];
                        championName = client.getChampionsFromAlias.get(championAlias).name;
                        for (var row of getSkinsFromChampionName.all(championName)) {
                            skinNumber++;
                            if (skinNumber > 9){
                                skinNumber = 0
                            }
                            skinLocalSum = 0;
                            currentSkin = row.name;
                            var getSkinsPoses = sql.prepare(`SELECT * FROM trophies_poses WHERE skin = ?`);
                            for (var rows of getSkinsPoses.all(currentSkin)){
                                client.getSkinAmount = sql.prepare(`SELECT ${rows.name} FROM ${championName}_poses WHERE userID = ?`)
                                var getSkinAmount = client.getSkinAmount.get(message.author.id)
                                skinLocalSum = parseInt(Object.values(getSkinAmount)) + skinLocalSum;
                            }
                            skinArray.push(`${row.alias}`);
                            skinArrayWithShards.push(`${row.alias} - ${skinLocalSum}`)
        
                        }
                        firstSkinCurrentPage = 1;
                        firstSkinNumberOfPages = Math.ceil(skinArray.length / numberPerPage);
                        firstSkinBegin = ((firstSkinCurrentPage - 1) * numberPerPage);
                        firstSkinEnd = firstSkinBegin + numberPerPage;
                        firstSkinPageList = skinArray.slice(firstSkinBegin, firstSkinEnd);
                        firstSkinPageListWithShards = skinArrayWithShards.slice(firstSkinBegin, firstSkinEnd);
                        var firstSkinEmbed = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.displayAvatarURL)
                        .setTitle(championAlias)
                        .setColor('#56B48C')
                        .setDescription(firstSkinPageListWithShards)
                        .setFooter(`Page ${firstSkinCurrentPage}/${firstSkinNumberOfPages}`)
                        msg.edit ({embed : firstSkinEmbed})
                    }
                        
        
                        } else if(levelSwitch == 1){
                            if(!firstSkinPageList[4]){
                                r.remove(message.author.id);
                                message.reply('skin not found.');
                            } else {
                                r.remove(message.author.id);
                                levelSwitch++;
                                skinAlias = firstSkinPageList[4];
                                skinName = client.getSkinsFromAlias.get(skinAlias).name;
                                for (var row of getPosesFromSkinName.all(skinName)){
                                    client.getPosesQuantity = sql.prepare(`SELECT ${row.name} FROM ${championName}_poses WHERE userID = ?`);
                                    poseArray.push(`${row.alias}`);
                                    poseArrayWithShards.push(`${row.alias} - ${Object.values(client.getPosesQuantity.get(message.author.id))}`);
                                }
                                firstPoseCurrentPage = 1;
                                firstPoseNumberOfPages = Math.ceil(poseArray.length / numberPerPage);
                                firstPoseBegin = ((firstPoseCurrentPage - 1) * numberPerPage);
                                firstPoseEnd = firstPoseBegin + numberPerPage;
                                firstPosePageList = poseArray.slice(firstPoseBegin, firstPoseEnd);
                                firstPosePageListWithShards = poseArrayWithShards.slice(firstPoseBegin, firstPoseEnd);
                                let firstPoseEmbed = new Discord.RichEmbed()
                                .setAuthor(message.author.username, message.author.displayAvatarURL)
                                .setTitle(skinAlias)
                                .setColor('#56B48C')
                                .setDescription(firstPosePageListWithShards)
                                .setFooter(`Page ${firstPoseCurrentPage}/${firstPoseNumberOfPages}`)
                                msg.edit ({embed : firstPoseEmbed});
                            }
                            } else if(levelSwitch == 2){
                                if(!firstPosePageList[4]){
                                    message.reply('pose not found');
                                    r.remove(message.author.id);
                                } else {
                                    getSavingStatus = client.getProfile.get(`${message.author.id}`).currentlySaving;
                                    if (getSavingStatus == 1){
                                    r.remove(message.author.id);
                                    message.reply('that profile is currently being saved, please wait.');
                                    } else {
                                    poseName = client.getPosesFromAlias.get(firstPosePageList[4]).name;
                                    client.getAmountOfPoses = sql.prepare(`SELECT ${poseName} FROM ${championName}_poses WHERE userID = ?`) //GET THE TOTAL AMOUNT OF POSES FOR A USER
                                    var getAmountOfPoses = client.getAmountOfPoses.get(message.author.id);
                                    poseValue = Object.values(getAmountOfPoses);
                                    var valueInt = parseInt(poseValue)
                                    if (valueInt < 1){
                                        message.reply(`you don\'t have any **${firstPosePageList[4]}** pose shards.`);
                                    } else {
                                        client.setTrophy = sql.prepare(`UPDATE profiles SET trophyName = '${poseName}' WHERE userID = ${message.author.id}`).run();
                                        client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                                        r.message.delete();
                                        message.reply(`I've changed your trophy to **${firstPosePageList[4]}**.`);
                                    }
                                }
                                }
                                
                }
        
            });
            sixthOption.on('collect', r => {
                   if(levelSwitch == 0){
                    if(!championPageList[5]){
                        message.reply('Error.');
                        r.remove(message.author.id);
                    } else {
                        skinArray = [];
                        skinArrayWithShards = [];
                        reactNumber = 6;
                        r.remove(message.author.id);
                        levelSwitch++;
                        championAlias = championPageList[5];
                        championName = client.getChampionsFromAlias.get(championAlias).name;
                        for (var row of getSkinsFromChampionName.all(championName)) {
                            skinNumber++;
                            if (skinNumber > 9){
                                skinNumber = 0
                            }
                            skinLocalSum = 0;
                            currentSkin = row.name;
                            var getSkinsPoses = sql.prepare(`SELECT * FROM trophies_poses WHERE skin = ?`);
                            for (var rows of getSkinsPoses.all(currentSkin)){
                                client.getSkinAmount = sql.prepare(`SELECT ${rows.name} FROM ${championName}_poses WHERE userID = ?`)
                                var getSkinAmount = client.getSkinAmount.get(message.author.id)
                                skinLocalSum = parseInt(Object.values(getSkinAmount)) + skinLocalSum;
                            }
                            skinArray.push(`${row.alias}`);
                            skinArrayWithShards.push(`${row.alias} - ${skinLocalSum}`)
        
                        }
                        firstSkinCurrentPage = 1;
                        firstSkinNumberOfPages = Math.ceil(skinArray.length / numberPerPage);
                        firstSkinBegin = ((firstSkinCurrentPage - 1) * numberPerPage);
                        firstSkinEnd = firstSkinBegin + numberPerPage;
                        firstSkinPageList = skinArray.slice(firstSkinBegin, firstSkinEnd);
                        firstSkinPageListWithShards = skinArrayWithShards.slice(firstSkinBegin, firstSkinEnd);
                        var firstSkinEmbed = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.displayAvatarURL)
                        .setTitle(championAlias)
                        .setColor('#56B48C')
                        .setDescription(firstSkinPageListWithShards)
                        .setFooter(`Page ${firstSkinCurrentPage}/${firstSkinNumberOfPages}`)
                        msg.edit ({embed : firstSkinEmbed})
                    }
                        
        
                        } else if(levelSwitch == 1){
                            if(!firstSkinPageList[5]){
                                r.remove(message.author.id);
                                message.reply('skin not found.');
                            } else {
                                r.remove(message.author.id);
                                levelSwitch++;
                                skinAlias = firstSkinPageList[5];
                                skinName = client.getSkinsFromAlias.get(skinAlias).name;
                                for (var row of getPosesFromSkinName.all(skinName)){
                                    client.getPosesQuantity = sql.prepare(`SELECT ${row.name} FROM ${championName}_poses WHERE userID = ?`);
                                    poseArray.push(`${row.alias}`);
                                    poseArrayWithShards.push(`${row.alias} - ${Object.values(client.getPosesQuantity.get(message.author.id))}`);
                                }
                                firstPoseCurrentPage = 1;
                                firstPoseNumberOfPages = Math.ceil(poseArray.length / numberPerPage);
                                firstPoseBegin = ((firstPoseCurrentPage - 1) * numberPerPage);
                                firstPoseEnd = firstPoseBegin + numberPerPage;
                                firstPosePageList = poseArray.slice(firstPoseBegin, firstPoseEnd);
                                firstPosePageListWithShards = poseArrayWithShards.slice(firstPoseBegin, firstPoseEnd);
                                let firstPoseEmbed = new Discord.RichEmbed()
                                .setAuthor(message.author.username, message.author.displayAvatarURL)
                                .setTitle(skinAlias)
                                .setColor('#56B48C')
                                .setDescription(firstPosePageListWithShards)
                                .setFooter(`Page ${firstPoseCurrentPage}/${firstPoseNumberOfPages}`)
                                msg.edit ({embed : firstPoseEmbed});
                            }
                            } else if(levelSwitch == 2){
                                if(!firstPosePageList[5]){
                                    message.reply('pose not found');
                                    r.remove(message.author.id);
                                } else {
                                    getSavingStatus = client.getProfile.get(`${message.author.id}`).currentlySaving;
                                    if (getSavingStatus == 1){
                                    r.remove(message.author.id);
                                    message.reply('that profile is currently being saved, please wait.');
                                    } else {
                                    poseName = client.getPosesFromAlias.get(firstPosePageList[5]).name;
                                    client.getAmountOfPoses = sql.prepare(`SELECT ${poseName} FROM ${championName}_poses WHERE userID = ?`) //GET THE TOTAL AMOUNT OF POSES FOR A USER
                                    var getAmountOfPoses = client.getAmountOfPoses.get(message.author.id);
                                    poseValue = Object.values(getAmountOfPoses);
                                    var valueInt = parseInt(poseValue)
                                    if (valueInt < 1){
                                        message.reply(`you don\'t have any **${firstPosePageList[5]}** pose shards.`);
                                    } else {
                                        client.setTrophy = sql.prepare(`UPDATE profiles SET trophyName = '${poseName}' WHERE userID = ${message.author.id}`).run();
                                        client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                                        r.message.delete();
                                        message.reply(`I've changed your trophy to **${firstPosePageList[5]}**.`);
                                    }
                                }
                                }
                                
                }
        
            });
            seventhOption.on('collect', r => {
                   if(levelSwitch == 0){
                    if(!championPageList[6]){
                        message.reply('Error.');
                        r.remove(message.author.id);
                    } else {
                        skinArray = [];
                        skinArrayWithShards = [];
                        reactNumber = 7;
                        r.remove(message.author.id);
                        levelSwitch++;
                        championAlias = championPageList[6];
                        championName = client.getChampionsFromAlias.get(championAlias).name;
                        for (var row of getSkinsFromChampionName.all(championName)) {
                            skinNumber++;
                            if (skinNumber > 9){
                                skinNumber = 0
                            }
                            skinLocalSum = 0;
                            currentSkin = row.name;
                            var getSkinsPoses = sql.prepare(`SELECT * FROM trophies_poses WHERE skin = ?`);
                            for (var rows of getSkinsPoses.all(currentSkin)){
                                client.getSkinAmount = sql.prepare(`SELECT ${rows.name} FROM ${championName}_poses WHERE userID = ?`)
                                var getSkinAmount = client.getSkinAmount.get(message.author.id)
                                skinLocalSum = parseInt(Object.values(getSkinAmount)) + skinLocalSum;
                            }
                            skinArray.push(`${row.alias}`);
                            skinArrayWithShards.push(`${row.alias} - ${skinLocalSum}`)
        
                        }
                        firstSkinCurrentPage = 1;
                        firstSkinNumberOfPages = Math.ceil(skinArray.length / numberPerPage);
                        firstSkinBegin = ((firstSkinCurrentPage - 1) * numberPerPage);
                        firstSkinEnd = firstSkinBegin + numberPerPage;
                        firstSkinPageList = skinArray.slice(firstSkinBegin, firstSkinEnd);
                        firstSkinPageListWithShards = skinArrayWithShards.slice(firstSkinBegin, firstSkinEnd);
                        var firstSkinEmbed = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.displayAvatarURL)
                        .setTitle(championAlias)
                        .setColor('#56B48C')
                        .setDescription(firstSkinPageListWithShards)
                        .setFooter(`Page ${firstSkinCurrentPage}/${firstSkinNumberOfPages}`)
                        msg.edit ({embed : firstSkinEmbed})
                    }
                        
        
                        } else if(levelSwitch == 1){
                            if(!firstSkinPageList[6]){
                                r.remove(message.author.id);
                                message.reply('skin not found.');
                            } else {
                                r.remove(message.author.id);
                                levelSwitch++;
                                skinAlias = firstSkinPageList[6];
                                skinName = client.getSkinsFromAlias.get(skinAlias).name;
                                for (var row of getPosesFromSkinName.all(skinName)){
                                    client.getPosesQuantity = sql.prepare(`SELECT ${row.name} FROM ${championName}_poses WHERE userID = ?`);
                                    poseArray.push(`${row.alias}`);
                                    poseArrayWithShards.push(`${row.alias} - ${Object.values(client.getPosesQuantity.get(message.author.id))}`);
                                }
                                firstPoseCurrentPage = 1;
                                firstPoseNumberOfPages = Math.ceil(poseArray.length / numberPerPage);
                                firstPoseBegin = ((firstPoseCurrentPage - 1) * numberPerPage);
                                firstPoseEnd = firstPoseBegin + numberPerPage;
                                firstPosePageList = poseArray.slice(firstPoseBegin, firstPoseEnd);
                                firstPosePageListWithShards = poseArrayWithShards.slice(firstPoseBegin, firstPoseEnd);
                                let firstPoseEmbed = new Discord.RichEmbed()
                                .setAuthor(message.author.username, message.author.displayAvatarURL)
                                .setTitle(skinAlias)
                                .setColor('#56B48C')
                                .setDescription(firstPosePageListWithShards)
                                .setFooter(`Page ${firstPoseCurrentPage}/${firstPoseNumberOfPages}`)
                                msg.edit ({embed : firstPoseEmbed});
                            }
                            } else if(levelSwitch == 2){
                                if(!firstPosePageList[6]){
                                    message.reply('pose not found');
                                    r.remove(message.author.id);
                                } else {
                                    getSavingStatus = client.getProfile.get(`${message.author.id}`).currentlySaving;
                                    if (getSavingStatus == 1){
                                    r.remove(message.author.id);
                                    message.reply('that profile is currently being saved, please wait.');
                                    } else {
                                    poseName = client.getPosesFromAlias.get(firstPosePageList[6]).name;
                                    client.getAmountOfPoses = sql.prepare(`SELECT ${poseName} FROM ${championName}_poses WHERE userID = ?`) //GET THE TOTAL AMOUNT OF POSES FOR A USER
                                    var getAmountOfPoses = client.getAmountOfPoses.get(message.author.id);
                                    poseValue = Object.values(getAmountOfPoses);
                                    var valueInt = parseInt(poseValue)
                                    if (valueInt < 1){
                                        message.reply(`you don\'t have any **${firstPosePageList[6]}** pose shards.`);
                                    } else {
                                        client.setTrophy = sql.prepare(`UPDATE profiles SET trophyName = '${poseName}' WHERE userID = ${message.author.id}`).run();
                                        client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                                        r.message.delete();
                                        message.reply(`I've changed your trophy to **${firstPosePageList[6]}**.`);
                                    }
                                }
                                }
                                
                }
            });
            eighthOption.on('collect', r => {
                   if(levelSwitch == 0){
                    if(!championPageList[7]){
                        message.reply('Error.');
                        r.remove(message.author.id);
                    } else {
                        skinArray = [];
                        skinArrayWithShards = [];
                        reactNumber = 8;
                        r.remove(message.author.id);
                        levelSwitch++;
                        championAlias = championPageList[7];
                        championName = client.getChampionsFromAlias.get(championAlias).name;
                        for (var row of getSkinsFromChampionName.all(championName)) {
                            skinNumber++;
                            if (skinNumber > 9){
                                skinNumber = 0
                            }
                            skinLocalSum = 0;
                            currentSkin = row.name;
                            var getSkinsPoses = sql.prepare(`SELECT * FROM trophies_poses WHERE skin = ?`);
                            for (var rows of getSkinsPoses.all(currentSkin)){
                                client.getSkinAmount = sql.prepare(`SELECT ${rows.name} FROM ${championName}_poses WHERE userID = ?`)
                                var getSkinAmount = client.getSkinAmount.get(message.author.id)
                                skinLocalSum = parseInt(Object.values(getSkinAmount)) + skinLocalSum;
                            }
                            skinArray.push(`${row.alias}`);
                            skinArrayWithShards.push(`${row.alias} - ${skinLocalSum}`)
        
                        }
                        firstSkinCurrentPage = 1;
                        firstSkinNumberOfPages = Math.ceil(skinArray.length / numberPerPage);
                        firstSkinBegin = ((firstSkinCurrentPage - 1) * numberPerPage);
                        firstSkinEnd = firstSkinBegin + numberPerPage;
                        firstSkinPageList = skinArray.slice(firstSkinBegin, firstSkinEnd);
                        firstSkinPageListWithShards = skinArrayWithShards.slice(firstSkinBegin, firstSkinEnd);
                        var firstSkinEmbed = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.displayAvatarURL)
                        .setTitle(championAlias)
                        .setColor('#56B48C')
                        .setDescription(firstSkinPageListWithShards)
                        .setFooter(`Page ${firstSkinCurrentPage}/${firstSkinNumberOfPages}`)
                        msg.edit ({embed : firstSkinEmbed})
                    }
                        
        
                        } else if(levelSwitch == 1){
                            if(!firstSkinPageList[7]){
                                r.remove(message.author.id);
                                message.reply('skin not found.');
                            } else {
                                r.remove(message.author.id);
                                levelSwitch++;
                                skinAlias = firstSkinPageList[7];
                                skinName = client.getSkinsFromAlias.get(skinAlias).name;
                                for (var row of getPosesFromSkinName.all(skinName)){
                                    client.getPosesQuantity = sql.prepare(`SELECT ${row.name} FROM ${championName}_poses WHERE userID = ?`);
                                    poseArray.push(`${row.alias}`);
                                    poseArrayWithShards.push(`${row.alias} - ${Object.values(client.getPosesQuantity.get(message.author.id))}`);
                                }
                                firstPoseCurrentPage = 1;
                                firstPoseNumberOfPages = Math.ceil(poseArray.length / numberPerPage);
                                firstPoseBegin = ((firstPoseCurrentPage - 1) * numberPerPage);
                                firstPoseEnd = firstPoseBegin + numberPerPage;
                                firstPosePageList = poseArray.slice(firstPoseBegin, firstPoseEnd);
                                firstPosePageListWithShards = poseArrayWithShards.slice(firstPoseBegin, firstPoseEnd);
                                let firstPoseEmbed = new Discord.RichEmbed()
                                .setAuthor(message.author.username, message.author.displayAvatarURL)
                                .setTitle(skinAlias)
                                .setColor('#56B48C')
                                .setDescription(firstPosePageListWithShards)
                                .setFooter(`Page ${firstPoseCurrentPage}/${firstPoseNumberOfPages}`)
                                msg.edit ({embed : firstPoseEmbed});
                            }
                            } else if(levelSwitch == 2){
                                if(!firstPosePageList[7]){
                                    message.reply('pose not found');
                                    r.remove(message.author.id);
                                } else {
                                    getSavingStatus = client.getProfile.get(`${message.author.id}`).currentlySaving;
                                    if (getSavingStatus == 1){
                                    r.remove(message.author.id);
                                    message.reply('that profile is currently being saved, please wait.');
                                    } else {
                                    poseName = client.getPosesFromAlias.get(firstPosePageList[7]).name;
                                    client.getAmountOfPoses = sql.prepare(`SELECT ${poseName} FROM ${championName}_poses WHERE userID = ?`) //GET THE TOTAL AMOUNT OF POSES FOR A USER
                                    var getAmountOfPoses = client.getAmountOfPoses.get(message.author.id);
                                    poseValue = Object.values(getAmountOfPoses);
                                    var valueInt = parseInt(poseValue)
                                    if (valueInt < 1){
                                        message.reply(`you don\'t have any **${firstPosePageList[7]}** pose shards.`);
                                    } else {
                                        client.setTrophy = sql.prepare(`UPDATE profiles SET trophyName = '${poseName}' WHERE userID = ${message.author.id}`).run();
                                        client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                                        r.message.delete();
                                        message.reply(`I've changed your trophy to **${firstPosePageList[7]}**.`);
                                    }
                                }
                                }
                                
                }
            });
            ninthOption.on('collect', r => {
                   if(levelSwitch == 0){
                    if(!championPageList[8]){
                        message.reply('Error.');
                        r.remove(message.author.id);
                    } else {
                        skinArray = [];
                        skinArrayWithShards = [];
                        reactNumber = 9;
                        r.remove(message.author.id);
                        levelSwitch++;
                        championAlias = championPageList[8];
                        championName = client.getChampionsFromAlias.get(championAlias).name;
                        for (var row of getSkinsFromChampionName.all(championName)) {
                            skinNumber++;
                            if (skinNumber > 9){
                                skinNumber = 0
                            }
                            skinLocalSum = 0;
                            currentSkin = row.name;
                            var getSkinsPoses = sql.prepare(`SELECT * FROM trophies_poses WHERE skin = ?`);
                            for (var rows of getSkinsPoses.all(currentSkin)){
                                client.getSkinAmount = sql.prepare(`SELECT ${rows.name} FROM ${championName}_poses WHERE userID = ?`)
                                var getSkinAmount = client.getSkinAmount.get(message.author.id)
                                skinLocalSum = parseInt(Object.values(getSkinAmount)) + skinLocalSum;
                            }
                            skinArray.push(`${row.alias}`);
                            skinArrayWithShards.push(`${row.alias} - ${skinLocalSum}`)
        
                        }
                        firstSkinCurrentPage = 1;
                        firstSkinNumberOfPages = Math.ceil(skinArray.length / numberPerPage);
                        firstSkinBegin = ((firstSkinCurrentPage - 1) * numberPerPage);
                        firstSkinEnd = firstSkinBegin + numberPerPage;
                        firstSkinPageList = skinArray.slice(firstSkinBegin, firstSkinEnd);
                        firstSkinPageListWithShards = skinArrayWithShards.slice(firstSkinBegin, firstSkinEnd);
                        var firstSkinEmbed = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.displayAvatarURL)
                        .setTitle(championAlias)
                        .setColor('#56B48C')
                        .setDescription(firstSkinPageListWithShards)
                        .setFooter(`Page ${firstSkinCurrentPage}/${firstSkinNumberOfPages}`)
                        msg.edit ({embed : firstSkinEmbed})
                    }
                        
        
                        } else if(levelSwitch == 1){
                            if(!firstSkinPageList[8]){
                                r.remove(message.author.id);
                                message.reply('skin not found.');
                            } else {
                                r.remove(message.author.id);
                                levelSwitch++;
                                skinAlias = firstSkinPageList[8];
                                skinName = client.getSkinsFromAlias.get(skinAlias).name;
                                for (var row of getPosesFromSkinName.all(skinName)){
                                    client.getPosesQuantity = sql.prepare(`SELECT ${row.name} FROM ${championName}_poses WHERE userID = ?`);
                                    poseArray.push(`${row.alias}`);
                                    poseArrayWithShards.push(`${row.alias} - ${Object.values(client.getPosesQuantity.get(message.author.id))}`);
                                }
                                firstPoseCurrentPage = 1;
                                firstPoseNumberOfPages = Math.ceil(poseArray.length / numberPerPage);
                                firstPoseBegin = ((firstPoseCurrentPage - 1) * numberPerPage);
                                firstPoseEnd = firstPoseBegin + numberPerPage;
                                firstPosePageList = poseArray.slice(firstPoseBegin, firstPoseEnd);
                                firstPosePageListWithShards = poseArrayWithShards.slice(firstPoseBegin, firstPoseEnd);
                                let firstPoseEmbed = new Discord.RichEmbed()
                                .setAuthor(message.author.username, message.author.displayAvatarURL)
                                .setTitle(skinAlias)
                                .setColor('#56B48C')
                                .setDescription(firstPosePageListWithShards)
                                .setFooter(`Page ${firstPoseCurrentPage}/${firstPoseNumberOfPages}`)
                                msg.edit ({embed : firstPoseEmbed});
                            }
                            } else if(levelSwitch == 2){
                                if(!firstPosePageList[8]){
                                    message.reply('pose not found');
                                    r.remove(message.author.id);
                                } else {
                                    getSavingStatus = client.getProfile.get(`${message.author.id}`).currentlySaving;
                                    if (getSavingStatus == 1){
                                    r.remove(message.author.id);
                                    message.reply('that profile is currently being saved, please wait.');
                                    } else {
                                    poseName = client.getPosesFromAlias.get(firstPosePageList[8]).name;
                                    client.getAmountOfPoses = sql.prepare(`SELECT ${poseName} FROM ${championName}_poses WHERE userID = ?`) //GET THE TOTAL AMOUNT OF POSES FOR A USER
                                    var getAmountOfPoses = client.getAmountOfPoses.get(message.author.id);
                                    poseValue = Object.values(getAmountOfPoses);
                                    var valueInt = parseInt(poseValue)
                                    if (valueInt < 1){
                                        message.reply(`you don\'t have any **${firstPosePageList[8]}** pose shards.`);
                                    } else {
                                        client.setTrophy = sql.prepare(`UPDATE profiles SET trophyName = '${poseName}' WHERE userID = ${message.author.id}`).run();
                                        client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                                        r.message.delete();
                                        message.reply(`I've changed your trophy to **${firstPosePageList[8]}**.`);
                                    }
                                }
                                }
                                
                }
            });
            tenthOption.on('collect', r => {
                   if(levelSwitch == 0){
                    if(!championPageList[9]){
                        message.reply('Error.');
                        r.remove(message.author.id);
                    } else {
                        skinArray = [];
                        skinArrayWithShards = [];
                        reactNumber = 10;
                        r.remove(message.author.id);
                        levelSwitch++;
                        championAlias = championPageList[9];
                        championName = client.getChampionsFromAlias.get(championAlias).name;
                        for (var row of getSkinsFromChampionName.all(championName)) {
                            skinNumber++;
                            if (skinNumber > 9){
                                skinNumber = 0
                            }
                            skinLocalSum = 0;
                            currentSkin = row.name;
                            var getSkinsPoses = sql.prepare(`SELECT * FROM trophies_poses WHERE skin = ?`);
                            for (var rows of getSkinsPoses.all(currentSkin)){
                                client.getSkinAmount = sql.prepare(`SELECT ${rows.name} FROM ${championName}_poses WHERE userID = ?`)
                                var getSkinAmount = client.getSkinAmount.get(message.author.id)
                                skinLocalSum = parseInt(Object.values(getSkinAmount)) + skinLocalSum;
                            }
                            skinArray.push(`${row.alias}`);
                            skinArrayWithShards.push(`${row.alias} - ${skinLocalSum}`)
        
                        }
                        firstSkinCurrentPage = 1;
                        firstSkinNumberOfPages = Math.ceil(skinArray.length / numberPerPage);
                        firstSkinBegin = ((firstSkinCurrentPage - 1) * numberPerPage);
                        firstSkinEnd = firstSkinBegin + numberPerPage;
                        firstSkinPageList = skinArray.slice(firstSkinBegin, firstSkinEnd);
                        firstSkinPageListWithShards = skinArrayWithShards.slice(firstSkinBegin, firstSkinEnd);
                        var firstSkinEmbed = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.displayAvatarURL)
                        .setTitle(championAlias)
                        .setColor('#56B48C')
                        .setDescription(firstSkinPageListWithShards)
                        .setFooter(`Page ${firstSkinCurrentPage}/${firstSkinNumberOfPages}`)
                        msg.edit ({embed : firstSkinEmbed})
                    }
                        
        
                        } else if(levelSwitch == 1){
                            if(!firstSkinPageList[9]){
                                r.remove(message.author.id);
                                message.reply('skin not found.');
                            } else {
                                r.remove(message.author.id);
                                levelSwitch++;
                                skinAlias = firstSkinPageList[9];
                                skinName = client.getSkinsFromAlias.get(skinAlias).name;
                                for (var row of getPosesFromSkinName.all(skinName)){
                                    client.getPosesQuantity = sql.prepare(`SELECT ${row.name} FROM ${championName}_poses WHERE userID = ?`);
                                    poseArray.push(`${row.alias}`);
                                    poseArrayWithShards.push(`${row.alias} - ${Object.values(client.getPosesQuantity.get(message.author.id))}`);
                                }
                                firstPoseCurrentPage = 1;
                                firstPoseNumberOfPages = Math.ceil(poseArray.length / numberPerPage);
                                firstPoseBegin = ((firstPoseCurrentPage - 1) * numberPerPage);
                                firstPoseEnd = firstPoseBegin + numberPerPage;
                                firstPosePageList = poseArray.slice(firstPoseBegin, firstPoseEnd);
                                firstPosePageListWithShards = poseArrayWithShards.slice(firstPoseBegin, firstPoseEnd);
                                let firstPoseEmbed = new Discord.RichEmbed()
                                .setAuthor(message.author.username, message.author.displayAvatarURL)
                                .setTitle(skinAlias)
                                .setColor('#56B48C')
                                .setDescription(firstPosePageListWithShards)
                                .setFooter(`Page ${firstPoseCurrentPage}/${firstPoseNumberOfPages}`)
                                msg.edit ({embed : firstPoseEmbed});
                            }
                            } else if(levelSwitch == 2){
                                if(!firstPosePageList[9]){
                                    message.reply('pose not found');
                                    r.remove(message.author.id);
                                } else {
                                    getSavingStatus = client.getProfile.get(`${message.author.id}`).currentlySaving;
                                    if (getSavingStatus == 1){
                                    r.remove(message.author.id);
                                    message.reply('that profile is currently being saved, please wait.');
                                    } else {
                                    poseName = client.getPosesFromAlias.get(firstPosePageList[9]).name;
                                    client.getAmountOfPoses = sql.prepare(`SELECT ${poseName} FROM ${championName}_poses WHERE userID = ?`) //GET THE TOTAL AMOUNT OF POSES FOR A USER
                                    var getAmountOfPoses = client.getAmountOfPoses.get(message.author.id);
                                    poseValue = Object.values(getAmountOfPoses);
                                    var valueInt = parseInt(poseValue)
                                    if (valueInt < 1){
                                        message.reply(`you don\'t have any **${firstPosePageList[9]}** pose shards.`);
                                    } else {
                                        client.setTrophy = sql.prepare(`UPDATE profiles SET trophyName = '${poseName}' WHERE userID = ${message.author.id}`).run();
                                        client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                                        r.message.delete();
                                        message.reply(`I've changed your trophy to **${firstPosePageList[9]}**.`);
                                    }
                                }
                                }
                                
                }
            })
            upOption.on('collect', r => {
                if(levelSwitch == 0){
                    r.message.delete();
                    message.reply('trophy selection closed.');
                } else if(levelSwitch == 1){
                    r.remove(message.author.id);
                    levelSwitch--;
                    skinArray = [];
                    skinArrayWithShards = [];
                    let championsEmbed = new Discord.RichEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL)
                    .setColor('#56B48C')
                    .setDescription(championPageListWithShards)
                    .setFooter(`Page ${championCurrentPage}/${championNumberOfPages}`);
                    r.message.edit({embed : championsEmbed})
                } else if(levelSwitch == 2){
                    r.remove(message.author.id);
                    levelSwitch--;
                    poseArray = [];
                    poseArrayWithShards = [];
                    var firstSkinEmbed = new Discord.RichEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL)
                    .setTitle(championAlias)
                    .setColor('#56B48C')
                    .setDescription(firstSkinPageListWithShards)
                    .setFooter(`Page ${firstSkinCurrentPage}/${firstSkinNumberOfPages}`)
                    r.message.edit({embed : firstSkinEmbed});
                }
            })
        
            
        });
        } else {
            client.getTrophies = sql.prepare(`SELECT * FROM trophies_poses WHERE callName = ?`);
            var poseName = args.join(' ');
            poseName = poseName.toLowerCase();
            var getPose = client.getTrophies.get(poseName);
            if(!getPose){
                message.reply('that is an invalid pose name.')
            } else {
                var getPoseChampion = client.getTrophies.get(poseName).champion;
                var getPoseName = client.getTrophies.get(poseName).name;
                var getPoseAlias = client.getTrophies.get(poseName).alias;
                client.getChampionTable = sql.prepare(`SELECT ${getPoseName} FROM ${getPoseChampion}_poses WHERE userID = ?`);
                var getPoseKey = client.getChampionTable.get(message.author.id);
                var poseAmount = parseInt(Object.values(getPoseKey));
                if(poseAmount < 1){
                    message.reply(`you don\'t have any **${getPoseAlias}** pose shards.`)
                } else {
                    client.setTrophy = sql.prepare(`UPDATE profiles SET trophyName = '${getPoseName}' WHERE userID = ${message.author.id}`).run();
                    client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                    message.reply(`I've changed your trophy to **${getPoseAlias}**.`);
                }
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
  name: "settrophy",
  category: "Profile",
  description: "Change your profile trophy.",
  usage: "settrophy <trophy name>"
};
