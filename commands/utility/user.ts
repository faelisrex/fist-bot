import { SlashCommandBuilder } from 'discord.js';

const userCommand = new SlashCommandBuilder().setName('user').setDescription('Replies with User!');
async function execute(interaction: any) {
  await interaction.reply(`This command was executed by ${interaction.user.tag}`);
}

export { userCommand, execute };
