const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
  async execute(interaction, client) {
    await interaction.deferReply();
    interaction.editReply({ content: "pong" });
  },
};
