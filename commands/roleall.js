module.exports.run = async (bot, message, args) => {
    // const roleList = message.guild.roles.map(r => r);
    const roleName = args.join(" ");
    if (!roleName){
        message.reply("please specify a role.");
    } else {
    var roleList = message.guild.roles.map(r => r.name)
    let roleResult = roleList.find(obj => obj.toLowerCase() === roleName.toLowerCase());
    let roleID = message.guild.roles.find(r => r.name === roleResult).id;
    if (!roleResult){
        message.reply("I couldn't find that role.");
    } else {
    var memberList = message.guild.members.map(m => m);
    const memberLength = memberList.length;
    let membersWithRole = message.guild.roles.find(r => r.name === roleResult).members.map(m => m).length;
    var numberOfChanges = memberLength - membersWithRole;
    
    if (numberOfChanges !== 0){
     message.reply(`changing roles for ${numberOfChanges} members. This may take a while.`);
     for (var i = 0; i < memberLength; i++) {
    memberList[i].addRole(roleID).catch(error => message.reply(`Error: ${error}`)).then (x => {
    })
}
} else {
    message.reply(`There are no users left without the \`\`${roleResult}\`\` role.`);
}
}
};
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Mod"
  };
  
  exports.help = {
    name: "roleall",
    category: "Moderation",
    description: "Assign everyone a role",
    usage: "roleall"
  
};
  