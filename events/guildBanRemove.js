const Discord = require("discord.js");
module.exports = async (client, user) => {
        const entry = await client.guilds.find('id', '313985685839413248').fetchAuditLogs({limit:10, type:'MEMBER_BAN_REMOVE'}).then(audit => audit.entries.first());
        var banEmbed = new Discord.RichEmbed()
        .setAuthor(`Member Unbanned`)
        .setThumbnail(`${entry.target.displayAvatarURL}`)
        .addField(`User`, `${entry.target.tag}`, true)
        .addField(`Moderator`, `${entry.executor}`, true)
        .addField(`Ban Reason`, `${entry.reason}`, true)
        .setFooter(`User ID: ${entry.target.id}`)
        .setTimestamp(new Date());
        client.channels.get('319917089630453787').send(banEmbed).catch(console.error);
      };