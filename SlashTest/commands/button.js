const {SlashCommandBuilder} = require('@discordjs/builders')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('버튼')
        .setDescription('버튼을 만듭니다'),

    async execute(interaction) {
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('test1')
                .setLabel('Primary')
                .setStyle('PRIMARY'),   

            new MessageButton()
                .setCustomId('Danger')
                .setLabel('Danger')
                .setStyle('DANGER'),
        )
        
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Some title')
			.setURL('https://discord.js.org')
			.setDescription('Some description here');

        //버튼을 만드는 부분
		await interaction.reply({ content: '', ephemeral: true, embeds: [embed], components: [row] });
    
        const fliter = (interaction) => {
            return interaction.customId === "test1";
        };

        const collector = interaction.channel.createMessageComponentCollector({
            fliter,
            time: 3 * 1000,
        });

        collector.on("collect", async (interaction) => {
            if(interaction.customId === "test1") {
                await interaction.reply(interaction.customId + "을 클릭했다");
            }
        });

        collector.on("end", async (collact) =>{
            console.log("");
        }); 
    },
}