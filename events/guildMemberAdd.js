const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');

module.exports = (client, member) => {
  // Load the guild's settings
  const settings = client.getGuildSettings(member.guild);

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== "true") return;
     var joinEmbed = new Discord.RichEmbed()
    .setDescription(`${member.user} ${member.user.tag}`)
    .setAuthor("Member Joined", `${member.user.displayAvatarURL}`)
    .setColor("#2ECC40")
    .setThumbnail(`${member.user.displayAvatarURL}`)
    .setFooter(`User ID: ${member.user.id}`)
    .setTimestamp(member.user.joinedAt);
    client.channels.get('418015132019458048').send(joinEmbed);
  
    var dmEmbed = new Discord.RichEmbed()
    // .setAuthor(`${client.guilds.find('id', '313985685839413248').name}`, `${client.guilds.find('id', '313985685839413248').iconURL}`)
    .setAuthor(`${client.guilds.find(g => g.id === '313985685839413248').name}`, `${client.guilds.find(g => g.id === '313985685839413248').iconURL}`)
    .setDescription('Hello and welcome to ADC Mains, a Discord server dedicated to helping and discussing everything ADC. <:wave:465949859111763968>\nPlease refer to <#314011786867376129> and <#314061205767454722> to get yourself started.\nIf you want to join an ADC related club, check out <#416879920069738496>.\nIf you are having a problem accessing the text channels, check out my next message! <:wave:465949859111763968>')
    .setImage('https://i.imgur.com/fpFBycA.png');

    var dmEmbed2 = new Discord.RichEmbed()
    // .setAuthor(`ADC server guidelines`, `${client.guilds.find('id', '313985685839413248').iconURL}`)
    .setAuthor(`ADC server guidelines`, `${client.guilds.find(g => g.id === '313985685839413248').iconURL}`)
    .addField(`Roles.`, `To keep the server clean, we would like it if everyone had a ranked role.\nA how-to guide on syncing your account with Orianna Bot can be found in <#314006279507017730>'s pinned messages.`)
    .addField(`It doesn't stop there.`, `You will also receive champion specific roles based on your Mastery Level and Mastery Points`)
    .setImage('https://i.imgur.com/KOoods6.png');

    member.send(dmEmbed);
    member.send(dmEmbed2);
    member.addRole("314003627557519361");
    member.addRole("453204352438632449");
    member.addRole("453205722864418827");




    client.getProfile = sql.prepare('SELECT * FROM profiles WHERE userID = ?');
    client.setProfile = sql.prepare("INSERT OR REPLACE INTO profiles (userID, rpAmount, backgroundName, bioText, trophyName, trophyTier, avatarOverlay, edited, currentlySaving, lastChest) VALUES (@userID, @rpAmount, @backgroundName, @bioText, @trophyName, @trophyTier, @avatarOverlay, @edited, @currentlySaving, @lastChest);");
    let profileInfo = client.getProfile.get(`${member.user.id}`);
    if(!profileInfo) {
        profileInfo = {
            userID: `${member.user.id}`,
            rpAmount: 0,
            backgroundName: "313985685839413248janna313985685839413248",
            bioText: "Cool text.",
            trophyName: "none",
            trophyTier: "tier1",
            avatarOverlay: "default",
            edited: 1,
            currentlySaving: 0,
            lastChest: 0
          }
          client.setProfile.run(profileInfo);
        var getChamps = sql.prepare('SELECT * FROM trophies_champions');
        for (var row of getChamps.all()) {
              client.setPoses = sql.prepare(`INSERT OR REPLACE INTO ${row.name}_poses (userID) VALUES (${member.user.id});`).run();
     
        }

        var getPoses = sql.prepare('SELECT * FROM trophies_poses');
        for (var row of getPoses.all()) {
            client.setPoses = sql.prepare(`UPDATE ${row.champion}_poses SET ${row.name} = ${0} WHERE userID = ${member.user.id}`).run();
        }

        var getOverlays = sql.prepare(`SELECT * FROM avatar_overlay_info`);
        client.insertOverlays = sql.prepare(`INSERT OR REPLACE INTO avatar_overlays (userID) VALUES (${member.user.id});`).run();

        for (var row of getOverlays.all()){
            var currentOverlay = row.name;
            currentOverlay = currentOverlay.toString();
            client.setOverlays = sql.prepare(`UPDATE avatar_overlays SET "${currentOverlay}" = ${0} WHERE userID = ${member.user.id}`).run();
        }
        client.setPoses = sql.prepare(`INSERT INTO duel_elo (userID) VALUES (${member.user.id});`).run();
        client.setWins = sql.prepare(`UPDATE duel_elo SET duelWins = ${0} WHERE userID = ${member.user.id}`).run();
        client.setLosses = sql.prepare(`UPDATE duel_elo SET duelLosses = ${0} WHERE userID = ${member.user.id}`).run();
        client.setElo = sql.prepare(`UPDATE duel_elo SET elo = ${1500} WHERE userID = ${member.user.id}`).run();
        client.setDueling = sql.prepare(`UPDATE duel_elo SET dueling = ${0} WHERE userID = ${member.user.id}`).run();

          var setupEmbed = new Discord.RichEmbed()
          .addField(`Profile created 👤`, `**${member.user.tag}** has been added to the database.`)
        .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL}`)
        .setThumbnail(member.user.displayAvatarURL)
        .setColor("#2ECC40")
        .setFooter(`User ID: ${member.user.id}`)
        .setTimestamp(new Date());
        client.channels.get('487230070763552768').send(setupEmbed).catch(console.error);

            console.log(`Created a new profile in the database for ${member.user.id}`);
    } 















    
    return;


  // Replace the placeholders in the welcome message with actual data
  
  //const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);

  // Send the welcome message to the welcome channel
  // There's a place for more configs here.
};
