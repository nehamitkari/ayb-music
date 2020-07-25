const { MessageEmbed } = require("discord.js");

module.exports = {
  config: {
    name: "np",
    description: "shows what song is currently playing",
    usage: " ",
    category: "music",
    accessableby: "Members",
    aliases: []
  },
  run: async (client, message, args) => {


    if (!message.member.voice.channel)
      return message.reply("You need to join a voice channel first!").catch(console.error);

    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.reply("There is nothing playing.").catch(console.error);

    serverQueue.songs.forEach(song => {

      const songNow = new MessageEmbed()
        .setTitle(song.title)
        .setURL(song.url)
        .setImage(song.img);

      message.channel.send(songNow);
    });
  }
};
