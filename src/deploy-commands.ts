// deploy-commands.ts

import { REST, Routes } from 'discord.js';
import * as dotenv from 'dotenv';
import * as ping from './commands/utility/ping';
import * as server from './commands/utility/server';
import * as user from './commands/utility/user';

dotenv.config();

const commands = [
  ping.pingCommand.toJSON(),
  server.serverCommand.toJSON(),
  user.userCommand.toJSON(),
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!), {
      body: commands,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
