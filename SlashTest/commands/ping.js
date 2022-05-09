const {SlashCommandBuilder} = require('@discordjs/builders')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('봇의 핑을 테스트 합니다.'),
        
    async execute(interaction) {
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
    },
}