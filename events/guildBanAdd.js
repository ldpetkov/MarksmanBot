const Discord = require("discord.js");
module.exports = async (client, user) => {
        const entry = await client.guilds.find('id', '313985685839413248').fetchAuditLogs({limit:10, type:'MEMBER_BAN_ADD'}).then(audit => audit.entries.first());
        var banEmbed = new Discord.RichEmbed()
        .setAuthor(`Ban | ${entry.target.tag}`, `${entry.target.displayAvatarURL}`)
        .addField("User", `<@${entry.target.id}>`, true)
        .addField("Moderator", `${entry.executor}`, true)
        .addField("Reason", `${entry.reason}`, true)
        .setColor("#FF4136")
        .setFooter(`User ID: ${entry.target.id}`)
        .setTimestamp(new Date());
        client.channels.get('319917089630453787').send(banEmbed).catch(console.error);
        
        var banEmbed = new Discord.RichEmbed()
        .setDescription(`**${entry.target.tag}** has been banned.\n\n**Reason:** ${entry.reason}`)
        .setAuthor(`${entry.executor.username}`, `${entry.executor.displayAvatarURL}`)
        .setColor("#FF4136")
        .setImage("https://i.imgur.com/Cf2Txda.jpg")
        .setFooter(`User ID: ${entry.target.id}`)
        .setTimestamp(new Date());
        client.channels.get('313985685839413248').send(banEmbed).catch(console.error);
      };