const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var profileEmbed = new Discord.RichEmbed()
    .setColor('#3498DB')
    .setAuthor('Profiles info', client.user.avatarURL)
    .addField(`.profile`, 'View your or someone else\'s profile.')
    .addField(`.setup`, `Use this command to setup your profile if ${client.user} hasn’t automatically set one up for you.`)
    .addField(`.collection`, 'View your or someone else\'s collection completion and value.')
    .addField(`.duel`, 'Duel others for poses and ELO.\nExample: ``.duel @Guro#2663 jinx idle, draven idle``\nIn this example \`\`jinx idle\`\` is the pose that you wager and \`\`draven idle\`\` is the pose you want to receive from the opponent in case you win.')
    .addField(`.duels`, `Check on your or someone else's duel Wins/Losses, ELO and current ladder ranking.`)
    .addField(`.leaderboard`, `View the current ELO leaderboard.\nELO gets reset every month and the member that is ranked #1 receives 1 random Mythic pose.`)
    .addField(`.sell`, 'Sell the poses you don\'t need for RP.\nExample: ``.sell jinx idle``')
    .addField(`.settrophy`, 'Change your profile trophy.')
    .addField(`.setbackground`, 'Change your profile background.\nExample: ``.setbackground kai\'sa``\nOnly classic skins ADC backgrounds are available right now. For an estimate of new backgrounds feel free to ask <@229249088791511041> :)')
    .addField(`.setbio`, 'Change your profile bio.\nExample: ``.setbio nice text``')
    .addField(`.setoverlay`, 'Change your profile picture overlay.')
    .addField(`.shop`, 'Buy some goodies with RP')
    .addField(`.trade`, 'Trade your pose to someone else.\nExample: ``.trade @Guro#2663 dragon master swain idle``');
    client.channels.get('495788447659851777').send(profileEmbed);

};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "profileinfo",
  category: "Moderation",
  description: "Post profile info info",
  usage: "profileinfo"

};