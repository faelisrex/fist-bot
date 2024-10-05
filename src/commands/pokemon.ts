import axios from 'axios';
import { Message } from 'discord.js';

export const handlePokemonCommand = async (message: Message) => {
  const prefix = '!get pokemon ';
  if (message.content.toLocaleLowerCase().startsWith(prefix)) {
    const pokemonId: any = message.content.slice(prefix.length).trim();
    if (!isNaN(pokemonId)) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const pokemonName = response.data.name;
        message.reply(`The name of Pokémon ${pokemonId} is ${pokemonName}`);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        message.reply('Sorry, I could not fetch the Pokémon data.');
      }
    } else {
      message.reply('Please provide a valid Pokémon ID.');
    }
  }
};
