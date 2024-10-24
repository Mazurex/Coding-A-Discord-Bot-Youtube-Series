const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Sends hello to the channel"),
  async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });
    interaction.editReply({
      content: `I just sent hello to <#${interaction.channel.id}>`,
    });

    interaction.channel.send({ content: "hello" });
  },
};
