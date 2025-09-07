
"use server";

import { comparePrices } from "@/ai/flows/compare-prices";
import { getSalesAnalytics } from "@/ai/flows/sales-analytics";
import type { ComparePricesInput, SalesAnalyticsInput, ChatbotInput } from "@/lib/types";
import { getChatbotResponse as getChatbotResponseFlow } from "@/ai/flows/chatbot";


export async function getPriceComparison(values: ComparePricesInput) {
  try {
    const result = await comparePrices(values);
    return { success: true, data: result };
  } catch (error) {
    console.error("Price comparison flow failed:", error);
    return { error: "Failed to compare prices. Please try again." };
  }
}


export async function getSalesAnalyticsAction(values: SalesAnalyticsInput) {
  try {
    const result = await getSalesAnalytics(values);
    return { success: true, data: result };
  } catch (error) {
    console.error("Sales analytics flow failed:", error);
    return { error: "Failed to get sales analysis. Please try again." };
  }
}

export async function getChatbotResponse(values: ChatbotInput) {
  try {
    const result = await getChatbotResponseFlow(values);
    return { success: true, data: result };
  } catch (error) {
    console.error("Chatbot flow failed:", error);
    return { error: "Failed to get chatbot response. Please try again." };
  }
}
