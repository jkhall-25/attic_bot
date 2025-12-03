const { SlashCommandBuilder, PermissionFlagsBits, InteractionContextType } = require('discord.js');
const fs = require('node:fs');

function WarnDetails(rule, date, reason) {
	this.rule = rule;
	this.date = date;
	this.reason = reason;
}

function Warn(id, warn) {
	this.id = id;
	this.warn = warn;
}


module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('Select a user to warn.')
		.addUserOption((option) => option.setName('target')
			.setDescription('user to warn')
			.setRequired(true))
		.addStringOption((option) => option.setName('rule')
			.setDescription('rule broken')
			.setRequired(false))
		.addStringOption((option) => option.setName('reason')
			.setDescription('State the reason for the warning.')
			.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setContexts(InteractionContextType.Guild),
	async execute(interaction) {
		const targetID = interaction.option.getUser('target').id;
		const rule = interaction.option.getString('rule');
		const reason = interaction.option.getString('reason') ?? 'No reason provided';
		const date = new Date();
		const details = new WarnDetails(date, rule, reason);

		const guildID = interaction.guild.id;
		// access server warns:
		client.guildWarns = new Collection();
		// path to data dir:
		const foldersPath = join(process.cwd, '/data');
		// make the path to the guild data file
		const guildFile = join(foldersPath, guildID, '.json');

		if (!fs.existsSync(guildFile)) {
			// if the guild has no folder then make one
			mkdir(guildFile);
		}

		const guildDataJSON = require(guildFile);
		guildData = JSON.parse(guildDataJSON);
		// if the member already has a warn in this server, print how many
		if (guildData.guildID.userid.warns) {
			// get the target data
			targetWarns = new Collection();
			// server.user.warns is the array of warnings
			targetWarns = guildData.guildID.userID.warns;
			warnsCount = targetWarns.length();
			await interaction.reply(`This is warn number ${warnsCount} for this user. Do you want to continue or cancel?`);
		}
		// else this is the user's first warning
		else if (!guildData.target.id.warns) {
			guildData.guildID.userID = targetID;
			// create a new warns array
			guildData.guildID.targetID.Warns = new Array();
		}

		// assign this warning a unique ID based on the datetime
		warnID = dates.map(Date.parse);
		const FirstWarn = new Warn(warnID, details);
		guildData.guildID.targetID.Warns.push(FirstWarn);
		JSON.stringify(guildData);
		fs.writeFileSync(guildfile);

		const checkguildDataJSON = require(guildFile);
		guildData = JSON.parse(checkguildDataJSON);

		if (guildData.guildID.userID.Warns[`${warnID}`]) {
			// if successful, print success
			await interaction.reply(`Warned ${target.username} for: ${reason}`);
		}
		else {
			// unsuccessful
			await interaction.reply('Could not process warning');
		}

	},
};
