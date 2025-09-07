
'use server';
/**
 * @fileOverview A helpful chatbot for BharatAI Bazaar.
 * 
 * - getChatbotResponse - A function that gets a response from the chatbot.
 * - ChatbotInput - The input type for the chatbot.
 * - ChatbotOutput - The output type for the chatbot.
 */

import {ai} from '@/ai/genkit';
import type { ChatbotInput, ChatbotOutput } from '@/lib/types';
import { ChatbotInputSchema, ChatbotOutputSchema } from '@/lib/types';


export async function getChatbotResponse(input: ChatbotInput): Promise<ChatbotOutput> {
  return await chatbotFlow(input);
}

const chatbotPrompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: { schema: ChatbotInputSchema },
  output: { schema: ChatbotOutputSchema },
  model: 'googleai/gemini-2.0-flash',
  prompt: `You are a friendly and helpful chatbot for an e-commerce platform called BharatAI Bazaar. Your goal is to assist users by answering their questions about the platform's features.

Keep your answers concise and easy to understand.

Here are the main features of BharatAI Bazaar:
- **For Buyers**: An AI-powered price comparison tool to find the best deals on products across different sellers like Amazon, Flipkart, and local wholesale markets. Buyers can search for products and see a comparison of prices, delivery times, and ratings.
- **For Sellers**:
    - **Sales Analytics**: Sellers can input their sales data (product category and units sold) to get AI-driven insights, including market average sales, top competitor sales, and personalized growth suggestions.
    - **Profit Calculator**: An advanced calculator to help sellers determine their potential profit margin by inputting costs like wholesale price, retail price, platform fees, shipping, taxes, and other expenses.

Based on the user's question, provide a helpful response.

User's question: {{{message}}}
`,
});

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input) => {
    const { output } = await chatbotPrompt(input);
    return output!;
  }
);
