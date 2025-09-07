
import { z } from 'zod';

// Price Comparison
export const comparePricesInputSchema = z.object({
    productName: z.string().min(1, "Product name is required."),
});
export type ComparePricesInput = z.infer<typeof comparePricesInputSchema>;
export type { ComparePricesOutput } from '@/ai/flows/compare-prices';

// Sales Analytics
export const SalesAnalyticsInputSchema = z.object({
  productCategory: z.string().min(1, "Product category is required.").describe('The product category the user is selling (e.g., "Cotton Kurtas").'),
  userSalesUnits: z.coerce.number().min(0, "Units sold cannot be negative.").describe('The number of units the user has sold in the last month.'),
});
export const SalesAnalyticsOutputSchema = z.object({
  marketAverageSales: z.number().describe('The estimated average monthly sales units for this product category in the market.'),
  topCompetitorSales: z.number().describe('An estimated monthly sales figure for a top competitor in this category.'),
  salesComparisonAnalysis: z.string().describe("A brief, encouraging analysis comparing the user's sales to the market and competitors."),
  growthSuggestions: z.array(z.string()).describe('A list of 3-4 specific, actionable suggestions for the seller to improve their sales and compete more effectively.'),
  marketTrend: z.string().describe('A one-sentence summary of the current market trend for this product category (e.g., "Demand is increasing due to the upcoming festival season.").'),
});
export type SalesAnalyticsInput = z.infer<typeof SalesAnalyticsInputSchema>;
export type SalesAnalyticsOutput = z.infer<typeof SalesAnalyticsOutputSchema>;

// Chatbot
export const ChatbotInputSchema = z.object({
  message: z.string().describe("The user's message to the chatbot."),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

export const ChatbotOutputSchema = z.object({
  response: z.string().describe("The chatbot's response."),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;
