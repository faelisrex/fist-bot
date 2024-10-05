// Intro to Discord.js
import dotenv from 'dotenv';
import axios from 'axios';
import * as ping from './commands/utility/ping';
import * as server from './commands/utility/server';
import * as user from './commands/utility/user';
import { handlePokemonCommand } from './commands/pokemon';

import { Client, Collection, Events, GatewayIntentBits, TextChannel } from 'discord.js';

dotenv.config();
interface ExtendedClient extends Client {
  commands: Collection<string, any>;
}
// Create a new Discord client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
}) as ExtendedClient;

client.on(Events.MessageCreate, async (message) => {
  console.log('Message received:', message.content); // Log every message received
  if (message.content.toLocaleLowerCase() === 'hello') {
    message.reply('hi');
  }
  if (message.content.toLocaleLowerCase() === 'hoy') {
    message.reply('UNSA MAN');
  }
  await handlePokemonCommand(message);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.content.toLocaleLowerCase() === '!joke') {
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
      const joke = `${response.data.setup} - ${response.data.punchline}`;
      message.reply(joke);
    } catch (error) {
      console.error('Error fetching joke:', error);
      message.reply('Sorry, I could not fetch a joke at this time.');
    }
  }
});

// Create a collection to store commands
client.commands = new Collection();
client.commands.set(ping.pingCommand.name, ping);
client.commands.set(server.serverCommand.name, server);
client.commands.set(user.userCommand.name, user);

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Butt Ready! Logged in as ${readyClient.user?.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  console.log(`Command: ${commandName}`);

  const command = client.commands.get(commandName);

  if (!command) {
    console.log(`Command not found: ${commandName}`);
    return;
  }

  try {
    await command.execute(interaction);
    console.log(`Command executed: ${commandName}`);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

client
  .login(process.env.DISCORD_TOKEN)
  .then(() => {
    console.log('Logged in successfully');
  })
  .catch((error) => {
    console.error('Error logging in:', error);
  });
