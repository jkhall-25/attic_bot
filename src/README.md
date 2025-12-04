# attic_bot

## Setting up Atticbot

Atticbot requires a bot token stored in config.json. The format of config.json is:
> {
  "clientId": [clientID],
  "guildId": [guildID],
  "token": [bot token]
}

atticbot will not function without these tokens

To run the bot on your server, follow the instructions on this [discord.js guide page](https://discordjs.guide/legacy/preparations/app-setup) to create your bot token and invite link and add the bot to your server.

Then, run the bot by running `node atticbot.js` inside the project folder (the same folder as package.json). The bot should print `Ready!` in the command line if it's running correctly.

Once the bot is running, open a new terminal in the same folder and run `node deploy-commands.js` to share the bot's commands with discord.

Now the bot should appear in your server and respond and react to your slash commands. Try `/ping` to verify the bot is working.

## Moderation bot for discord

Goals:  
auto response on trigger word (per server)  
reaction roles (per server)  
echo message command  
highlight function
TBC  
