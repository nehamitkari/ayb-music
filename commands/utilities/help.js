const { MessageEmbed, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = process.env.PREFIX;
const { stripIndents } = require("common-tags");

module.exports = {
  config: {
    name: "help",
    aliases: ["h", "halp", "commands"],
    usage: "(command)",
    category: "utilities",
    cooldown: { time: 3, users: [] },
    description: "Displays all commands that the bot has.",
    accessableby: "Members"
  },
  run: async (client, message, args) => {


    let user = message.author;
    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`${message.guild.me.displayName}'s Commands`, user.displayAvatarURL);


    if (!args[0]) {
      const categories = readdirSync("./commands/");


      embed.setFooter(`© ${message.guild.me.displayName}`);
      embed.setTimestamp();

      categories.forEach(category => {
        const dir = client.commands.filter(c => c.config.category === category);
        const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);
        try {
          embed.addField(`> **${capitalise}** **(${dir.size})**`, dir.map(c => `\`${c.config.name}\``).join(", \n "));
        } catch (e) {
          console.log(e);
        }
      });

      return message.channel.send(embed);
    } else {
      // Define command
      const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));

      if (!command) return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${prefix}help\` for the list of the commands.`));
      const config = command.config;

      embed.setDescription(stripIndents`\n
            **Command:** ${config.name.slice(0, 1).toUpperCase() + config.name.slice(1)}
            **Description:** ${config.description || "No Description provided."}
            **Usage:** ${config.usage ? `\`${prefix}${config.name} ${config.usage}\`` : "No Usage."}
            **Cooldown:** 
            **Accessible by:** ${config.accessableby || "Members"}
            **Aliases:** ${config.aliases ? config.aliases.join(", ") : "None."}`);

      return message.channel.send(embed);
    }
  }
};
