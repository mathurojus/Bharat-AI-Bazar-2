
"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getPriceComparison } from "@/app/actions";
import type { ComparePricesOutput } from "@/ai/flows/compare-prices";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, ArrowUpRight, ShoppingCart, Heart, Tag, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";

export default function BuyerDashboard() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [results, setResults] = React.useState<ComparePricesOutput | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setResults(null);

    const result = await getPriceComparison({ productName: searchQuery });
    setIsLoading(false);

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
      return;
    }

    if (result.data) {
      setResults(result.data);
    }
  };

  const isBestDeal = (productName: string, platform: string) => {
      return results?.bestDeal.productName === productName && results?.bestDeal.platform === platform;
  }

  const getPlatformUrl = (platform: string, productName: string) => {
    const encodedProductName = encodeURIComponent(productName);
    switch (platform.toLowerCase()) {
      case 'amazon':
        return `https://www.amazon.in/s?k=${encodedProductName}`;
      case 'flipkart':
        return `https://www.flipkart.com/search?q=${encodedProductName}`;
      default:
        return null;
    }
  }

  const handleAddToCart = (product: any) => {
    toast({
      title: "Added to Cart",
      description: `${product.productName} has been added to your cart.`,
    });
  }

  const handleAddToWishlist = (product: any) => {
     toast({
      title: "Added to Wishlist",
      description: `${product.productName} has been saved to your wishlist.`,
    });
  }

  return (
     <div className="min-h-screen w-full bg-background">
        <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2">
                    <Icons.Logo className="h-8 w-8 text-primary" />
                    <h1 className="font-headline text-2xl font-bold text-primary">BharatAI Bazaar</h1>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/profile"><User className="h-5 w-5" /></Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/cart">Cart</Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/wishlist">Wishlist</Link>
                    </Button>
                    <ThemeToggle />
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/login">Logout</Link>
                    </Button>
                </div>
            </div>
        </header>
        <main className="container mx-auto p-4 md:p-6">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>AI-Powered Price Comparison</CardTitle>
                        <CardDescription>Search for a product to compare prices across sellers and platforms in real-time.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="flex gap-2">
                           <Input 
                             placeholder="Enter product name... e.g., 5kg organic wheat flour"
                             value={searchQuery}
                             onChange={(e) => setSearchQuery(e.target.value)}
                             disabled={isLoading}
                           />
                           <Button type="submit" disabled={isLoading} variant="cta">
                             {isLoading && <Icons.Loader className="animate-spin" />}
                             {isLoading ? "Searching..." : "Search"}
                           </Button>
                        </form>
                    </CardContent>
                </Card>

                <div>
                  {results && (
                      <div className="mb-4">
                          <h2 className="text-2xl font-bold tracking-tight">
                            Results for <span className="text-primary">{results.searchedProductName}</span>
                          </h2>
                           <div className="mt-2 rounded-lg border border-green-600/50 bg-green-600/10 p-4 text-sm">
                               <p>
                                <Tag className="inline-block h-4 w-4 text-green-500 mr-1"/>
                                <span className="font-bold text-green-500">Best Deal Insight:</span> {results.bestDeal.reason}
                               </p>
                           </div>
                      </div>
                  )}

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {isLoading && Array.from({ length: 4 }).map((_, i) => (
                      <Card key={i}>
                        <CardHeader>
                          <Skeleton className="h-32 w-full" />
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <Skeleton className="h-5 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                          <Skeleton className="h-4 w-1/4" />
                        </CardContent>
                        <CardFooter>
                          <Skeleton className="h-8 w-full" />
                        </CardFooter>
                      </Card>
                    ))}

                    {!isLoading && !results && (
                      <div className="col-span-full text-center text-muted-foreground py-10">
                        <Icons.Sparkles className="h-12 w-12 mx-auto mb-4 text-primary/50"/>
                        <h3 className="text-lg font-semibold">Your search results will appear here.</h3>
                        <p>Find the best prices for products you need.</p>
                      </div>
                    )}
                    
                    {results?.products && results.products.map((p, index) => {
                        const platformUrl = getPlatformUrl(p.platform, p.productName);
                        return (
                        <Card key={index} className="flex flex-col">
                            <CardHeader className="relative flex h-40 items-center justify-center rounded-t-lg bg-muted p-4">
                               <h3 className="font-semibold text-lg leading-snug text-center text-muted-foreground">{p.productName}</h3>
                               {isBestDeal(p.productName, p.platform) &&
                                <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700 text-white">Best Deal</Badge>
                               }
                            </CardHeader>
                            <CardContent className="flex-grow space-y-2 pt-6">
                                <p className="text-sm text-muted-foreground">{p.platform}</p>
                                <div className="flex items-center gap-1">
                                  {Array.from({length: 5}).map((_, i) => (
                                    <Star key={i} className={`h-4 w-4 ${i < p.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                  ))}
                                  <span className="text-xs text-muted-foreground ml-1">({p.rating.toFixed(1)})</span>
                                </div>
                                <p className="text-xs italic text-muted-foreground pt-1">&quot;{p.reviewSummary}&quot;</p>
                            </CardContent>
                             <CardFooter className="flex-col items-stretch gap-2 pt-4">
                               <div className="flex justify-between items-center text-sm">
                                <p className="text-xl font-bold text-primary w-full">{p.priceRange}</p>
                                {platformUrl && (
                                   <Button asChild variant="outline" size="sm">
                                      <Link href={platformUrl} target="_blank">
                                        Visit Site
                                        <ArrowUpRight className="ml-1 h-4 w-4"/>
                                      </Link>
                                   </Button>
                                )}
                               </div>
                                <div className="flex gap-2 w-full">
                                    <Button variant="outline" size="sm" className="w-full" onClick={() => handleAddToWishlist(p)}>
                                        <Heart className="mr-2 h-4 w-4"/> Save
                                    </Button>
                                    <Button variant="cta" size="sm" className="w-full" onClick={() => handleAddToCart(p)}>
                                        <ShoppingCart className="mr-2 h-4 w-4"/> Add to Cart
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    )})}
                  </div>

                  {results?.frequentlyBoughtTogether && results.frequentlyBoughtTogether.length > 0 && (
                    <div className="mt-12">
                      <Separator className="mb-6"/>
                      <h3 className="text-2xl font-bold tracking-tight mb-4">Frequently Bought Together</h3>
                      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                          {results.frequentlyBoughtTogether.map((item, index) => {
                            const platformUrl = getPlatformUrl(item.platform, item.productName);
                            return (
                              <Card key={index} className="flex flex-col">
                                  <CardHeader className="p-4 flex h-32 items-center justify-center rounded-t-lg bg-muted">
                                      <h4 className="font-semibold text-sm text-center text-muted-foreground truncate">{item.productName}</h4>
                                  </CardHeader>
                                  <CardContent className="p-3 flex-grow">
                                      <p className="font-bold text-primary">{item.price}</p>
                                  </CardContent>
                                  {platformUrl && (
                                      <CardFooter className="p-3 pt-0">
                                           <Button asChild variant="outline" size="sm" className="w-full">
                                              <Link href={platformUrl} target="_blank">
                                                Visit Site
                                                <ArrowUpRight className="ml-1 h-4 w-4"/>
                                              </Link>
                                           </Button>
                                      </CardFooter>
                                  )}
                              </Card>
                          )})}
                      </div>
                    </div>
                  )}

                </div>
            </div>
        </main>
    </div>
  );
}

    
