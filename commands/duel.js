const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');
const Canvas = require('canvas');
var fs = require('fs');
const spawn = require('child_process').spawn;
const snekfetch = require('snekfetch');
var path = require('path');

exports.run = async (client, message, args, level) => {

    client.getProfile = sql.prepare('SELECT * FROM profiles WHERE userID = ?');
    let getProfile = client.getProfile.get(message.author.id);
    if (!getProfile) {
        message.reply(`I don't have an account for ${getProfile}. To set up an account, that users needs to run the \`\`.setup\`\` command.`);
    } else if (!message.mentions.users.first()){
    message.reply('please mention a user you want to duel.');
} else if (message.mentions.users.first() == message.author) {
    message.reply(`you can't duel yourself.`)
} else {
    client.getDuelingStatus = sql.prepare(`SELECT * FROM duel_elo WHERE userID = ?`);
    var getAuthorDuelingStatus = client.getDuelingStatus.get(message.author.id).dueling;
    var getTargetDuelingStatus = client.getDuelingStatus.get(message.mentions.users.first().id).dueling;
    if (getAuthorDuelingStatus == 1 || getTargetDuelingStatus == 1){
        message.reply('a user can only participate/be challenged in 1 duel at the same time. Either you or your opponent is currently dueling/waiting for a duel.');
    } else {

        let poseNames = args.slice(1).join(' ')
    var poseNameArray = []
  for (var i of poseNames) {
    i = i.replace(/\n/gi, "");
    i = i.replace(/'/gi, "'");
    poseNameArray.push(`${i}`);
  }
    var newArg = poseNameArray.join('');
    var splitArray = newArg.split(',')
    newArg = newArg.toLowerCase();
    var firstPoseCallName = splitArray[0].toLowerCase();
    if(!splitArray[1]){
        message.reply('please enter a second pose.');
    } else {
        client.secondProfilePose = sql.prepare(`SELECT * FROM profiles WHERE userID = ?`)
        var secondProfilePose =  client.secondProfilePose.get(message.mentions.users.first().id).trophyName;
        var secondPoseCallName = splitArray[1].substring(1)
        secondPoseCallName = secondPoseCallName.toLowerCase();
        client.getFirstPose = sql.prepare(`SELECT * FROM trophies_poses WHERE callName = ?`);
        var getFirstPose = client.getFirstPose.get(firstPoseCallName);
        var getSecondPose = client.getFirstPose.get(secondPoseCallName);
        if (!getFirstPose){
            message.reply(`Invalid pose specified: ${firstPoseCallName}`);
        } else if (!getSecondPose) {
            message.reply(`Invalid pose specified: ${secondPoseCallName}`);
        } else {
            client.getFirstPoseAmount = sql.prepare(`SELECT ${getFirstPose.name} FROM ${getFirstPose.champion}_poses WHERE userID = ?`);
            var getFirstPoseAmount = parseInt(Object.values(client.getFirstPoseAmount.get(message.author.id)))

            client.getSecondPoseAmount = sql.prepare(`SELECT ${getSecondPose.name} FROM ${getSecondPose.champion}_poses WHERE userID = ?`);
            var getSecondPoseAmount = parseInt(Object.values(client.getSecondPoseAmount.get(message.mentions.users.first().id)))
            if (getFirstPoseAmount < 1){
                message.reply(`you don't have any **${getFirstPose.alias}** pose shards.`);
            } else if(getSecondPoseAmount < 1){
                message.reply(`**${message.mentions.users.first().username}** doesn't have any **${getSecondPose.alias}** pose shards.`)
            } else if (getFirstPoseAmount == 1 && getProfile.trophyName == getFirstPose.name){
                message.reply(`can't duel using an equipped pose.`)
            } else if(getSecondPoseAmount == 1 && secondProfilePose == getSecondPose.name) {
                message.reply(`can't duel for an equipped pose.`)
            } else {
                let targetProfile = client.getProfile.get(message.mentions.users.first().id);
                let profileTargetName = message.mentions.users.first();
                let profileTargetUsername = message.mentions.users.first().username;
            
                if (!targetProfile){
                    message.reply(`I don't have an account for ${profileTargetName}. To set up an account, that users needs to run the \`\`.setup\`\` command.`);
                } else {
                    client.SetAuthorDuelingStatus = sql.prepare(`UPDATE duel_elo SET dueling = 1 WHERE userID = '${message.author.id}'`).run();
                    client.setTargetDuelingStatus = sql.prepare(`UPDATE duel_elo SET dueling = 1 WHERE userID = '${message.mentions.users.first().id}'`).run();
                    var duelConfirmation = new Discord.RichEmbed()
                    .setAuthor('Duel', client.user.avatarURL)
                    .setDescription(`**${message.author}** has challenged **${profileTargetName}** to a duel.\nWaiting for **${profileTargetUsername}'s** response.`)
                    .setImage('https://i.imgur.com/NXXbEQt.png')
                    .setColor('#FF4136')
                    .addField(`${message.author.username} wagers`, `${getFirstPose.alias}`, true)
                    .addField(`${message.author.username} wants`, `${getSecondPose.alias}`,true)
                    .addField('Accept', '<:accept:492752018742444034>', true)
                    .addField('Deny', '<:deny:492737458346393601>', true)
                    message.channel.send(duelConfirmation).then (msg => {
                        msg.react(':accept:492752018742444034').then (r => {
                            msg.react(':deny:492737458346393601')
                        })
                        var mentionedID = message.mentions.users.first().id;
                        const acceptFilter = (reaction, user) => reaction.emoji.identifier === `accept:492752018742444034` && user.id === mentionedID;
                        const denyFilter = (reaction, user) => reaction.emoji.identifier === `deny:492737458346393601` && user.id === mentionedID;


                        const acceptOption = msg.createReactionCollector(acceptFilter, {max: 1, time: 60000 });
                        const denyOption = msg.createReactionCollector(denyFilter, {max: 1, time: 60000 });
                        var denied = 0;
                        denyOption.on('collect', r => {
                            client.resetAuthorDuelingStatus = sql.prepare(`UPDATE duel_elo SET dueling = 0 WHERE userID = '${message.author.id}'`).run();
                          client.resetTargetDuelingStatus = sql.prepare(`UPDATE duel_elo SET dueling = 0 WHERE userID = '${message.mentions.users.first().id}'`).run();
                            r.message.delete();
                            message.reply('duel denied.');
                            denied = 1;
                            
                        });

                        acceptOption.on('collect', async r => {

                            getFirstPoseAmount = parseInt(Object.values(client.getFirstPoseAmount.get(message.author.id)));
                            getSecondPoseAmount = parseInt(Object.values(client.getSecondPoseAmount.get(message.mentions.users.first().id)));
                            secondProfilePose =  client.secondProfilePose.get(message.mentions.users.first().id).trophyName;
                            if (getFirstPoseAmount < 1){
                                msg.delete();
                                message.reply(`**${message.author.username}** doesn't have any **${getFirstPose.alias}** pose shards.`);
                            } else if(getSecondPoseAmount < 1){
                                msg.delete();
                                message.reply(`You don't have any **${getSecondPose.alias}** pose shards.`)
                            } else if (getFirstPoseAmount == 1 && getProfile.trophyName == getFirstPose.name){
                                msg.delete();
                                message.reply(`**${message.author.username}** can't duel using an equipped pose.`)
                            } else if(getSecondPoseAmount == 1 && secondProfilePose == getSecondPose.name) {
                                msg.delete();
                                message.reply(`You can't duel using an equipped pose.`)
                            } else {
                                r.message.delete();
                            var winnerUsername;
                            var loserUsername;
                            var winner;
                            var loser;
                            var winnerPoseName;
                            var winnerPoseChampion;
                            var loserPoseName;
                            var loserPoseChampion;
                            var winnerAvatar;
                            var loserAvatar;
                            var loserPoseAlias




                            var EloRank = require('elo-rank');
                            var elo = new EloRank(32);
                        
                        
                                client.getPlayer = sql.prepare(`SELECT * FROM duel_elo WHERE userID = ?`);
                                var playerA = client.getPlayer.get(`${message.author.id}`).elo;
                                var playerB = client.getPlayer.get(`${message.mentions.users.first().id}`).elo;
                                var oldPlayerA = client.getPlayer.get(`${message.author.id}`).elo;
                                var oldPlayerB = client.getPlayer.get(`${message.mentions.users.first().id}`).elo;
                        
                          //Gets expected score for first parameter
                          var expectedScoreA = elo.getExpected(playerA, playerB);
                          var expectedScoreB = elo.getExpected(playerB, playerA);
                          var roundedExpectedScoreA = Math.round(expectedScoreA * 100);
                          var roundedExpectedScoreB = Math.round(expectedScoreB * 100);
                          var randomRoll = Math.floor(Math.random() * 100 + 1);
                          if (randomRoll <= 50){
                              var playerAResult = 1;
                              var playerBResult = 0;
                              winnerUsername = message.author.username;
                            loserUsername = message.mentions.users.first().username;
                            winner = message.author.id;
                            winnerPoseName = getFirstPose.name;
                            winnerPoseChampion = getFirstPose.champion;
                            winnerAvatar = message.author.displayAvatarURL
                            loser = message.mentions.users.first().id;
                            loserPoseName = getSecondPose.name;
                            loserPoseChampion = getSecondPose.champion;
                            loserAvatar = message.mentions.users.first().displayAvatarURL;
                            loserPoseAlias = getSecondPose.alias;
                          } else {
                              var playerAResult = 0;
                              var playerBResult = 1;
                              winnerUsername = message.mentions.users.first().username;
                                loserUsername = message.author.username;
                                winner = message.mentions.users.first().id;
                                winnerPoseName = getSecondPose.name;
                                winnerPoseChampion = getSecondPose.champion;
                                winnerAvatar = message.mentions.users.first().displayAvatarURL;
                                loser = message.author.id;
                                loserPoseName = getFirstPose.name;
                                loserPoseChampion = getFirstPose.champion;
                                loserAvatar = message.author.displayAvatarURL;
                                loserPoseAlias = getFirstPose.alias
                          }
                          
                          


                            message.channel.send(`Calculating damage.`).then (async msg => {
                                var canvas = Canvas.createCanvas(480, 204);
                                var ctx = canvas.getContext('2d');
                            
                                    const background1 = await Canvas.loadImage(`./assets/gif/indiana_jones/duel_1.png`);
                                    const background2 = await Canvas.loadImage(`./assets/gif/indiana_jones/duel_2.png`);
                                    const background3 = await Canvas.loadImage(`./assets/gif/indiana_jones/duel_3.png`);
                                    const background4 = await Canvas.loadImage(`./assets/gif/indiana_jones/duel_4.png`);
                                    const background5 = await Canvas.loadImage(`./assets/gif/indiana_jones/duel_5.png`);
                                    const background6 = await Canvas.loadImage(`./assets/gif/indiana_jones/duel_6.png`);
                                    const background7 = await Canvas.loadImage(`./assets/gif/indiana_jones/duel_7.png`);
                                    const background8 = await Canvas.loadImage(`./assets/gif/indiana_jones/duel_8.png`);
                                    const background9 = await Canvas.loadImage(`./assets/gif/indiana_jones/duel_9.png`);
                                    const background10 = await Canvas.loadImage(`./assets/gif/indiana_jones/duel_10.png`);
                                    const background11 = await Canvas.loadImage(`./assets/gif/indiana_jones/duel_11.png`);
                                    const background12 = await Canvas.loadImage(`./assets/gif/indiana_jones/duel_12.png`);
                                    const background13 = await Canvas.loadImage(`./assets/gif/indiana_jones/duel_13.png`);
                                    const background14 = await Canvas.loadImage(`./assets/gif/indiana_jones/duel_14.png`);
                                    const background15 = await Canvas.loadImage(`./assets/gif/indiana_jones/duel_15.png`);
                                    const background16 = await Canvas.loadImage(`./assets/gif/indiana_jones/duel_16.png`);
                                    const background17 = await Canvas.loadImage(`./assets/gif/indiana_jones/duel_17.png`);
                                    const background18 = await Canvas.loadImage(`./assets/gif/indiana_jones/duel_18.png`);
                                    const background19 = await Canvas.loadImage(`./assets/gif/indiana_jones/duel_19.png`);
                                    const background20 = await Canvas.loadImage(`./assets/gif/indiana_jones/duel_20.png`);
                                    ctx.drawImage(background1, 0, 0, canvas.width, canvas.height);
                            
                                    const { body: buffer } = await snekfetch.get(winnerAvatar);
                                    const avatar = await Canvas.loadImage(buffer);
                                    const { body: buffer2 } = await snekfetch.get(loserAvatar);
                                    const avatar2 = await Canvas.loadImage(buffer2);
                                    ctx.drawImage(avatar, 185, 0, 65, 65);
                                    var messageTimestamp = msg.createdTimestamp;
                                    var buf = canvas.toBuffer();
                                    fs.writeFileSync(`./assets/gif/duel/duel_${messageTimestamp}_${winner}_1.png`, buf);
                            
                                    ctx.drawImage(background2, 0, 0, canvas.width, canvas.height);
                                    ctx.drawImage(avatar, 190, 0, 65, 65);
                                    var buf = canvas.toBuffer();
                                    fs.writeFileSync(`./assets/gif/duel/duel_${messageTimestamp}_${winner}_2.png`, buf);
                            
                                    ctx.drawImage(background3, 0, 0, canvas.width, canvas.height);
                                    ctx.drawImage(avatar, 192, 0, 65, 65);
                                    var buf = canvas.toBuffer();
                                    fs.writeFileSync(`./assets/gif/duel/duel_${messageTimestamp}_${winner}_3.png`, buf);
                            
                                    ctx.drawImage(background4, 0, 0, canvas.width, canvas.height);
                                    ctx.drawImage(avatar, 192, -1, 65, 65);
                                    var buf = canvas.toBuffer();
                                    fs.writeFileSync(`./assets/gif/duel/duel_${messageTimestamp}_${winner}_4.png`, buf);
                            
                                    ctx.drawImage(background5, 0, 0, canvas.width, canvas.height);
                                    ctx.drawImage(avatar, 192, -2, 65, 65);
                                    var buf = canvas.toBuffer();
                                    fs.writeFileSync(`./assets/gif/duel/duel_${messageTimestamp}_${winner}_5.png`, buf);
                            
                                    ctx.drawImage(background6, 0, 0, canvas.width, canvas.height);
                                    ctx.drawImage(avatar2, 300, 50, 25, 25);
                                    var buf = canvas.toBuffer();
                                    fs.writeFileSync(`./assets/gif/duel/duel_${messageTimestamp}_${winner}_6.png`, buf);
                            
                                    ctx.drawImage(background7, 0, 0, canvas.width, canvas.height);
                                    ctx.drawImage(avatar2, 303, 50, 25, 25);
                                    var buf = canvas.toBuffer();
                                    fs.writeFileSync(`./assets/gif/duel/duel_${messageTimestamp}_${winner}_7.png`, buf);
                            
                                    ctx.drawImage(background8, 0, 0, canvas.width, canvas.height);
                                    ctx.drawImage(avatar2, 302, 51, 25, 25);
                                    var buf = canvas.toBuffer();
                                    fs.writeFileSync(`./assets/gif/duel/duel_${messageTimestamp}_${winner}_8.png`, buf);
                            
                                    ctx.drawImage(background9, 0, 0, canvas.width, canvas.height);
                                    ctx.drawImage(avatar2, 302, 52, 25, 25);
                                    var buf = canvas.toBuffer();
                                    fs.writeFileSync(`./assets/gif/duel/duel_${messageTimestamp}_${winner}_9.png`, buf);
                            
                                    ctx.drawImage(background10, 0, 0, canvas.width, canvas.height);
                                    ctx.drawImage(avatar2, 302, 51, 25, 25);
                                    var buf = canvas.toBuffer();
                                    fs.writeFileSync(`./assets/gif/duel/duel_${messageTimestamp}_${winner}_10.png`, buf);
                            
                                    ctx.drawImage(background11, 0, 0, canvas.width, canvas.height);
                                    ctx.drawImage(avatar2, 305, 50, 23, 23);
                                    ctx.drawImage(avatar, 155, 20, 40, 40);
                                    var buf = canvas.toBuffer();
                                    fs.writeFileSync(`./assets/gif/duel/duel_${messageTimestamp}_${winner}_11.png`, buf);
                            
                                    ctx.drawImage(background12, 0, 0, canvas.width, canvas.height);
                                    ctx.drawImage(avatar2, 305, 55, 23, 23);
                                    ctx.drawImage(avatar, 160, 20, 40, 40);
                                    var buf = canvas.toBuffer();
                                    fs.writeFileSync(`./assets/gif/duel/duel_${messageTimestamp}_${winner}_12.png`, buf);
                            
                                    ctx.drawImage(background13, 0, 0, canvas.width, canvas.height);
                                    ctx.drawImage(avatar2, 305, 75, 23, 23);
                                    ctx.drawImage(avatar, 170, 20, 40, 40);
                                    var buf = canvas.toBuffer();
                                    fs.writeFileSync(`./assets/gif/duel/duel_${messageTimestamp}_${winner}_13.png`, buf);
                            
                                    ctx.drawImage(background14, 0, 0, canvas.width, canvas.height);
                                    ctx.drawImage(avatar, 175, 20, 40, 40);
                                    var buf = canvas.toBuffer();
                                    fs.writeFileSync(`./assets/gif/duel/duel_${messageTimestamp}_${winner}_14.png`, buf);
                            
                                    ctx.drawImage(background15, 0, 0, canvas.width, canvas.height);
                                    ctx.drawImage(avatar, 195, 20, 40, 40);
                                    var buf = canvas.toBuffer();
                                    fs.writeFileSync(`./assets/gif/duel/duel_${messageTimestamp}_${winner}_15.png`, buf);
                            
                                    ctx.drawImage(background16, 0, 0, canvas.width, canvas.height);
                                    ctx.drawImage(avatar, 205, 20, 40, 40);
                                    var buf = canvas.toBuffer();
                                    fs.writeFileSync(`./assets/gif/duel/duel_${messageTimestamp}_${winner}_16.png`, buf);
                            
                                    ctx.drawImage(background17, 0, 0, canvas.width, canvas.height);
                                    ctx.drawImage(avatar, 213, 18, 40, 40);
                                    var buf = canvas.toBuffer();
                                    fs.writeFileSync(`./assets/gif/duel/duel_${messageTimestamp}_${winner}_17.png`, buf);
                                    
                                    ctx.drawImage(background18, 0, 0, canvas.width, canvas.height);
                                    ctx.drawImage(avatar, 211, 18, 40, 40);
                                    var buf = canvas.toBuffer();
                                    fs.writeFileSync(`./assets/gif/duel/duel_${messageTimestamp}_${winner}_18.png`, buf);
                            
                                    ctx.drawImage(background19, 0, 0, canvas.width, canvas.height);
                                    ctx.drawImage(avatar, 200, 15, 40, 40);
                                    var buf = canvas.toBuffer();
                                    fs.writeFileSync(`./assets/gif/duel/duel_${messageTimestamp}_${winner}_19.png`, buf);
                            
                                    ctx.drawImage(background20, 0, 0, canvas.width, canvas.height);
                                    ctx.drawImage(avatar, 190, 13, 40, 40);
                                    var buf = canvas.toBuffer();
                                    fs.writeFileSync(`./assets/gif/duel/duel_${messageTimestamp}_${winner}_20.png`, buf);
                            
                                const gifOptions = [
                                    "-o", `assets/gif/duel_${messageTimestamp}_${winner}.gif`,
                                    "--fast",
                                    "--fps", "7",
                                    `assets/gif/duel/duel_${messageTimestamp}_${winner}_*.png`
                                ];
                                const proc = spawn('gifski', gifOptions)
                            .on('error', async function(error) {
                                console.log("ERROR: DETAILS: " + error);
                              })
                              .on('close', async function(code) {
                                console.log("SUCCESS: CODE: " + code);
                                msg.delete();
                                message.channel.send(`**${winnerUsername}** wins and takes **${loserPoseAlias}** from **${loserUsername}**.`, {files: [`./assets/gif/duel_${messageTimestamp}_${winner}.gif`]}).then (msg => {
                                    for (i = 1; i < 21; i++){
                                        fs.unlink(`./assets/gif/duel/duel_${messageTimestamp}_${winner}_${i}.png`, (err) => {
                                            if (err) throw err;
                                            
                                          });
                                        }
                                        fs.unlink(`./assets/gif/duel_${messageTimestamp}_${winner}.gif`, (err) => {
                                            if (err) throw err;
                                          });
                                })
    
                                
    
                              })
                            })
                            client.updateWinner = sql.prepare(`UPDATE ${loserPoseChampion}_poses SET ${loserPoseName} = ${loserPoseName} + 1 WHERE userID = ${winner}`).run();
                            client.updateLoser = sql.prepare(`UPDATE ${loserPoseChampion}_poses SET ${loserPoseName} = ${loserPoseName} - 1 WHERE userID = ${loser}`).run();
                            client.updateWins = sql.prepare(`UPDATE duel_elo SET duelWins = duelWins + 1 WHERE userID = ${winner}`).run();
                            client.updateLosses = sql.prepare(`UPDATE duel_elo SET duelLosses = duelLosses + 1 WHERE userID = ${loser}`).run();
                        //update score, 1 if won 0 if lost
                          playerA = elo.updateRating(expectedScoreA, playerAResult, playerA);
                          playerB = elo.updateRating(expectedScoreB, playerBResult, playerB);
                          client.setPlayerA = sql.prepare(`UPDATE duel_elo SET elo = ${playerA} WHERE userID = '${message.author.id}'`).run();
                          client.setPlayerB = sql.prepare(`UPDATE duel_elo SET elo = ${playerB} WHERE userID = '${message.mentions.users.first().id}'`).run();
                          client.resetAuthorDuelingStatus = sql.prepare(`UPDATE duel_elo SET dueling = 0 WHERE userID = '${message.author.id}'`).run();
                          client.resetTargetDuelingStatus = sql.prepare(`UPDATE duel_elo SET dueling = 0 WHERE userID = '${message.mentions.users.first().id}'`).run();
                            }
                            
                        })
                        acceptOption.on('end', collected => {
                        client.resetAuthorDuelingStatus = sql.prepare(`UPDATE duel_elo SET dueling = 0 WHERE userID = '${message.author.id}'`).run();
                        client.resetTargetDuelingStatus = sql.prepare(`UPDATE duel_elo SET dueling = 0 WHERE userID = '${message.mentions.users.first().id}'`).run();
                        if (denied == 1){
                        } else {
                            msg.clearReactions();
                            msg.edit('Duel timed out', {embed: null});
                        }
                        
                            
                        })


                    })
                }
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
  name: "duel",
  category: "Profile",
  description: "Challenge another member for a duel.",
  usage: "duel <member name> <wagered pose name>, <wanted pose name>"
};