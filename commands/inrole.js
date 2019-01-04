const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {

        const roleList = message.guild.roles.map(m => m.name.toLowerCase());
        const roleName = args.join(" ").toLowerCase();
        if (!roleName) {
            message.reply("please specify a role.");
        } else if (!message.guild.roles.find( role => role.name.toLowerCase() === roleName.toLowerCase())){
            message.reply("I can't find that role.");
        } 
        else {
         let roleResult = message.guild.roles.find( role => role.name.toLowerCase() === roleName);


        const memberNames = roleResult.members.map(m => m.user.tag);

        var pageList = new Array();
        var currentPage = 1;
        var numberPerPage = 10;
        var numberOfPages = Math.ceil(memberNames.length / numberPerPage);


        var begin = ((currentPage - 1) * numberPerPage);
        var end = begin + numberPerPage;

        pageList = memberNames.slice(begin, end);

        let paginationEmbed = new Discord.RichEmbed()
        .setColor(roleResult.color)
        .setAuthor(`List of users in ${roleResult.name} role - ${memberNames.length}`)
        .setDescription(pageList)
        .setFooter(`Page ${currentPage}/${numberOfPages}`);
        message.channel.send(paginationEmbed).then( msg => {
            msg.react(`⬅`).then (r => {
            msg.react(`➡`);
            });

                const backwardsFilter = (reaction, user) => reaction.emoji.name === `⬅` && user.id === message.author.id;
                const forwardFilter = (reaction, user) => reaction.emoji.name === `➡` && user.id === message.author.id;
    
    const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000});
    const forward = msg.createReactionCollector(forwardFilter, { time: 60000});
    
    backwards.on('collect', r => {
        if (currentPage == 1) {
            r.remove(message.author.id);
            return;
        } else {
        currentPage--;
        var begin = ((currentPage - 1) * numberPerPage);
        var end = begin + numberPerPage;

        pageList = memberNames.slice(begin, end);
        let paginationEmbedBackwards = new Discord.RichEmbed()
        .setColor(roleResult.color)
        .setAuthor(`List of users in ${roleResult.name} role - ${memberNames.length}`)
        .setDescription(pageList)
        .setFooter(`Page ${currentPage}/${numberOfPages}`);
        r.remove(message.author.id);
    r.message.edit( {embed: paginationEmbedBackwards});
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

        pageList = memberNames.slice(begin, end);
        let paginationEmbedForward = new Discord.RichEmbed()
        .setColor(roleResult.color)
        .setAuthor(`List of users in ${roleResult.name} role - ${memberNames.length}`)
        .setDescription(pageList)
        .setFooter(`Page ${currentPage}/${numberOfPages}`);
        r.remove(message.author.id);
        r.message.edit( {embed: paginationEmbedForward});
        }
    })
        });
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
    name: "inrole",
    description: "Check what people are in what role.",
    usage: "inrole <arg>"
};