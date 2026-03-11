const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = [
  {
    data: new SlashCommandBuilder()
      .setName('kick')
      .setDescription('Expulser un membre')
      .addUserOption(option => option.setName('membre').setDescription('Membre à expulser').setRequired(true))
      .addStringOption(option => option.setName('raison').setDescription('Raison').setRequired(false))
      .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction) {
      const membre = interaction.options.getUser('membre');
      const raison = interaction.options.getString('raison') || 'Aucune raison fournie';
      const membreGuild = interaction.guild.members.cache.get(membre.id);
      await membreGuild.kick(raison);
      await interaction.reply({ content: `✅ **${membre.tag}** a été expulsé. Raison : ${raison}` });
    }
  },
  {
    data: new SlashCommandBuilder()
      .setName('ban')
      .setDescription('Bannir un membre')
      .addUserOption(option => option.setName('membre').setDescription('Membre à bannir').setRequired(true))
      .addStringOption(option => option.setName('raison').setDescription('Raison').setRequired(false))
      .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction) {
      const membre = interaction.options.getUser('membre');
      const raison = interaction.options.getString('raison') || 'Aucune raison fournie';
      await interaction.guild.members.ban(membre.id, { reason: raison });
      await interaction.reply({ content: `✅ **${membre.tag}** a été banni. Raison : ${raison}` });
    }
  },
  {
    data: new SlashCommandBuilder()
      .setName('warn')
      .setDescription('Avertir un membre')
      .addUserOption(option => option.setName('membre').setDescription('Membre à avertir').setRequired(true))
      .addStringOption(option => option.setName('raison').setDescription('Raison').setRequired(true))
      .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction) {
      const membre = interaction.options.getUser('membre');
      const raison = interaction.options.getString('raison');
      await interaction.reply({ content: `⚠️ **${membre.tag}** a reçu un avertissement. Raison : ${raison}` });
    }
  }
];