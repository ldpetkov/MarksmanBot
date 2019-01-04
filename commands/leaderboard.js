const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');

exports.run = async (client, message, args, level) => {
  var getProfile = sql.prepare('SELECT * FROM duel_elo ORDER BY elo DESC');
  var rankNumber = 1;
  var allDuelists = [];
  for (var row of getProfile.all()) {
    var currentUser = message.guild.members.find(user => user.id === `${row.userID}`).user.username
    allDuelists.push(`#${rankNumber} ${currentUser} - ${row.elo} ELO.`)
    rankNumber++;

  }
//   var topTenDuelists = allDuelists.slice(0, 10);
  var currentPage = 1;
  var numberPerPage = 10;
  var numberOfPages = Math.ceil(allDuelists.length / numberPerPage);
  var begin = ((currentPage - 1) * numberPerPage);
  var end = begin + numberPerPage;

  pageList = allDuelists.slice(begin, end);

  let paginationEmbed = new Discord.RichEmbed()
    .setColor('#FF4136')
    .setAuthor(`ELO leaderboard`)
    .setThumbnail(client.guilds.find(g => g.id === '313985685839413248').iconURL)
    .setDescription(pageList)
    .setFooter(`Page ${currentPage}/${numberOfPages}`);
  message.channel.send(paginationEmbed).then(msg => {
    msg.react(`⬅`).then(r => {
      msg.react(`➡`);
    });
    const backwardsFilter = (reaction, user) => reaction.emoji.name === `⬅` && user.id === message.author.id;
    const forwardFilter = (reaction, user) => reaction.emoji.name === `➡` && user.id === message.author.id;

    const backwards = msg.createReactionCollector(backwardsFilter, {
      time: 60000
    });
    const forward = msg.createReactionCollector(forwardFilter, {
      time: 60000
    });
    backwards.on('collect', r => {
      if (currentPage == 1) {
        r.remove(message.author.id);
        return;
      } else {
        currentPage--;
        var begin = ((currentPage - 1) * numberPerPage);
        var end = begin + numberPerPage;
        pageList = allDuelists.slice(begin, end);
        var paginationEmbedBackwards = new Discord.RichEmbed()
          .setColor('#FF4136')
          .setAuthor(`ELO leaderboard`)
          .setThumbnail(client.guilds.find(g => g.id === '313985685839413248').iconURL)
          .setDescription(pageList)
          .setFooter(`Page ${currentPage}/${numberOfPages}`);
        r.remove(message.author.id);
        r.message.edit({
          embed: paginationEmbedBackwards
        });
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
        pageList = allDuelists.slice(begin, end);
        var paginationEmbedForward = new Discord.RichEmbed()
          .setColor('#FF4136')
          .setAuthor(`ELO leaderboard`)
          .setThumbnail(client.guilds.find(g => g.id === '313985685839413248').iconURL)
          .setDescription(pageList)
          .setFooter(`Page ${currentPage}/${numberOfPages}`);
        r.remove(message.author.id);
        r.message.edit({
          embed: paginationEmbedForward
        });
      }
    })
    backwards.on('end', collected => {
      msg.clearReactions();
    })



    // console.log(topTenDuelists)
    // var leaderboardEmbed = new Discord.RichEmbed()
    // .setColor('#FF4136')
    // .addField('Top 10 ELO leaderboard', topTenDuelists)
    // message.channel.send(leaderboardEmbed)

  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "leaderboard",
  category: "Profile",
  description: "Check the ELO leaderboards.",
  usage: "leaderboard"
};
