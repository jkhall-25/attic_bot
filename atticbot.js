// Require the necessary discord.js classes
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { Client, Collection, GatewayIntentBits, MessageFlags } from 'discord.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import token from './config.json' with { type:'json' };

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


// access commands:
client.commands = new Collection();
// path to commands dir:
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const foldersPath = join(__dirname, 'commands');
const commandFolders = readdirSync(foldersPath);


for (const folder of commandFolders) {
	const commandsPath = join(foldersPath, folder);
	// filter non .js files
	const commandFiles = readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = join(commandsPath, file);
		const command = await import(filePath);
		if ('data' in command && 'execute' in command) {
			// Set a new item in the Collection
			// With the key as the command name and the value as the exported module
			client.commands.set(command.data.name, command);
		}
		else {
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
	// console.log(client.commands);
});


client.on('interactionCreate', async interaction => {
	// exit the slash command handler if the command is not a slash command
	if (!interaction.isChatInputCommand()) return;
	// otherwise parse the command
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: 'There was an error while executing this command!',
				flags: MessageFlags.Ephemeral,
			});
		}
		else {
			await interaction.reply({
				content: 'There was an error while executing this command!',
				flags: MessageFlags.Ephemeral,
			});
		}
	}
});

// Login to Discord with your client's token
client.login(token);