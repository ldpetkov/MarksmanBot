const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
  
  var rulesEmbed = new Discord.RichEmbed()
    .addField("⚠️__Rules__⚠️", '**1.** Don\'t be a dick (Treat people like you want to be treated)\n**2.** NSFW content goes to NSFW channels (see *Channels* section).\n**3.** Keep shitposting and spam reasonable.\n**4.** If you have a problem, talk to a <@&314155322237517824> or an <@&313985801782558720> first.\n**5.** If posting/saying something sounds like a bad idea, it\'s probably a bad idea. Keep it to yourself.\n**6.** No gore content.\n**7.** Feel free to advertise League of Legends clubs. Advertising other Discord servers is not allowed.\n**8.** General Discord rules apply.\n**9.** Please, use the brain that god gave you.', true)
    .setAuthor("ADC Discord Server Rules", bot.user.avatarURL)
    .setColor('#3498DB')


    var commandsEmbed = new Discord.RichEmbed()
    .addField("__Core__", '**.role <role name>** Join/leave a role.\n**.roles** Get a list of roles configured on this server.', false)
    .addField("__Orianna Bot__", '<@244234418007441408>**, send me my edit url** - Receive a unique URL to edit your linked accounts.\n<@244234418007441408>** refresh** - Refresh your linked accounts.', false)
    .addField("__Misc.__", '<a:popcorn:416904939068194826> - **.popcorn**\n<a:sexy:416902943279677440> - **.sexy**\n<a:deletthis:416904330243997714> - **.deletthis**\n<:no:416901738776494080> - **.no**\n<a:doit:416901961682649090> - **.doit**\n<:disgusting:416906730694377473> - **.disgusting**\n<a:confused:416907149684375552> - **.confused**\n<:addition:416908252614492160> - **.addition**\n<:ohno:416907836514107403> - **.ohno**\n<:yikes:416908527546793985> - **.yikes**\n<a:fu:416909562248036353> - **.fu**\n<:hmmm:416912510789091338> - **.hmmm**\nThis section is WIP', false)
    .setAuthor("Commands", bot.user.avatarURL)
    .setColor('#3498DB')

     var channelEmbed = new Discord.RichEmbed()
    .setDescription('<#314011786867376129> - You are here.\n<#314061205767454722> - Useful links about the game.\n<#314905618815254529> - Announcement channel. Some announcements will be accompanied with @everyone tag\n<#416879920069738496> - ADC related club list.\n<#313985685839413248> - General shitposting.\n<#314011204781867019> - Gameplay related discussions.\n<#320198123265851393> - Find people to play with.\n<#314006279507017730> - Bot commands (Tatsumaki, role assignment, etc.).\n<#314011341461389314> - Post your feedback and suggestions for the server here.\n<#314107736470192128> - Surrender@20 posts and updates.\n<#316381540349378564> - ADC Twitch stream announcements.\n<#430757409179566110> - Counting game.\n<#452480143055650827> - For all your salt. Please contain it here and don\'t move the discussion to other chats.\n<#418589650966282250> - Montages channel. Contact a <@&314155322237517824> to have your twitch channel announced whenever you start streaming.\n<#313996395172462593> - If you have a fan art you want to share, post it here.\n<#318952310011330570> - No 9gag memes allowed.\n<#363096491591467010> - Animu channel. <:mimigrossedout:416901892891738112>\n<#338004996153147392> - Grooves channel. <a:coolkid:416901911627825152>\n<#314013785234997258> - rule34 channel (<@&314013643400282112> role required to view this channel).')
    .setAuthor("Channel List", bot.user.avatarURL)
    .setColor('#3498DB')

    var crimecityEmbed = new Discord.RichEmbed()
    .setDescription('Crime City is an opt-in feature of the ADC Mains Discord server.\nEarn exclusive roles, collect items, play casino.\n<@&416763928396300290> role required to participate and view Crime City related channels.')
    .setAuthor("Crime City", 'https://i.imgur.com/AcCuJmW.png')
    .setColor('#3498DB')
    .setImage('https://i.imgur.com/hUUICiZ.png')
    message.channel.send(rulesEmbed);
    message.channel.send(commandsEmbed);
    message.channel.send(channelEmbed);
    message.channel.send(crimecityEmbed);
  
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Admin"
};

exports.help = {
  name: "rules",
  category: "Moderation",
  description: "Post rules and guidelines",
  usage: "rules"

};