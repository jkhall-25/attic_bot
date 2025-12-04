const { SlashCommandBuilder, PermissionFlagsBits, InteractionContextType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Select a user to ban.')
		.addUserOption((option) => option.setName('target')
			.setDescription('user to ban')
			.setRequired(true))
		.addStringOption((option) => option.setName('reason')
			.setDescription('State the reason for ban.')
			.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setContexts(InteractionContextType.Guild),
	async execute(interaction) {
		const target = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason') ?? 'No reason provided';

		await interaction.reply(`Banning ${target.username} for: ${reason}`);
		await interaction.guild.members.ban(target);
	},
};
