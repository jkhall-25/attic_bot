// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, MessageFlags } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


// access commands:
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands'); // path to commands dir
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js')); // filter non .js files
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			// Set a new item in the Collection
			// With the key as the command name and the value as the exported module
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] the command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Event.InteractionCreate, (interaction) => {
	if (!interaction.isChatInputCommand()) return; 
	console.log(interaction);
});

// When the client is ready, run this code (only once)
client.once('clientReady', () => {
	console.log('Ready!');
	//console.log(client.commands);
});


client.on('interactionCreate', async interaction => {
	//exit the slash command handler if the command is not a slash command
	if (!interaction.isChatInputCommand()) return;
	//otherwise parse the command
	const command = interaction.client.commands.get(interaction.commandName);
	
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
	
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: 'There was an error while executing this command!',
				flags: MessageFlags.Ephemeral,
			});
		} else {
			await interaction.reply({ 
				content: 'There was an error while executing this command!', 
				flags: MessageFlags.Ephemeral,
			});
		}
	}
});

// Login to Discord with your client's token
client.login(token);