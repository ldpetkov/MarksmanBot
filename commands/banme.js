const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {

var confirmationEmbed = new Discord.RichEmbed()
.setAuthor('Self ban', client.user.avatarURL)
.setDescription(`Are you sure you want to ban yourself?\nNo, you won't be unbanned. At least not by <@169053653477490688>, that's for sure.`)
message.channel.send(confirmationEmbed).then (msg => {
    msg.react('👍').then (r => {
        msg.react('👎')
    });
    const acceptFilter = (reaction, user) => reaction.emoji.name === `👍` && user.id === message.author.id;
    const cancelFilter = (reaction, user) => reaction.emoji.name === `👎` && user.id === message.author.id;
    const acceptBan = msg.createReactionCollector(acceptFilter, { time: 60000});
    const cancelBan = msg.createReactionCollector(cancelFilter, { time: 60000});
    acceptBan.on('collect', async r => {
        msg.clearReactions();
        msg.delete();
        await message.member.ban('self ban OMEGALUL')
        .then(b => {
            message.channel.send('Way to go, he actually banned himself <:OMEGALUL:453598272083329025>')
        }).then(msg => {
            member.send('Nice <:fakecrawler:453690956437258265>')
        })
        .catch(error => message.channel.send(`Sorry ${message.author} I couldn't ban because of : ${error}`))
    })
    cancelBan.on('collect', r => {
        msg.delete();
        message.channel.send('Self ban cancelled', {embed: null});
    })
    acceptBan.on('end', r => {
        if(!msg) {
            return;
        } else {
            msg.clearReactions();
            msg.edit('Self ban timed out', {embed: null});
        }
    })
})
};
  
exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: "User"
};

exports.help = {
name: "banme",
category: "Retardation",
description: "Ban yourself.",
usage: "banme"

};