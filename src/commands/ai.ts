import { Message } from 'discord.js';
import axios from 'axios';

export const handleAICommand = async (message: Message) => {
  const commandPrefix = '!ai ';
  if (message.content.toLocaleLowerCase().startsWith(commandPrefix)) {
    console.log('AI command detected');

    const userMessage = message.content.slice(commandPrefix.length).trim();
    try {
      const response = await axios.post('http://localhost:1234/v1/chat/completions', {
        model: 'lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF',
        messages: [
          { role: 'system', content: 'Always answer in Cebuano Bisaya.' },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.7,
      });
      const aiReply = response.data.choices[0].message.content;
      message.reply(aiReply);
    } catch (error) {
      console.error('Error communicating with local LLM:', error);
      message.reply('Sorry, I could not process your request.');
    }
  }
};
