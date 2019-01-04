const Discord = require("discord.js");
const Canvas = require('canvas');
const snekfetch = require('snekfetch');
var path = require('path');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');
var fs = require('fs');
const spawn = require('child_process').spawn;

exports.run = async (client, message, args, level) => {

    let profileTarget;
    let profileMember;
    let userName;
    let profileLevel;
    let profileTargetName;
    let profilePicture;
    if(!message.mentions.users.first()){
    profileTarget = message.author.id;
    profileMember = message.member;
    userName = message.author.username;
    profileLevel = `${((message.createdTimestamp - message.member.joinedAt) / 86400000).toFixed()}`;
    profileTargetName = message.author;
    profilePicture = message.author.displayAvatarURL;
    } else {
    profileTarget = message.mentions.users.first().id;
    profileMember = message.mentions.members.first();
    userName = message.mentions.users.first().username;
    profileLevel = `${((message.createdTimestamp - message.mentions.members.first().joinedAt) / 86400000).toFixed()}`;
    profileTargetName = message.mentions.users.first();
    profilePicture = message.mentions.users.first().displayAvatarURL;
    }


    client.getProfile = sql.prepare(`SELECT * FROM profiles WHERE userID = ?`);
  client.getTrophies = sql.prepare(`SELECT * FROM trophies_poses WHERE name = ?`);
  client.getBackground = sql.prepare(`SELECT * FROM background_names WHERE name = ?`);
  let profileInfo = client.getProfile.get(profileTarget);

    if (!profileInfo) {
        message.reply(`I don't have an account for ${profileTargetName}. To set up an account, that users needs to run the \`\`.setup\`\` command.`);
    
      } if(profileInfo.trophyName == "none")
      {
        let backgroundPath = client.getBackground.get(profileInfo.backgroundName);
        let trophyInfo = client.getTrophies.get(profileInfo.trophyName);
        const canvas = Canvas.createCanvas(300, 300);
        const ctx = canvas.getContext('2d');

        // Since the image takes time to load, you should await it
    const background = await Canvas.loadImage(`${backgroundPath.path}`);
    // This uses the canvas dimensions to stretch the image onto the entire canvas
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


    const platform = await Canvas.loadImage(`./assets/img/profile/trophies/platform/${profileInfo.trophyTier}.png`);
        ctx.drawImage(platform, 118, 202, 240, 156.6);


        if(profileInfo.trophyName == "none"){
    
        } else {
    
          const trophy = await Canvas.loadImage(trophyInfo.path)
          ctx.drawImage(trophy, 51, 39, 350, 350)
        }

        const overlay = await Canvas.loadImage('./assets/img/profile/overlay.png')
        ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);


        Canvas.registerFont(path.join('./assets/fonts/', "Beaufort-Bold.ttf"), { family: "Beaufort-Bold"});

        ctx.font = '16px Beaufort-Bold';
        ctx.fillStyle = '#f0e6d2';
        ctx.textAlign = 'center';
        ctx.fillText(userName, canvas.width / 2, 73);

        var rankLine;
        var unranked = 0;
        if(profileMember.roles.has('403117562025607170')){
            rankLine = 'challenger'
        } else if(profileMember.roles.has('403117562843496448')){
            rankLine = 'master'
        } else if(profileMember.roles.has('403117563279835137')){
            rankLine = 'diamond'
        } else if(profileMember.roles.has('403117563753529355')){
            rankLine = 'platinum'
        } else if(profileMember.roles.has('403117564693053450')){
            rankLine = 'gold'
        } else if(profileMember.roles.has('403117565091774465')){
            rankLine = 'silver'
        } else if(profileMember.roles.has('403117566060396544')){
            rankLine = 'bronze'
        } else {
            unranked = 1
        }
        if(unranked == 0){
            const rank = await Canvas.loadImage(`./assets/img/profile/rank_${rankLine}.png`)
            ctx.drawImage(rank, 90, 75, 120, 20);
        } else {

        }


        //BACKGROUND
          // Pick up the pen
          ctx.beginPath();
          // Start the arc to form a circle
          ctx.arc(506, 104, 50, 0, Math.PI * 2, true);
          // Put the pen down
          ctx.closePath();
          // Fill the region you drew on
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();

        const { body: buffer } = await snekfetch.get(profilePicture);
        const avatar = await Canvas.loadImage(buffer);


        ctx.save();
        // Pick up the pen
        ctx.beginPath();
        // Start the arc to form a circle
        ctx.arc(54, 63, 31, 0, Math.PI * 2, true);
        // Put the pen down
        ctx.closePath();
        // Clip off the region you drew on
        ctx.clip();
      
        // Move the image
        ctx.drawImage(avatar, 23, 32, 62, 62);
     //AVATAR OVERLAY
        
        ctx.restore();


        var getOverlay = client.getProfile.get(profileTarget).avatarOverlay
        client.getOverlay = sql.prepare(`SELECT * FROM avatar_overlay_info WHERE name = ?`);
        var overlayPath = client.getOverlay.get(getOverlay).path

        const avatarOverlay = await Canvas.loadImage(overlayPath);
        ctx.drawImage(avatarOverlay, -12, -2, 130, 130);

        var overlayTier = client.getOverlay.get(getOverlay).tier;
        if(overlayTier == 'tier2'){
        ctx.font = '10px Beaufort-Bold';
        ctx.fillStyle = '#9b9789';
        ctx.textAlign = 'center';
        ctx.fillText(profileLevel, 54, 102);
        } else {
        ctx.font = '13px Beaufort-Bold';
        ctx.fillStyle = '#9b9789';
        ctx.textAlign = 'center';
        ctx.fillText(profileLevel, 53, 100);
        }
        

        

        Canvas.registerFont(path.join('./assets/fonts/', "Abel-Regular.ttf"), { family: "Abel-Regular"});
        const bioTextArgs = profileInfo.bioText
        ctx.font = '14px Abel-Regular';
        ctx.fillStyle = '#f0e6d2';
        ctx.textAlign = 'left';
        ctx.fillText(bioTextArgs, 12, 165);


    // Use helpful Attachment class structure to process the file for you
    const attachment = new Discord.Attachment(canvas.toBuffer(), `${profileTarget}_profile.png`);
      
    message.channel.send(`${profileTargetName.username}'s profile.`, attachment);
      }else {
        var getSavingStatus = client.getProfile.get(profileTarget).currentlySaving;
        var getEditedStatus = client.getProfile.get(profileTarget).edited;
        var getCurrentTrophy = client.getProfile.get(profileTarget).trophyName;
        client.getTrophyPrice = sql.prepare(`SELECT * FROM trophies_poses WHERE name = ?`);
        var getTrophyPrice = client.getTrophyPrice.get(getCurrentTrophy).price;
        if (getSavingStatus == 1){
            message.reply('that profile is currently being saved, please wait.');
        } else if (getEditedStatus == 1 && getTrophyPrice == 10000){
            client.getAllSavingStatus = sql.prepare(`SELECT * FROM profiles WHERE currentlySaving = ?`);
        var getAllSavingStatus = client.getAllSavingStatus.get(1);
        console.log(getAllSavingStatus);
        if(!getAllSavingStatus){
            client.setEdited = sql.prepare(`UPDATE profiles SET currentlySaving = 1 WHERE userID = ${profileTarget}`).run();
            if(!message.mentions.users.first()){
                message.reply(`it looks like you just edited your profile and have a GIF pose equipped.\nGive me just a minute or so to encode it! <:wave:465949859111763968>\nI'll let you know when I'm finished.`)
            } else {
                message.reply(`it looks like ${profileMember} just edited their profile and has a GIF pose equipped.\nGive me just a minute or so to encode it! <:wave:465949859111763968>\nI'll let you know when I'm finished.`)
            }
            
            

            var sequenceCanvas = Canvas.createCanvas(300, 300);
            var gifCtx = sequenceCanvas.getContext('2d');

            client.getFrameCount = sql.prepare(`SELECT frames FROM pose_frames WHERE name = ?`);
            var getFrameCount = parseInt(Object.values(client.getFrameCount.get(getCurrentTrophy)));
            var getFrameCount = getFrameCount + 1;
            let backgroundPath = client.getBackground.get(profileInfo.backgroundName);
            for (i = 1; i < getFrameCount; i++){
                const gifBackground = await Canvas.loadImage(`${backgroundPath.path}`);
                // This uses the canvas dimensions to stretch the image onto the entire canvas
                gifCtx.drawImage(gifBackground, 0, 0, sequenceCanvas.width, sequenceCanvas.height);

                const gifPlatform = await Canvas.loadImage(`./assets/img/profile/trophies/platform/${profileInfo.trophyTier}.png`);
                gifCtx.drawImage(gifPlatform, 118, 202, 240, 156.6);


                Canvas.registerFont(path.join('./assets/fonts/', "Beaufort-Bold.ttf"), { family: "Beaufort-Bold"});




                var data = fs.readFileSync(`./assets/img/profile/trophies/gif/${getCurrentTrophy}/${getCurrentTrophy}_sequence_${i}.png`);
                console.log(`Rendering ${getCurrentTrophy} Sequence for ${userName}. Frame ${i}/${getFrameCount - 1}.`)
                var img = new Canvas.Image; 
                img.src = data;
                gifCtx.drawImage(img, 51, 39, 350, 350);

                const gifOverlay = await Canvas.loadImage('./assets/img/profile/overlay.png')
                gifCtx.drawImage(gifOverlay, 0, 0, sequenceCanvas.width, sequenceCanvas.height);

                gifCtx.font = '16px Beaufort-Bold';
                gifCtx.fillStyle = '#f0e6d2';
                gifCtx.textAlign = 'center';
                gifCtx.fillText(userName, sequenceCanvas.width / 2, 73);

                var gifRankLine;
                var gifUnranked = 0;
                if(profileMember.roles.has('403117562025607170')){
                    gifRankLine = 'challenger'
                } else if(profileMember.roles.has('403117562843496448')){
                    gifRankLine = 'master'
                } else if(profileMember.roles.has('403117563279835137')){
                    gifRankLine = 'diamond'
                } else if(profileMember.roles.has('403117563753529355')){
                    gifRankLine = 'platinum'
                } else if(profileMember.roles.has('403117564693053450')){
                    gifRankLine = 'gold'
                } else if(profileMember.roles.has('403117565091774465')){
                    gifRankLine = 'silver'
                } else if(profileMember.roles.has('403117566060396544')){
                    gifRankLine = 'bronze'
                } else {
                    gifUnranked = 1
                }
                if(gifUnranked == 0){
                    const gifRank = await Canvas.loadImage(`./assets/img/profile/rank_${gifRankLine}.png`)
                    gifCtx.drawImage(gifRank, 90, 75, 120, 20);
                } else {
        
                }

                Canvas.registerFont(path.join('./assets/fonts/', "Abel-Regular.ttf"), { family: "Abel-Regular"});
                const gifBioTextArgs = profileInfo.bioText
                gifCtx.font = '14px Abel-Regular';
                gifCtx.fillStyle = '#f0e6d2';
                gifCtx.textAlign = 'left';
                gifCtx.fillText(gifBioTextArgs, 12, 165);

                //BACKGROUND
          // Pick up the pen
          gifCtx.beginPath();
          // Start the arc to form a circle
          gifCtx.arc(506, 104, 50, 0, Math.PI * 2, true);
          // Put the pen down
          gifCtx.closePath();
          // Fill the region you drew on
          gifCtx.fillStyle = "#FFFFFF";
          gifCtx.fill();

        const { body: buffer } = await snekfetch.get(profilePicture);
        const avatar = await Canvas.loadImage(buffer);


        gifCtx.save();
        // Pick up the pen
        gifCtx.beginPath();
        // Start the arc to form a circle
        gifCtx.arc(54, 63, 31, 0, Math.PI * 2, true);
        // Put the pen down
        gifCtx.closePath();
        // Clip off the region you drew on
        gifCtx.clip();
      
        // Move the image
        gifCtx.drawImage(avatar, 23, 32, 62, 62);
     //AVATAR OVERLAY
        
     gifCtx.restore();


        var getOverlay = client.getProfile.get(profileTarget).avatarOverlay
        client.getOverlay = sql.prepare(`SELECT * FROM avatar_overlay_info WHERE name = ?`);
        var overlayPath = client.getOverlay.get(getOverlay).path

        const avatarOverlay = await Canvas.loadImage(overlayPath);
        gifCtx.drawImage(avatarOverlay, -12, -2, 130, 130);

        // const spookyHat = await Canvas.loadImage(`./assets/img/events/halloween/hat.png`);
        // gifCtx.save()
        // gifCtx.translate(sequenceCanvas.width, 0);
        // gifCtx.scale(-1, 1);
        // gifCtx.drawImage(spookyHat, 200, -25, 100, 72);
        // gifCtx.restore();

        var overlayTier = client.getOverlay.get(getOverlay).tier;
        if(overlayTier == 'tier2'){
        gifCtx.font = '10px Beaufort-Bold';
        gifCtx.fillStyle = '#9b9789';
        gifCtx.textAlign = 'center';
        gifCtx.fillText(profileLevel, 54, 102);
        } else {
        gifCtx.font = '13px Beaufort-Bold';
        gifCtx.fillStyle = '#9b9789';
        gifCtx.textAlign = 'center';
        gifCtx.fillText(profileLevel, 53, 100);
        }

                var buf = sequenceCanvas.toBuffer();
                fs.writeFileSync(`./images/img_${profileTarget}_${i}.png`, buf);
            }


            const gifOptions = [
                "-o", `profiles/profile_${profileTarget}.gif`,
                "--fps", "25",
                `images/img_${profileTarget}_*.png`
            ];
            const proc = spawn('gifski', gifOptions)
            .on('error', function(error) {
                console.log("ERROR: DETAILS: " + error);
              })
              .on('close', function(code) {
                for (i = 1; i < getFrameCount; i++){
                    fs.unlink(`./images/img_${profileTarget}_${i}.png`, (err) => {
                        if (err) throw err;
                        
                      });
                }
                console.log("SUCCESS: CODE: " + code);
                console.log(`Image sequence ${getCurrentTrophy} for ${userName} was deleted`);
                if(!message.mentions.users.first()){
                    message.reply('encoding finished. Your profile will now be stored until the next time you edit it.');
                } else {
                    message.reply(`encoding finished. ${profileTargetName.username}'s profile will now be stored until the next time they edit it.`);
                }
                message.channel.send('', {files: [`./profiles/profile_${profileTarget}.gif`]});
                client.setEdited = sql.prepare(`UPDATE profiles SET currentlySaving = 0 WHERE userID = ${profileTarget}`).run();
                client.setEdited = sql.prepare(`UPDATE profiles SET edited = 0 WHERE userID = ${profileTarget}`).run();
              })
        } else {
            message.reply('only 1 user can be encoding their profile at once.')
        }

            


    









        } else if (getEditedStatus == 0 && getTrophyPrice == 10000){
            message.channel.send(`${profileTargetName.username}'s profile.`, {files: [`./profiles/profile_${profileTarget}.gif`]});

        } else {
            let backgroundPath = client.getBackground.get(profileInfo.backgroundName);
        let trophyInfo = client.getTrophies.get(profileInfo.trophyName);
        const canvas = Canvas.createCanvas(300, 300);
        const ctx = canvas.getContext('2d');

        // Since the image takes time to load, you should await it
    const background = await Canvas.loadImage(`${backgroundPath.path}`);
    // This uses the canvas dimensions to stretch the image onto the entire canvas
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


    const platform = await Canvas.loadImage(`./assets/img/profile/trophies/platform/${profileInfo.trophyTier}.png`);
        ctx.drawImage(platform, 118, 202, 240, 156.6);


        if(profileInfo.trophyName == "none"){
    
        } else {
    
          const trophy = await Canvas.loadImage(trophyInfo.path)
          ctx.drawImage(trophy, 51, 39, 350, 350)
        }

        const overlay = await Canvas.loadImage('./assets/img/profile/overlay.png')
        ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);


        Canvas.registerFont(path.join('./assets/fonts/', "Beaufort-Bold.ttf"), { family: "Beaufort-Bold"});

        ctx.font = '16px Beaufort-Bold';
        ctx.fillStyle = '#f0e6d2';
        ctx.textAlign = 'center';
        ctx.fillText(userName, canvas.width / 2, 73);

        var rankLine;
        var unranked = 0;
        if(profileMember.roles.has('403117562025607170')){
            rankLine = 'challenger'
        } else if(profileMember.roles.has('403117562843496448')){
            rankLine = 'master'
        } else if(profileMember.roles.has('403117563279835137')){
            rankLine = 'diamond'
        } else if(profileMember.roles.has('403117563753529355')){
            rankLine = 'platinum'
        } else if(profileMember.roles.has('403117564693053450')){
            rankLine = 'gold'
        } else if(profileMember.roles.has('403117565091774465')){
            rankLine = 'silver'
        } else if(profileMember.roles.has('403117566060396544')){
            rankLine = 'bronze'
        } else {
            unranked = 1
        }
        if(unranked == 0){
            const rank = await Canvas.loadImage(`./assets/img/profile/rank_${rankLine}.png`)
            ctx.drawImage(rank, 90, 75, 120, 20);
        } else {

        }


        //BACKGROUND
          // Pick up the pen
          ctx.beginPath();
          // Start the arc to form a circle
          ctx.arc(506, 104, 50, 0, Math.PI * 2, true);
          // Put the pen down
          ctx.closePath();
          // Fill the region you drew on
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();

        const { body: buffer } = await snekfetch.get(profilePicture);
        const avatar = await Canvas.loadImage(buffer);


        ctx.save();
        // Pick up the pen
        ctx.beginPath();
        // Start the arc to form a circle
        ctx.arc(54, 63, 31, 0, Math.PI * 2, true);
        // Put the pen down
        ctx.closePath();
        // Clip off the region you drew on
        ctx.clip();
      
        // Move the image
        ctx.drawImage(avatar, 23, 32, 62, 62);
     //AVATAR OVERLAY
        
        ctx.restore();


        var getOverlay = client.getProfile.get(profileTarget).avatarOverlay
        client.getOverlay = sql.prepare(`SELECT * FROM avatar_overlay_info WHERE name = ?`);
        var overlayPath = client.getOverlay.get(getOverlay).path

        const avatarOverlay = await Canvas.loadImage(overlayPath);
        ctx.drawImage(avatarOverlay, -12, -2, 130, 130);


        // var getHat = client.getProfile.get(profileTarget).hatName;
        // console.log(getHat);
        // client.getHatPath = sql.prepare(`SELECT * FROM hats WHERE name = ?`);
        // var getHatPath = client.getHatPath.get(getHat).path;
        // console.log(getHatPath);
        // const spookyHat = await Canvas.loadImage(`./assets/img/events/halloween/hat.png`);
        // ctx.save()
        // ctx.translate(canvas.width, 0);
        // ctx.scale(-1, 1);
        // ctx.drawImage(spookyHat, 200, -25, 100, 72);
        // ctx.restore();

        var overlayTier = client.getOverlay.get(getOverlay).tier;
        if(overlayTier == 'tier2'){
        ctx.font = '10px Beaufort-Bold';
        ctx.fillStyle = '#9b9789';
        ctx.textAlign = 'center';
        ctx.fillText(profileLevel, 54, 102);
        } else {
        ctx.font = '13px Beaufort-Bold';
        ctx.fillStyle = '#9b9789';
        ctx.textAlign = 'center';
        ctx.fillText(profileLevel, 53, 100);
        }
        

        

        Canvas.registerFont(path.join('./assets/fonts/', "Abel-Regular.ttf"), { family: "Abel-Regular"});
        const bioTextArgs = profileInfo.bioText
        ctx.font = '14px Abel-Regular';
        ctx.fillStyle = '#f0e6d2';
        ctx.textAlign = 'left';
        ctx.fillText(bioTextArgs, 12, 165);


    // Use helpful Attachment class structure to process the file for you
    const attachment = new Discord.Attachment(canvas.toBuffer(), `${profileTarget}_profile.png`);
      
    message.channel.send(`${profileTargetName.username}'s profile.`, attachment);
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
  name: "profile",
  category: "Profile",
  description: "Profile command.",
  usage: "profile"
};