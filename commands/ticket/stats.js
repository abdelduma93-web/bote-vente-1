const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('role')
    .setDescription('Donner ou retirer un rôle à un membre')
    .addUserOption(option => option.setName('membre').setDescription('Membre ciblé').setRequired(true))
    .addRoleOption(option => option.setName('role').setDescription('Rôle à donner/retirer').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    const membre = interaction.options.getMember('membre');
    const role = interaction.options.getRole('role');

    if (membre.roles.cache.has(role.id)) {
      await membre.roles.remove(role);
      await interaction.reply({ content: `✅ Rôle **${role.name}** retiré à **${membre.user.username}** !` });
    } else {
      await membre.roles.add(role);
      await interaction.reply({ content: `✅ Rôle **${role.name}** donné à **${membre.user.username}** !` });
    }
  }
};