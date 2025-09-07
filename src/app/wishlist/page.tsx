
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Trash2, ShoppingCart, Heart, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialWishlistItems = [
  { productId: '5', title: 'Amul Gold Homogenised Standardised Milk, 1L', price: 70, seller: 'Local Wholesale', link: '#' },
  { productId: '6', title: 'HP Pavilion Gaming Laptop', price: 68000, seller: 'Flipkart', link: '#' },
];

type WishlistItem = typeof initialWishlistItems[0];

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = React.useState<WishlistItem[]>([]);
  const { toast } = useToast();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    // This will only run on the client, after the initial render
    setWishlistItems(initialWishlistItems);
  }, []);

  const handleRemoveFromWishlist = (productId: string) => {
    const item = wishlistItems.find(i => i.productId === productId);
    setWishlistItems(wishlistItems.filter(item => item.productId !== productId));
    toast({
        title: "Removed from Wishlist",
        description: `${item?.title} has been removed.`,
    });
  };

  const handleAddToCart = (product: any) => {
     handleRemoveFromWishlist(product.productId);
     toast({
      title: "Added to Cart",
      description: `${product.title} has been moved to your cart.`,
    });
  };
  
  if (!isMounted) {
    return null;
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
                      <Link href="/buyer">Continue Shopping</Link>
                  </Button>
                  <ThemeToggle />
                  <Button variant="ghost" size="sm" asChild>
                      <Link href="/login">Logout</Link>
                  </Button>
              </div>
          </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
        
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground" />
            <h2 className="mt-4 text-2xl font-semibold">Your wishlist is empty</h2>
            <p className="text-muted-foreground mt-2">Save items you love by clicking the heart icon.</p>
            <Button asChild className="mt-6" variant="cta">
              <Link href="/buyer">Discover Products</Link>
            </Button>
          </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map(item => (
                    <Card key={item.productId} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                             <p className="text-sm text-muted-foreground">Sold by: {item.seller}</p>
                             <p className="text-lg font-bold text-primary mt-2">₹{item.price.toFixed(2)}</p>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                             <Button variant="destructive" size="icon" onClick={() => handleRemoveFromWishlist(item.productId)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button className="w-full" variant="cta" onClick={() => handleAddToCart(item)}>
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Move to Cart
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        )}
      </main>
    </div>
  )
}

    
