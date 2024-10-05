// Intro to Discord.js

import { Client, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

// Create a new Discord client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log('Butt Ready!');
});

client.on('messageCreate', (message) => {
  if (message.content.toLocaleLowerCase() === '!ping') {
    message.reply('Pong!');
  }
});

client.login(process.env.BOT_TOKEN);
