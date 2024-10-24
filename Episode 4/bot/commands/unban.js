const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unbans a user from this server")
    .addStringOption((option) =>
      option
        .setName("target_id")
        .setDescription("Enter the ID of the target")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Why are you unbanning this user")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });
    const target = interaction.options.getString("target_id");
    const reason =
      interaction.options.getString("reason") ?? "No reason specified";
    const loggingChannelID = "1296183433885909054";

    try {
      await interaction.guild.members.unban(target, reason);
      interaction.editReply({ content: `I have unbanned \`${target}\`` });

      const loggingChannel =
        interaction.guild.channels.cache.get(loggingChannelID);
      if (!loggingChannel) {
        return interaction.followUp({
          content: "The logging channel specified is incorrect!",
        });
      }

      const loggingEmbed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Member Unban")
        .addFields(
          {
            name: "Unbanned by",
            value: interaction.user.username,
            inline: true,
          },
          { name: "Target", value: target, inline: true },
          { name: "Reason", value: reason }
        )
        .setTimestamp()
        .setFooter({
          text: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });

      loggingChannel.send({ embeds: [loggingEmbed] });
    } catch (error) {
      interaction.editReply({ content: "This user doesn't exist!" });
    }
  },
};
