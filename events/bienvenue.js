const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    const channel = member.guild.systemChannel;
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle('👋 Nouveau membre !')
      .setDescription(`Bienvenue **${member.user.username}** sur **${member.guild.name}** !`)
      .setThumbnail(member.user.displayAvatarURL())
      .setFooter({ text: `Membre #${member.guild.memberCount}` })
      .setTimestamp();

    channel.send({ embeds: [embed] });
  }
};