'use server';
/**
 * @fileOverview A flow for comparing product prices across different platforms.
 * 
 * - comparePrices - A function that compares prices.
 * - ComparePricesInput - The input type for the comparePrices function.
 * - ComparePricesOutput - The return type for the comparePrices function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ProductPriceDetailSchema = z.object({
  productName: z.string().describe("The specific name of the product variant (e.g., 'Aashirvaad Select Sharbati Atta, 5kg')."),
  platform: z.string().describe('The platform where the product is sold (e.g., Amazon, Flipkart, Local Wholesale).'),
  priceRange: z.string().describe('The estimated price range for the product on the platform in Indian Rupees (e.g., "₹270-₹290").'),
  deliveryTime: z.string().describe('The estimated delivery time (e.g., 1-2 days, pickup only).'),
  rating: z.number().min(1).max(5).describe('The average customer rating out of 5.'),
  reviewSummary: z.string().describe('A brief summary of customer reviews.'),
});

const FrequentlyBoughtTogetherSchema = z.object({
    productName: z.string().describe('The name of the suggested product.'),
    price: z.string().describe('The estimated price of the suggested product in Indian Rupees.'),
    platform: z.string().describe('The platform where the product is likely sold (e.g., Amazon, Flipkart). Default to Amazon if unsure.'),
});


const ComparePricesInputSchema = z.object({
  productName: z.string().describe('The name of the product to search for.'),
});

const ComparePricesOutputSchema = z.object({
  searchedProductName: z.string().describe('The general product category that was searched (e.g., "organic wheat flour").'),
  products: z.array(ProductPriceDetailSchema).describe('A list of different product variants and their prices from various platforms.'),
  bestDeal: z.object({
    productName: z.string(),
    platform: z.string(),
    price: z.string().describe("The single lowest price of the best deal (e.g., '₹260')."),
    reason: z.string().describe('A brief reason why this is the best deal (e.g., lowest price, fastest delivery).'),
  }).describe('The best deal found among the products.'),
  frequentlyBoughtTogether: z.array(FrequentlyBoughtTogetherSchema).describe('A list of 2-3 products that are frequently bought together with the searched item.'),
});

export type ComparePricesInput = z.infer<typeof ComparePricesInputSchema>;
export type ComparePricesOutput = z.infer<typeof ComparePricesOutputSchema>;


export async function comparePrices(input: ComparePricesInput): Promise<ComparePricesOutput> {
  return await comparePricesFlow(input);
}

const comparePricesPrompt = ai.definePrompt({
  name: 'comparePricesPrompt',
  input: { schema: ComparePricesInputSchema },
  output: { schema: ComparePricesOutputSchema },
  prompt: `You are a price comparison engine for BharatAI Bazaar, an Indian marketplace. Your task is to generate realistic, fictional product data based on a user's search query. You must compare the product across Amazon, Flipkart, and a "Local Wholesale" option.

User's Search Query: {{{productName}}}

Instructions:
1.  **Analyze the User's Query**: Understand the user's search for '{{{productName}}}'. Create a specific, branded product name based on this query. For example, if the user searches for "5kg atta", a good product name would be "Aashirvaad Select Sharbati Atta, 5kg". If they search for "hp pavillion laptop", use "HP Pavilion Gaming Laptop". Use this exact product name for all platform entries.
2.  **Generate Platform-Specific Data**: For the generated product name, create three separate, realistic entries: one for Amazon, one for Flipkart, and one for "Local Wholesale".
    *   **Platform Name**: Use "Amazon" and "Flipkart" exactly.
    *   **Prices**: The prices should be realistic for the Indian market. Make the "Local Wholesale" price the lowest, followed by Amazon, and then Flipkart usually being slightly higher. Prices should be a range (e.g., "₹280-₹300" for atta, "₹65,000-₹68,000" for a laptop).
    *   **Delivery**: Amazon/Flipkart should have delivery times like "1-2 days". "Local Wholesale" should be "pickup only".
    *   **Ratings & Reviews**: Generate plausible ratings and brief, distinct review summaries for each platform.
3.  **Identify Best Deal**: Analyze the listings you created. The best deal is the one with the lowest price. For the 'price' field in the 'bestDeal' object, you MUST use the lower end of the priceRange (e.g., if priceRange is '₹260-₹270', use '₹260').
4.  **Suggest Related Items**: Generate 2-3 relevant "Frequently Bought Together" items with plausible names and prices. For each item, also specify a platform, defaulting to "Amazon".
5.  **Final Output**: Ensure the entire output is formatted according to the specified output schema. The 'searchedProductName' should be the user's original query.`,
});


const comparePricesFlow = ai.defineFlow(
  {
    name: 'comparePricesFlow',
    inputSchema: ComparePricesInputSchema,
    outputSchema: ComparePricesOutputSchema,
  },
  async (input) => {
    const { output } = await comparePricesPrompt(input);
    return output!;
  }
);
