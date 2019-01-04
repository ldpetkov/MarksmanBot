

exports.run = async (client, message, [args]) => {

    let response = ["Yes", "Maybe", "No", "Try again later", "Possibly", "Absolutely", "Probably not", "Outcome is looking good", "Outcome not looking good", "The stars say yes", "Ask again later", "Reply hazy, try again", "Better not to tell you now", "Cannot predict now", "Concentrate and ask again", "It is certain", "It is decidedly so", "Without a doubt", "Yes - definitely", "As I see it, yes", "Don't count on it", "My reply is no", "Very doubtful", "My sources say no", "Outlook not so good"];
    message.channel.send(`${response[~~(Math.random() * response.length)]}, ${message.author.username}.`);    

};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: []
};
      
exports.help = {
    name: "8ball",
    description: "Ask the magic 8ball wizard for an answer!",
    usage: "8ball <arg>"
};