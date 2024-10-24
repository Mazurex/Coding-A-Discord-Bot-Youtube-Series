module.exports = {
  name: "hello",
  description: "Sends hello to the channel",
  execute(message, args) {
    message.channel.send("hello");
  },
};

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Sends hello in the channel"),
  async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });
    interaction.editReply({
      content: `I just sent hello to <#${interaction.channel.id}>`,
    });

    interaction.channel.send({ content: "Hello" });
  },
};
