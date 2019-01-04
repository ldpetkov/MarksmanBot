const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
    var roleList = [
        'Crime City',
        'ADC',
        'Support',
        'PBE'
    ]

    const roleName = args.join(" ");
    let roleResult = roleList.find(obj => {
        return obj.toLowerCase() === roleName.toLowerCase()
    })
    var gottedRole = message.guild.roles.find(n => n.name == roleResult);
    if (roleName === ""){
        message.reply('please specify a role.');
    } else if (!roleResult || !gottedRole){
        message.reply(`<:error:469652563038306324> That role is either not self-assignable or doesn\'t exist on this server.`);
    } else if (message.member.roles.has(gottedRole.id)){
            message.member.removeRole(gottedRole.id).catch(error => message.reply(`I couldn't remove you from that role. Error: ${error}`)).then (x => {
                message.reply(`you left **${gottedRole.name}**`);
            });    
    }
    else {
        await message.member.addRole(gottedRole).catch(error => message.reply(`I couldn't add you to that role. Error: ${error}`)).then (x => {
            message.reply(`you joined **${gottedRole.name}**`);
        })
        
    }
    

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "role",
  category: "Role",
  description: "Assign a role",
  usage: "role"
};
