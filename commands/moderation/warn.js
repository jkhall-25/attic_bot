const { SlashCommandBuilder, PermissionFlagsBits, InteractionContextType } = require('discord.js');
const fs = require('node:fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('Select a user to warn.')
		.addUserOption((option) => option.setName('target')
			.setDescription('user to warn')
			.setRequired(true))
		.addStringOption((option) => option.setName('reason')
			.setDescription('State the reason for the warning.')
			.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setContexts(InteractionContextType.Guild),
	async execute(interaction) {
		const target = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason') ?? 'No reason provided';

		const guildID = interaction.guild.id;
		// access server warns:
		client.guildWarns = new Collection();
		// path to commands dir:
		const foldersPath = join(process.cwd, '/data');

		if (!fs.existsSync(guildID)) {
			// if the guild has no folder then make one
		}

		// make the path to the guild data file
		const guildFile = join(foldersPath, guildID);
		const guildData = require(guildFile);
		// if the member already has a warn in this server, print how many
		if (target.id in guildData) {
			// get the target data
			// print how many
		}
		else {
			// else this is the user's first warning
		}

		await interaction.reply(`Warning ${target.username} for: ${reason}`);
		// add warn to user's file
	},
};
