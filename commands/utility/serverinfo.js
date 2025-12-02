const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Replies with server name and member count'),
	async execute(interaction) {
		await interaction.reply(`Server info:\nServer name: ${interaction.guild.name}\nMembers: ${interaction.guild.memberCount}`);
	},
};
