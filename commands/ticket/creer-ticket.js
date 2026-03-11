const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Ouvrir un ticket de support'),

  async execute(interaction) {
    const channel = await interaction.guild.channels.create({
      name: `ticket-${interaction.user.username}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        { id: interaction.guild.id, deny: [PermissionFlagsBits.ViewChannel] },
        { id: interaction.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
      ],
    });

    await channel.send(`👋 Bonjour <@${interaction.user.id}> ! Un membre du staff va t'aider bientôt.`);
    await interaction.reply({ content: `✅ Ton ticket a été créé : ${channel}`, ephemeral: true });
  }
};