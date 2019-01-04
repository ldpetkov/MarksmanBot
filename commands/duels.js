const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');
exports.run = async (client, message, args, level) => {
    client.getProfile = sql.prepare('SELECT * FROM profiles WHERE userID = ?');
    client.getProfileDuels = sql.prepare(`SELECT * FROM duel_elo WHERE userID = ?`);
    var profileTarget;
    var profileUsername;
    var profileAvatar
    if (!message.mentions.users.first()){
        profileTarget = message.author.id;
        profileUsername = message.author.username;
        profileAvatar = message.author.displayAvatarURL;
    } else {
        profileTarget =message.mentions.users.first().id;
        profileUsername = message.mentions.users.first().username;
        profileAvatar = message.mentions.users.first().displayAvatarURL;
    }
    var getProfile = client.getProfile.get(profileTarget);
    if (!getProfile) {
        message.reply(`I don't have an account for ${profileUsername}. To set up an account, that users needs to run the \`\`.setup\`\` command.`);
    } else {
        var getWins = client.getProfileDuels.get(profileTarget).duelWins;
        var getLosses= client.getProfileDuels.get(profileTarget).duelLosses;
        var winRate;
        var wholeNumberOfGames;
        wholeNumberOfGames = getWins + getLosses;
    var allDuelists = [];
    var getProfiles = sql.prepare('SELECT * FROM duel_elo ORDER BY elo DESC');
    for (var row of getProfiles.all()){
        var currentUser = message.guild.members.find(user => user.id === `${row.userID}`).id
        allDuelists.push(`${currentUser}`)
    }
    var currentRank = allDuelists.indexOf(profileTarget);
    currentRank = currentRank + 1;
        if (getWins == 0 && getLosses == 0){
            winRate = `0 games played yet.`
            var duelHistory = new Discord.RichEmbed()
            .setAuthor('Duel statistics', client.user.avatarURL)
            .addField('Won', `${getWins}`, true)
            .addField('Lost', `${getLosses}`, true)
            .addField(`Total duels`, `${wholeNumberOfGames}`, true)
            .addField(`Win rate`, `${winRate}`,true)
            .addField(`ELO`, `${client.getProfileDuels.get(profileTarget).elo}`, true)
            .addField(`Rank`, `#${currentRank}`, true)
            .setThumbnail(profileAvatar)
            message.channel.send(duelHistory)
        } else {
            wholeNumberOfGames = getWins + getLosses;
            if(getLosses == 0){
                winRate = 100;
            } else {
                winRate = Math.round((getWins/wholeNumberOfGames) * 100)
            }
    
            var duelHistory = new Discord.RichEmbed()
            .setAuthor('Duel statistics', client.user.avatarURL)
            .addField('Won', `${getWins}`, true)
            .addField('Lost', `${getLosses}`, true)
            .addField(`Total duels`, `${wholeNumberOfGames}`, true)
            .addField(`Win rate`, `${winRate}%`, true)
            .addField(`ELO`, `${client.getProfileDuels.get(profileTarget).elo}`, true)
            .addField(`Rank`, `#${currentRank}`, true)
            .setThumbnail(profileAvatar)
            message.channel.send(duelHistory)
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
  name: "duels",
  category: "Profile",
  description: "View your WR",
  usage: "duels"
};