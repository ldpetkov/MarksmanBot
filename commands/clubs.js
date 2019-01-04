const Discord = require("discord.js");
exports.run = async (client, message, args) => {

var club1Embed = new Discord.RichEmbed()
.setDescription('**Server:** EUW\n**Name:** Marksman Club\n**Tag:** ADC\n**Description:** Do NOT contact unless you have 3 MARKSMAN champions in your profile.\n**Contact:** <@!229249088791511041> <@!131923567494430720>')
.setColor('#6bcdff')
.setThumbnail('https://i.imgur.com/qZJeCLQ.png')

var club2Embed = new Discord.RichEmbed()
.setDescription('**Server:** EUNE\n**Name:** ÀDC MAIN\n**Tag:** ÀÐĆ\n**Description:** We require you to have at least 100 games played this season as ADC.\n**Contact:** <@!251725360641736706> (IGN: adc lørd)')
.setColor('#b30000')
.setThumbnail('https://i.imgur.com/xL6DuBD.png')

var club3Embed = new Discord.RichEmbed()
.setDescription('**Server:** NA\n**Name:** ADC\n**Tag:** ADC\n**Description:** [Application link](https://docs.google.com/forms/d/e/1FAIpQLSe0McD9tQRe-6X_fP_r_4flddQgei4kuZuPkgVLzYv5tgV0og/viewform)\n**Contacts:** <@196391046077349888> @katsa#8848 @Stattikk Shiv#4038 @Vinh#2311')
.setColor('#6bcdff')
.setThumbnail('https://i.imgur.com/Ydd0WbF.png')

var club4Embed = new Discord.RichEmbed()
.setDescription('**Server:** OCE\n**Name:** Gangsters Paradise\n**Tag:** ADC\n**Description:** This club is abused for it\'s tag\n**Contacts:** <@153075400543567872> (IGN: Corvo Attano).')
.setColor('#ff69b4')
.setThumbnail('https://i.imgur.com/dNXNun2.png')

var club5Embed = new Discord.RichEmbed()
.setDescription('**Server:** EUNE\n**Name:** Just for ADC\'s\n**Tag:** ɅDC\n **Description:** You just need to be ADC main.\n**Contacts:** <@312987156698103808>')
.setColor('#9400D3')
.setThumbnail('https://i.imgur.com/w2DibsB.jpg')
client.channels.get('416879920069738496').send(club1Embed);
client.channels.get('416879920069738496').send(club2Embed);
client.channels.get('416879920069738496').send(club3Embed);
client.channels.get('416879920069738496').send(club4Embed);
client.channels.get('416879920069738496').send(club5Embed);

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Mod"
  };
  
  exports.help = {
    name: "clubs",
    category: "Moderation",
    description: "Club list.",
    usage: "clubs"
  
  };