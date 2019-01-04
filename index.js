// Node version check
if (Number(process.version.slice(1).split(".")[0]) < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

// Load up the libraries
const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const EnmapLevel = require("enmap-sqlite");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profiles.sqlite');
require('events').EventEmitter.prototype._maxListeners = 5000;


// const client = new Discord.Client();
const client = new Discord.Client({fetchAllMembers: true});

// Config file
client.config = require("./config.js");

// Logger
client.logger = require("./modules/Logger");

// Functions
require("./modules/functions.js")(client);

// Enmap DB
client.commands = new Enmap();
client.aliases = new Enmap();

client.settings = new Enmap({provider: new EnmapLevel({name: "settings"})});










client.on('guildMemberUpdate', (oldMember, newMember) => {
  const logs = newMember.guild.channels.find(c => c.id === '319917089630453787');
  let removeDifference = oldMember._roles.filter(x => !newMember._roles.includes(x));
  let addDifference = newMember._roles.filter(x => !oldMember._roles.includes(x));
  if (removeDifference != ""){
    
    var removedRoleEmbed = new Discord.RichEmbed()
    .setAuthor(`${newMember.user.tag}`, `${newMember.user.displayAvatarURL}`)
    .setDescription(`${newMember} was removed from the the ${newMember.guild.roles.find(r => r.id === `${removeDifference}`)} role`)
    .setColor('#FF4136')
    .setFooter(`ID: ${newMember.user.id}`)
    .setTimestamp(new Date());
    logs.send(removedRoleEmbed);
    
  } else if (addDifference != ""){
    var addedRoleEmbed = new Discord.RichEmbed()
    .setAuthor(`${newMember.user.tag}`, `${newMember.user.displayAvatarURL}`)
    .setDescription(`${newMember} was given the ${newMember.guild.roles.find(r => r.id === `${addDifference}`)} role`)
    .setColor('#2ECC40')
    .setFooter(`ID: ${newMember.user.id}`)
    .setTimestamp(new Date());
    logs.send(addedRoleEmbed);
    
  }
  // if(newMember.roles.some(r=>["Challenger", "Master", "Diamond", "Platinum", "Gold", "Silver", "Bronze", "Unranked"].includes(r.id)) || ["169053653477490688", "184405311681986560", "240729664035880961", "244234418007441408", "302034015949684747", "172002275412279296", "434106472608170004", "292953664492929025", "416880912660299796"].includes(newMember.id)) {
    if(newMember.roles.some(r=>["403117562025607170", "479293243700412447", "519940264354381832", "519940259082141696", "403117562843496448", "479293255066845184", "403117563279835137", "479293462941007872", "403117563753529355", "519940288475693067", "403117564693053450", "479293526992093194", "403117565091774465", "479293586567987201", "403117566060396544", "479293651869106186", "519940288475693067", "519940278300442654", "423588647191969802", "464987627037261845", "313990060485902336"].includes(r.id)) || ["169053653477490688", "184405311681986560", "240729664035880961", "244234418007441408", "302034015949684747", "172002275412279296", "434106472608170004", "292953664492929025", "416880912660299796"].includes(newMember.id)) {
        newMember.removeRole("314003627557519361");
      } else {
        newMember.addRole("314003627557519361");
      };

  if(newMember.roles.has('491722241973682196')){
    newMember.removeRole('491722241973682196');
    client.addRP = sql.prepare(`UPDATE profiles SET rpAmount = rpAmount + 1000 WHERE userID = ${newMember.id}`).run();
    client.channels.find(c => c.id === '314006279507017730').send(`${newMember}, you've successfuly converted 100k dollars to 1000RP`);
  }
});

client.on("messageDelete", async message => {
    
  const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first());
  const logs = await message.guild.channels.find(c => c.id === '319917089630453787');
  let user;
  let channel = message.channel.id;


  if (entry.extra.channel.id === message.channel.id && (entry.target.id === message.author.id) && (entry.createdTimestamp > (Date.now() - 5000)
&& entry.extra.count >= 1)) {
user = entry.executor;
} else { 
// When all else fails.
user = message.author;
var attachmentInfo = message.attachments;
attachmentURL = attachmentInfo.map(x => x.proxyURL);
attachmentName = attachmentInfo.map(x => x.filename);

}   if (attachmentURL == undefined) {
var deleteDate = new Date();
var messageDeleteEmbed = new Discord.RichEmbed()
.setAuthor(`${user.username}`, user.displayAvatarURL)
.setDescription(`**Message sent by ${user} deleted in** <#${channel}>\n${message}`)
.setFooter(`ID: ${message.id}`)
.setColor("#FF4136")
.setTimestamp(deleteDate);
logs.send(messageDeleteEmbed);
} else {
var deleteDate = new Date();
var messageDeleteEmbed = new Discord.RichEmbed()
.setTitle(`Attachment: ${attachmentName[0]}`)
.setURL(attachmentURL[0])
.setAuthor(`${user.username}`, user.displayAvatarURL)
.setDescription(`**Message sent by ${user} deleted in** <#${channel}>\n${message}`)
.setFooter(`ID: ${message.id}`)
.setColor("#FF4136")
.setImage(attachmentURL[0])
.setTimestamp(deleteDate);
logs.send(messageDeleteEmbed);
}

});

client.on("channelCreate", async channel => {
var channelAddDate = new Date();
const logs = await channel.guild.channels.find(`id`, `319917089630453787`);
var channelAddEmbed = new Discord.RichEmbed()
.setAuthor(channel.guild.name, channel.guild.iconURL)
.setDescription(`**Channel Created: #${channel.name}**`)
.setColor("#2ECC40")
.setFooter(`ID: ${channel.id}`)
.setTimestamp(channelAddDate);
logs.send(channelAddEmbed);


});

client.on("channelDelete", async channel => {
var channelDeleteDate = new Date();
const logs = await channel.guild.channels.find(`id`, `319917089630453787`);
var channelDeleteEmbed = new Discord.RichEmbed()
.setAuthor(channel.guild.name, channel.guild.iconURL)
.setDescription(`**Channel Deleted: #${channel.name}**`)
.setColor("#FF4136")
.setFooter(`ID: ${channel.id}`)
.setTimestamp(channelDeleteDate);
logs.send(channelDeleteEmbed);
});


client.on('messageUpdate', async (oldMessage, newMessage) => {
const logchannel = client.channels.get("319917089630453787");
if(newMessage.content != oldMessage.content){
const messageEditEmbed = new Discord.RichEmbed()
.setAuthor(`${newMessage.author.tag}`, newMessage.author.displayAvatarURL)
.setDescription(`**Message edited in #${newMessage.channel.name}**`)
.setColor('#339966')
.addField('Old Message:', `${oldMessage.content}`, false)
.addField('New Message:', `${newMessage.content}`, false)
.setTimestamp(new Date())
.setFooter(`ID: ${newMessage.id}`)
logchannel.send(messageEditEmbed);
} else {
return;
}

});







// Commands

const init = async () => {

  const cmdFiles = await readdir("./commands/");
  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  const evtFiles = await readdir("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);

    client.on(eventName, event.bind(null, client));
  });


  const reactFiles = await readdir("./reactions/");
  client.logger.log(`Loading a total of ${reactFiles.length} reactions.`);
  reactFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadReaction(f);
    if (response) console.log(response);
  });

  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  // Client login
  client.login(client.config.token);
};

init();
