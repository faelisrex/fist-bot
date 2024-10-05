import { SlashCommandBuilder } from 'discord.js';

const serverCommand = new SlashCommandBuilder()
  .setName('server')
  .setDescription('Replies with Server!');
async function execute(interaction: any) {
  await interaction.reply(`This command was executed in ${interaction.guild.name}`);
}
export { serverCommand, execute };
