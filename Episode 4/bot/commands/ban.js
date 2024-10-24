const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user from the server")
    .addUserOption((option) =>
      option.setName("target").setDescription("Who to ban").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Why are you banning this user")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });
    const target = interaction.options.getUser("target");
    const reason =
      interaction.options.getString("reason") ?? "No reason specified";

    const targetMember = await interaction.guild.members.fetch(target);
    const clientMember = await interaction.guild.members.fetch(client);
    const loggingChannelID = "1296183433885909054";

    if (!targetMember) {
      return interaction.editReply({ content: "This member doesn't exist!" });
    }

    if (target == client.user || target == interaction.user) {
      return interaction.editReply({ content: "I cannot ban this member!" });
    }

    if (
      targetMember.roles.highest.position >= clientMember.roles.highest.position
    ) {
      return interaction.editReply({
        content:
          "I cannot ban this member as their highest role is equal or higher than mine!",
      });
    }

    try {
      await targetMember.ban({
        deleteMessageSeconds: 7 * 24 * 60 * 60,
        reason: reason,
      });

      interaction.editReply({
        content: `I have successfully banned ${target.username}`,
      });

      const loggingChannel =
        interaction.guild.channels.cache.get(loggingChannelID);
      if (!loggingChannel) {
        return interaction.followUp({
          content: "The logging channel specified is incorrect!",
        });
      }

      const loggingEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Member Ban")
        .addFields(
          { name: "Banned by", value: interaction.user.username, inline: true },
          { name: "Target", value: target.username, inline: true },
          { name: "Reason", value: reason }
        )
        .setTimestamp()
        .setFooter({
          text: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });

      loggingChannel.send({ embeds: [loggingEmbed] });
    } catch (error) {
      console.error(error);
      interaction.editReply({
        content: "There was an error with executing this command!",
      });
    }
  },
};
