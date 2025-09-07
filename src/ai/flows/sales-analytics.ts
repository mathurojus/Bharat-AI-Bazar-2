'use server';
/**
 * @fileOverview A flow for providing sales analytics and competitive insights to sellers.
 * 
 * - getSalesAnalytics - A function that analyzes sales data and provides growth suggestions.
 */

import { ai } from '@/ai/genkit';
import type { SalesAnalyticsInput, SalesAnalyticsOutput } from '@/lib/types';
import { SalesAnalyticsInputSchema, SalesAnalyticsOutputSchema } from '@/lib/types';


export async function getSalesAnalytics(input: SalesAnalyticsInput): Promise<SalesAnalyticsOutput> {
  return await salesAnalyticsFlow(input);
}

const salesAnalyticsPrompt = ai.definePrompt({
  name: 'salesAnalyticsPrompt',
  input: { schema: SalesAnalyticsInputSchema },
  output: { schema: SalesAnalyticsOutputSchema },
  prompt: `You are a sales analyst for BharatAI Bazaar, an Indian marketplace. Your role is to provide sellers with competitive insights and actionable advice.

  A seller has provided their sales data for a product category:
  - Product Category: {{{productCategory}}}
  - Units Sold This Month: {{{userSalesUnits}}}

  Based on this, generate a fictional but realistic analysis.
  1.  **Market Average Sales**: Estimate the average number of units a typical seller might sell in this category per month. Make it higher than the user's sales to encourage growth.
  2.  **Top Competitor Sales**: Estimate the sales of a top-performing competitor. This should be significantly higher than the market average.
  3.  **Sales Comparison Analysis**: Write a short (2-3 sentences), encouraging analysis. Acknowledge their current performance and highlight the potential for growth by comparing their sales to the market average and top competitors.
  4.  **Growth Suggestions**: Provide a list of exactly 3-4 concrete, actionable suggestions tailored to the Indian market. Examples: "Improve product photos with better lighting," "Add descriptions in Hindi or another local language," "Offer a small discount for bulk purchases," "Run a limited-time offer during the upcoming festival season."
  5.  **Market Trend**: Give a brief, one-sentence overview of the current market trend for this product.

  Generate realistic but fictional data. Ensure the tone is helpful and motivating.
  `,
});

const salesAnalyticsFlow = ai.defineFlow(
  {
    name: 'salesAnalyticsFlow',
    inputSchema: SalesAnalyticsInputSchema,
    outputSchema: SalesAnalyticsOutputSchema,
  },
  async (input) => {
    const { output } = await salesAnalyticsPrompt(input);
    return output!;
  }
);
