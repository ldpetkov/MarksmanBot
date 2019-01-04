const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');
exports.run = async (client, message, [args]) => {
    client.getProfile = sql.prepare('SELECT * FROM profiles WHERE userID = ?');
    client.setProfile = sql.prepare("INSERT OR REPLACE INTO profiles (userID, rpAmount, backgroundName, bioText, trophyName, trophyTier, avatarOverlay, edited, currentlySaving, lastChest) VALUES (@userID, @rpAmount, @backgroundName, @bioText, @trophyName, @trophyTier, @avatarOverlay, @edited, @currentlySaving, @lastChest);");
    let profileInfo = client.getProfile.get(`${message.author.id}`);
    if(!profileInfo) {
        profileInfo = {
            userID: `${message.author.id}`,
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
              client.setPoses = sql.prepare(`INSERT OR REPLACE INTO ${row.name}_poses (userID) VALUES (${message.author.id});`).run();
     
        }

        var getPoses = sql.prepare('SELECT * FROM trophies_poses');
        for (var row of getPoses.all()) {
            client.setPoses = sql.prepare(`UPDATE ${row.champion}_poses SET ${row.name} = ${0} WHERE userID = ${message.author.id}`).run();
        }

        var getOverlays = sql.prepare(`SELECT * FROM avatar_overlay_info`);
        client.insertOverlays = sql.prepare(`INSERT OR REPLACE INTO avatar_overlays (userID) VALUES (${message.author.id});`).run();

        for (var row of getOverlays.all()){
            var currentOverlay = row.name;
            currentOverlay = currentOverlay.toString();
            client.setOverlays = sql.prepare(`UPDATE avatar_overlays SET "${currentOverlay}" = ${0} WHERE userID = ${message.author.id}`).run();
        }
        client.setPoses = sql.prepare(`INSERT INTO duel_elo (userID) VALUES (${message.author.id});`).run();
        client.setWins = sql.prepare(`UPDATE duel_elo SET duelWins = ${0} WHERE userID = ${message.author.id}`).run();
        client.setLosses = sql.prepare(`UPDATE duel_elo SET duelLosses = ${0} WHERE userID = ${message.author.id}`).run();
        client.setElo = sql.prepare(`UPDATE duel_elo SET elo = ${1500} WHERE userID = ${message.author.id}`).run();
        client.setDueling = sql.prepare(`UPDATE duel_elo SET dueling = ${0} WHERE userID = ${message.author.id}`).run();

          var setupEmbed = new Discord.RichEmbed()
          .addField(`Profile created 👤`, `**${message.author.tag}** has been added to the database.`)
        .setAuthor(`${client.user.username}`, `${client.user.avatarURL}`)
        .setThumbnail(message.author.displayAvatarURL)
        .setColor("#2ECC40")
        .setFooter(`User ID: ${message.author.id}`)
        .setTimestamp(new Date());
        client.channels.get('487230070763552768').send(setupEmbed).catch(console.error);

            console.log(`Created a new profile in the database for ${message.author.id}`);
            message.reply(`I've successfuly added you to my database! <:wave:465949859111763968>`)
    } else {
        message.reply(" you've already set up your profile!")
    }
      

    



};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: []
};
      
exports.help = {
    name: "setup",
    description: "Sets up the profile",
    usage: "setup"
};