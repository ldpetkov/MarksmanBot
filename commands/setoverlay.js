const Discord = require("discord.js");
var path=require('path');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');

exports.run = async (client, message, args, level) => {
    client.getProfile = sql.prepare('SELECT * FROM profiles WHERE userID = ?');
    let profileInfo = client.getProfile.get(message.author.id);

 if (!profileInfo) {
   message.reply(`you don't have a profile set up. To set it up, run the \`\`.setup\`\` command.`);
 } else {
    var getSavingStatus = client.getProfile.get(message.author.id).currentlySaving;
    if (getSavingStatus == 1){
        message.reply('that profile is currently being saved, please wait.');
    } else {
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
          var overlayNames = [];
          var overlayAliases = [];
          var overlayAmount;
          var getOverlays = sql.prepare(`SELECT * FROM avatar_overlay_info`);
          client.getOverlayFromAlias = sql.prepare(`SELECT * FROM avatar_overlay_info WHERE alias = ?`);
          client.getOverlayFromName = sql.prepare(`SELECT * FROM avatar_overlay_info WHERE name = ?`);
    
          for (var row of getOverlays.all()){
            var overlayName = row.name.toString();
            
            client.selectOverlay = sql.prepare(`SELECT "${overlayName}" FROM avatar_overlays WHERE userID = ?`);
            var selectOverlay = client.selectOverlay.get(message.author.id);
    
            client.getOverlayEmoji = sql.prepare(`SELECT * FROM avatar_overlay_info WHERE name = ?`);
            var getOverlayEmoji = client.getOverlayEmoji.get(row.name).emoji
            overlayAmount = parseInt(Object.values(selectOverlay));
            overlayNames.push(overlayName);
            if(row.name == 'default'){
                overlayAliases.push(`${row.alias} - <${getOverlayEmoji}>`);
            } else {
                overlayAliases.push(`${row.alias} - ${overlayAmount} <${getOverlayEmoji}>`);
            }
            
            overlayAmount = 0;
          }
    
          var pageList = new Array();
            var currentPage = 1;
            var numberPerPage = 10;
            var numberOfPages = Math.ceil(overlayNames.length / numberPerPage);
    
            var begin = ((currentPage - 1) * numberPerPage);
            var end = begin + numberPerPage;
            pageNames = overlayNames.slice(begin, end);
            pageList = overlayAliases.slice(begin, end);
            let paginationEmbed = new Discord.RichEmbed()
            .setAuthor(`Overlay list`)
            .setDescription(pageList)
            .setFooter(`Page ${currentPage}/${numberOfPages}`);
            message.channel.send(paginationEmbed).then( msg => {
                msg.react(`:left:491696598779297803`).then (r => {
                  msg.react(`:right:491696598485565441`).then ( r => {
                    msg.react(`:up:491696598758457354`).then (r => {
                        msg.react(`:one:487249300183711745`).then (r => {
                            msg.react(`:two:487249300338769931`).then ( r => {
                                msg.react(`:three:487249300678639656`).then ( r => {
                                    msg.react(`:four:491696598561193985`).then (r => {
                                        msg.react(`:five:487249300301283329`).then (r => {
                                            msg.react(`:six:491696598942744576`).then (r => {
                                                msg.react(`:seven:491696598670245888`).then (r => {
                                                    msg.react(`:eight:491696598473244683`).then (r => {
                                                        msg.react(`:nine:487249300385038338`).then (r => {
                                                            msg.react(`:ten:491696598552936469`)
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                  })
                })
    
    
    
                const backwardsFilter = (reaction, user) => reaction.emoji.identifier === `left:491696598779297803` && user.id === message.author.id;
                const forwardFilter = (reaction, user) => reaction.emoji.identifier === `right:491696598485565441` && user.id === message.author.id;
                const upFilter = (reaction, user) => reaction.emoji.identifier === `up:491696598758457354` && user.id === message.author.id;
                const firstFilter = (reaction, user) => reaction.emoji.identifier === `one:487249300183711745` && user.id === message.author.id;
                const secondFilter = (reaction, user) => reaction.emoji.identifier === `two:487249300338769931` && user.id === message.author.id;
                const thirdFilter = (reaction, user) => reaction.emoji.identifier === `three:487249300678639656` && user.id === message.author.id;
                const fourthFilter = (reaction, user) => reaction.emoji.identifier === `four:491696598561193985` && user.id === message.author.id;
                const fifthFilter = (reaction, user) => reaction.emoji.identifier === `five:487249300301283329` && user.id === message.author.id;
                const sixthFilter = (reaction, user) => reaction.emoji.identifier === `six:491696598942744576` && user.id === message.author.id;
                const seventFilter = (reaction, user) => reaction.emoji.identifier === `seven:491696598670245888` && user.id === message.author.id;
                const eighthFilter = (reaction, user) => reaction.emoji.identifier === `eight:491696598473244683` && user.id === message.author.id;
                const ninthFilter = (reaction, user) => reaction.emoji.identifier === `nine:487249300385038338` && user.id === message.author.id;
                const tenthFilter = (reaction, user) => reaction.emoji.identifier === `ten:491696598552936469` && user.id === message.author.id;
        
                const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000});
                const forward = msg.createReactionCollector(forwardFilter, { time: 60000});
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
        
                var currentOverlay;
                var selectedOverlay;
                var selectedOverlayValue;
                var selectedOverlayText;
                var currentOverlayName;
                backwards.on('collect', r => {
                    if (currentPage == 1) {
                        r.remove(message.author.id);
                        return;
                    } else {
                    currentPage--;
                    var begin = ((currentPage - 1) * numberPerPage);
                    var end = begin + numberPerPage;
                    
                    pageNames = overlayNames.slice(begin, end);
                    pageList = overlayAliases.slice(begin, end);
                    let paginationEmbedBackwards = new Discord.RichEmbed()
                    .setAuthor(`Overlay list`)
                    .setDescription(pageList)
                    .setFooter(`Page ${currentPage}/${numberOfPages}`);
                    r.remove(message.author.id);
                r.message.edit( {embed: paginationEmbedBackwards});
                    }
                });
                forward.on('collect', r => {
                    if (currentPage == numberOfPages) {
                        r.remove(message.author.id);
                        return;
                    } else {
                    currentPage++;
                    var begin = ((currentPage - 1) * numberPerPage);
                    var end = begin + numberPerPage;
            
                    pageNames = overlayNames.slice(begin, end);
                    pageList = overlayAliases.slice(begin, end);
                    let paginationEmbedForward = new Discord.RichEmbed()
                    .setAuthor(`Overlay list`)
                    .setDescription(pageList)
                    .setFooter(`Page ${currentPage}/${numberOfPages}`);
                    r.remove(message.author.id);
                    r.message.edit( {embed: paginationEmbedForward});
                    }
                });
                upOption.on('collect', r => {
                r.message.delete();
                message.reply('overlay selection closed.');
                })
                firstOption.on('collect', r => {
                    if(!pageNames[0]){
                        r.remove(message.author.id)
                        message.reply('overlay not found');
                    } else {
                        r.remove(message.author.id)
                        currentOverlay = pageNames[0]
                        client.selectOverlay = sql.prepare(`SELECT "${currentOverlay}" FROM avatar_overlays WHERE userID = ?`);
                        selectedOverlay = client.selectOverlay.get(message.author.id);
                        selectedOverlayValue = parseInt(Object.values(selectedOverlay));
                        selectedOverlayText = Object.keys(selectedOverlay);
                        selectedOverlayText = selectedOverlayText.toString();
                        currentOverlayName = client.getOverlayFromName.get(pageNames[0]).alias
                        if (selectedOverlayValue == 0){
                            message.reply(`you don\'t have any **${currentOverlayName}** overlays.`);
                        } else if(currentOverlay == 'default'){
                            client.setOverlay = sql.prepare(`UPDATE profiles SET avatarOverlay = '${currentOverlay}' WHERE userID = ${message.author.id}`).run();
                            client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                            msg.delete();
                            message.reply(`I've changed your avatar overlay to **${currentOverlayName}**.`);
                        } else {
                            client.setOverlay = sql.prepare(`UPDATE profiles SET avatarOverlay = '${currentOverlay}' WHERE userID = ${message.author.id}`).run();
                            client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                            msg.delete();
                            message.reply(`I've changed your avatar overlay to **${currentOverlayName}**.`);
                        }
                    }   
                });
                secondOption.on('collect', r => {
                    if(!pageNames[1]){
                        r.remove(message.author.id)
                        message.reply('overlay not found');
                    } else {
                        r.remove(message.author.id)
                        currentOverlay = pageNames[1]
                        client.selectOverlay = sql.prepare(`SELECT "${currentOverlay}" FROM avatar_overlays WHERE userID = ?`);
                        selectedOverlay = client.selectOverlay.get(message.author.id);
                        selectedOverlayValue = parseInt(Object.values(selectedOverlay));
                        selectedOverlayText = Object.keys(selectedOverlay);
                        selectedOverlayText = selectedOverlayText.toString();
                        currentOverlayName = client.getOverlayFromName.get(pageNames[1]).alias
                        if (selectedOverlayValue == 0){
                            message.reply(`you don\'t have any **${currentOverlayName}** overlays.`);
                        } else if(currentOverlay == 'default'){
                            client.setOverlay = sql.prepare(`UPDATE profiles SET avatarOverlay = '${currentOverlay}' WHERE userID = ${message.author.id}`).run();
                            client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                            msg.delete();
                            message.reply(`I've changed your avatar overlay to **${currentOverlayName}**.`);
                        } else {
                            client.setOverlay = sql.prepare(`UPDATE profiles SET avatarOverlay = '${currentOverlay}' WHERE userID = ${message.author.id}`).run();
                            client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                            msg.delete();
                            message.reply(`I've changed your avatar overlay to **${currentOverlayName}**.`);
                        }
                    } 
                });
                thirdOption.on('collect', r => {
                    if(!pageNames[2]){
                        r.remove(message.author.id)
                        message.reply('overlay not found');
                    } else {
                        r.remove(message.author.id)
                        currentOverlay = pageNames[2]
                        client.selectOverlay = sql.prepare(`SELECT "${currentOverlay}" FROM avatar_overlays WHERE userID = ?`);
                        selectedOverlay = client.selectOverlay.get(message.author.id);
                        selectedOverlayValue = parseInt(Object.values(selectedOverlay));
                        selectedOverlayText = Object.keys(selectedOverlay);
                        selectedOverlayText = selectedOverlayText.toString();
                        currentOverlayName = client.getOverlayFromName.get(pageNames[2]).alias
                        if(currentOverlay == 'default'){
                            client.setOverlay = sql.prepare(`UPDATE profiles SET avatarOverlay = '${currentOverlay}' WHERE userID = ${message.author.id}`).run();
                            client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                            msg.delete();
                            message.reply(`I've changed your avatar overlay to **${currentOverlayName}**.`);
                        }
                        else if (selectedOverlayValue == 0){
                            message.reply(`you don\'t have any **${currentOverlayName}** overlays.`);
                        } else {
                            client.setOverlay = sql.prepare(`UPDATE profiles SET avatarOverlay = '${currentOverlay}' WHERE userID = ${message.author.id}`).run();
                            client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                            msg.delete();
                            message.reply(`I've changed your avatar overlay to **${currentOverlayName}**.`);
                        }
                    } 
                })
                fourthOption.on('collect', r => {
                    if(!pageNames[3]){
                        r.remove(message.author.id)
                        message.reply('overlay not found');
                    } else {
                        r.remove(message.author.id)
                        currentOverlay = pageNames[3]
                        client.selectOverlay = sql.prepare(`SELECT "${currentOverlay}" FROM avatar_overlays WHERE userID = ?`);
                        selectedOverlay = client.selectOverlay.get(message.author.id);
                        selectedOverlayValue = parseInt(Object.values(selectedOverlay));
                        selectedOverlayText = Object.keys(selectedOverlay);
                        selectedOverlayText = selectedOverlayText.toString();
                        currentOverlayName = client.getOverlayFromName.get(pageNames[3]).alias
                        if (selectedOverlayValue == 0){
                            message.reply(`you don\'t have any **${currentOverlayName}** overlays.`);
                        } else if(currentOverlay == 'default'){
                            client.setOverlay = sql.prepare(`UPDATE profiles SET avatarOverlay = '${currentOverlay}' WHERE userID = ${message.author.id}`).run();
                            client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                            msg.delete();
                            message.reply(`I've changed your avatar overlay to **${currentOverlayName}**.`);
                        } else {
                            client.setOverlay = sql.prepare(`UPDATE profiles SET avatarOverlay = '${currentOverlay}' WHERE userID = ${message.author.id}`).run();
                            client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                            msg.delete();
                            message.reply(`I've changed your avatar overlay to **${currentOverlayName}**.`);
                        }
                    }
                })
                fifthOption.on('collect', r => {
                    if(!pageNames[4]){
                        r.remove(message.author.id)
                        message.reply('overlay not found');
                    } else {
                        r.remove(message.author.id)
                        currentOverlay = pageNames[4]
                        client.selectOverlay = sql.prepare(`SELECT "${currentOverlay}" FROM avatar_overlays WHERE userID = ?`);
                        selectedOverlay = client.selectOverlay.get(message.author.id);
                        selectedOverlayValue = parseInt(Object.values(selectedOverlay));
                        selectedOverlayText = Object.keys(selectedOverlay);
                        selectedOverlayText = selectedOverlayText.toString();
                        currentOverlayName = client.getOverlayFromName.get(pageNames[4]).alias
                        if (selectedOverlayValue == 0){
                            message.reply(`you don\'t have any **${currentOverlayName}** overlays.`);
                        } else if(currentOverlay == 'default'){
                            client.setOverlay = sql.prepare(`UPDATE profiles SET avatarOverlay = '${currentOverlay}' WHERE userID = ${message.author.id}`).run();
                            client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                            msg.delete();
                            message.reply(`I've changed your avatar overlay to **${currentOverlayName}**.`);
                        } else {
                            client.setOverlay = sql.prepare(`UPDATE profiles SET avatarOverlay = '${currentOverlay}' WHERE userID = ${message.author.id}`).run();
                            client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                            msg.delete();
                            message.reply(`I've changed your avatar overlay to **${currentOverlayName}**.`);
                        }
                    }
                })
                sixthOption.on('collect', r => {
                    if(!pageNames[5]){
                        r.remove(message.author.id)
                        message.reply('overlay not found');
                    } else {
                        r.remove(message.author.id)
                        currentOverlay = pageNames[5]
                        client.selectOverlay = sql.prepare(`SELECT "${currentOverlay}" FROM avatar_overlays WHERE userID = ?`);
                        selectedOverlay = client.selectOverlay.get(message.author.id);
                        selectedOverlayValue = parseInt(Object.values(selectedOverlay));
                        selectedOverlayText = Object.keys(selectedOverlay);
                        selectedOverlayText = selectedOverlayText.toString();
                        currentOverlayName = client.getOverlayFromName.get(pageNames[5]).alias
                        if (selectedOverlayValue == 0){
                            message.reply(`you don\'t have any **${currentOverlayName}** overlays.`);
                        } else if(currentOverlay == 'default'){
                            client.setOverlay = sql.prepare(`UPDATE profiles SET avatarOverlay = '${currentOverlay}' WHERE userID = ${message.author.id}`).run();
                            client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                            msg.delete();
                            message.reply(`I've changed your avatar overlay to **${currentOverlayName}**.`);
                        } else {
                            client.setOverlay = sql.prepare(`UPDATE profiles SET avatarOverlay = '${currentOverlay}' WHERE userID = ${message.author.id}`).run();
                            client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                            msg.delete();
                            message.reply(`I've changed your avatar overlay to **${currentOverlayName}**.`);
                        }
                    }
                })
                seventhOption.on('collect', r => {
                    if(!pageNames[6]){
                        r.remove(message.author.id)
                        message.reply('overlay not found');
                    } else {
                        r.remove(message.author.id)
                        currentOverlay = pageNames[6]
                        client.selectOverlay = sql.prepare(`SELECT "${currentOverlay}" FROM avatar_overlays WHERE userID = ?`);
                        selectedOverlay = client.selectOverlay.get(message.author.id);
                        selectedOverlayValue = parseInt(Object.values(selectedOverlay));
                        selectedOverlayText = Object.keys(selectedOverlay);
                        selectedOverlayText = selectedOverlayText.toString();
                        currentOverlayName = client.getOverlayFromName.get(pageNames[6]).alias
                        if (selectedOverlayValue == 0){
                            message.reply(`you don\'t have any **${currentOverlayName}** overlays.`);
                        } else if(currentOverlay == 'default'){
                            client.setOverlay = sql.prepare(`UPDATE profiles SET avatarOverlay = '${currentOverlay}' WHERE userID = ${message.author.id}`).run();
                            client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                            msg.delete();
                            message.reply(`I've changed your avatar overlay to **${currentOverlayName}**.`);
                        } else {
                            client.setOverlay = sql.prepare(`UPDATE profiles SET avatarOverlay = '${currentOverlay}' WHERE userID = ${message.author.id}`).run();
                            client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                            msg.delete();
                            message.reply(`I've changed your avatar overlay to **${currentOverlayName}**.`);
                        }
                    }
                })
                eighthOption.on('collect', r => {
                    if(!pageNames[7]){
                        r.remove(message.author.id)
                        message.reply('overlay not found');
                    } else {
                        r.remove(message.author.id)
                        currentOverlay = pageNames[7]
                        client.selectOverlay = sql.prepare(`SELECT "${currentOverlay}" FROM avatar_overlays WHERE userID = ?`);
                        selectedOverlay = client.selectOverlay.get(message.author.id);
                        selectedOverlayValue = parseInt(Object.values(selectedOverlay));
                        selectedOverlayText = Object.keys(selectedOverlay);
                        selectedOverlayText = selectedOverlayText.toString();
                        currentOverlayName = client.getOverlayFromName.get(pageNames[7]).alias
                        if (selectedOverlayValue == 0){
                            message.reply(`you don\'t have any **${currentOverlayName}** overlays.`);
                        } else if(currentOverlay == 'default'){
                            client.setOverlay = sql.prepare(`UPDATE profiles SET avatarOverlay = '${currentOverlay}' WHERE userID = ${message.author.id}`).run();
                            client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                            msg.delete();
                            message.reply(`I've changed your avatar overlay to **${currentOverlayName}**.`);
                        } else {
                            client.setOverlay = sql.prepare(`UPDATE profiles SET avatarOverlay = '${currentOverlay}' WHERE userID = ${message.author.id}`).run();
                            client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                            msg.delete();
                            message.reply(`I've changed your avatar overlay to **${currentOverlayName}**.`);
                        }
                    }
                })
                ninthOption.on('collect', r => {
                    if(!pageNames[8]){
                        r.remove(message.author.id)
                        message.reply('overlay not found');
                    } else {
                        r.remove(message.author.id)
                        currentOverlay = pageNames[8]
                        client.selectOverlay = sql.prepare(`SELECT "${currentOverlay}" FROM avatar_overlays WHERE userID = ?`);
                        selectedOverlay = client.selectOverlay.get(message.author.id);
                        selectedOverlayValue = parseInt(Object.values(selectedOverlay));
                        selectedOverlayText = Object.keys(selectedOverlay);
                        selectedOverlayText = selectedOverlayText.toString();
                        currentOverlayName = client.getOverlayFromName.get(pageNames[8]).alias
                        if (selectedOverlayValue == 0){
                            message.reply(`you don\'t have any **${currentOverlayName}** overlays.`);
                        } else if(currentOverlay == 'default'){
                            client.setOverlay = sql.prepare(`UPDATE profiles SET avatarOverlay = '${currentOverlay}' WHERE userID = ${message.author.id}`).run();
                            client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                            msg.delete();
                            message.reply(`I've changed your avatar overlay to **${currentOverlayName}**.`);
                        } else {
                            client.setOverlay = sql.prepare(`UPDATE profiles SET avatarOverlay = '${currentOverlay}' WHERE userID = ${message.author.id}`).run();
                            client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                            msg.delete();
                            message.reply(`I've changed your avatar overlay to **${currentOverlayName}**.`);
                        }
                    }
                })
                tenthOption.on('collect', r => {
                    if(!pageNames[9]){
                        r.remove(message.author.id)
                        message.reply('overlay not found');
                    } else {
                        r.remove(message.author.id)
                        currentOverlay = pageNames[9]
                        client.selectOverlay = sql.prepare(`SELECT "${currentOverlay}" FROM avatar_overlays WHERE userID = ?`);
                        selectedOverlay = client.selectOverlay.get(message.author.id);
                        selectedOverlayValue = parseInt(Object.values(selectedOverlay));
                        selectedOverlayText = Object.keys(selectedOverlay);
                        selectedOverlayText = selectedOverlayText.toString();
                        currentOverlayName = client.getOverlayFromName.get(pageNames[9]).alias
                        if (selectedOverlayValue == 0){
                            message.reply(`you don\'t have any **${currentOverlayName}** overlays.`);
                        } else if(currentOverlay == 'default'){
                            client.setOverlay = sql.prepare(`UPDATE profiles SET avatarOverlay = '${currentOverlay}' WHERE userID = ${message.author.id}`).run();
                            client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                            msg.delete();
                            message.reply(`I've changed your avatar overlay to **${currentOverlayName}**.`);
                        } else {
                            client.setOverlay = sql.prepare(`UPDATE profiles SET avatarOverlay = '${currentOverlay}' WHERE userID = ${message.author.id}`).run();
                            client.setEdited = sql.prepare(`UPDATE profiles SET edited = 1 WHERE userID = ${message.author.id}`).run();
                            msg.delete();
                            message.reply(`I've changed your avatar overlay to **${currentOverlayName}**.`);
                        }
                    }
                })
    
    
    
    
    
    
    
    
    
    
    
            })
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
  name: "setoverlay",
  category: "Profile",
  description: "Change your profile overlay.",
  usage: "setoverlay"
};
