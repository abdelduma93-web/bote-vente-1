const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fermer')
    .setDescription('Fermer le ticket actuel'),

  async execute(interaction) {
    if (!interaction.channel.name.startsWith('ticket-')) {
      return interaction.reply({ content: '❌ Cette commande ne peut être utilisée que dans un ticket !', ephemeral: true });
    }

    await interaction.reply({ content: '🔒 Ticket fermé ! Le salon sera supprimé dans 5 secondes...' });

    setTimeout(async () => {
      await interaction.channel.delete();
    }, 5000);
  }
};