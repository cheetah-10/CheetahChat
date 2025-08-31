import { GoogleGenAI } from '@google/genai';

async function main(prompt) {
  const ai = new GoogleGenAI({
    apiKey: 'AIzaSyC6N2AUhIPpFNvI85jE2CK0RnnoQpN3J9w',
  });

  const config = {
    responseModalities: ['TEXT'],
  };

  const model = 'gemini-2.0-flash';
  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fullText = "";

  for await (const chunk of response) {
    if (chunk.text) {
      console.log(chunk.text);
      fullText += chunk.text;
    }
  }
  return fullText;
}

export default main;
