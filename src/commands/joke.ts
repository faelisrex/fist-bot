import axios from 'axios';
import { Message } from 'discord.js';

export const handleJokeCommand = async (message: Message) => {
  if (message.content.toLocaleLowerCase() === '!joke') {
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
      const joke = `${response.data.setup} - ${response.data.punchline}`;
      message.reply(joke);
    } catch (error) {
      console.error('Error fetching joke:', error);
      message.reply('Sorry, I could not fetch a joke.');
    }
  }
};
