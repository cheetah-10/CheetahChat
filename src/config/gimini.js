import { GoogleGenAI } from '@google/genai';

async function main(prompt) {
  const ai = new GoogleGenAI({
    apiKey: 'AQ.Ab8RN6JzpRLlTIa67RVLctA59FqvNG2w_D11fEGsq_Zw5q7GIw', 
  });

  const config = {
    responseModalities: ['TEXT'],
  };

  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model: 'gemini-2.0-flash', 
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
