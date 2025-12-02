const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Echoes your message')
        .addStringOption((options) => options.setName('input')
										.setDescription('The message to echo')
										.setRequired(true)),
	async execute(interaction) {
		const input = interaction.options.getString('input')
		await interaction.reply(input);
	},
};
