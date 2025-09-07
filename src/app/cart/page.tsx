
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Trash2, PlusCircle, MinusCircle, Tag, Package, User } from "lucide-react"

const initialCartItems = [
  { productId: '1', title: 'Aashirvaad Select Sharbati Atta, 5kg', price: 270, seller: 'Local Wholesale', quantity: 2, link: '#' },
  { productId: '2', title: 'Aashirvaad Select Sharbati Atta, 5kg', price: 285, seller: 'Amazon', quantity: 1, link: '#' },
  { productId: '3', title: 'Fortune Sun Lite Refined Sunflower Oil, 5L', price: 750, seller: 'Flipkart', quantity: 1, link: '#' },
  { productId: '4', title: 'Tata Salt, 1kg', price: 25, seller: 'Amazon', quantity: 3, link: '#' },
];

type CartItem = typeof initialCartItems[0];

export default function CartPage() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = React.useState("");
  const [discount, setDiscount] = React.useState(0);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    // This will only run on the client, after the initial render
    setCartItems(initialCartItems);
  }, []);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      setCartItems(cartItems.filter(item => item.productId !== productId));
    } else {
      setCartItems(cartItems.map(item => item.productId === productId ? { ...item, quantity: newQuantity } : item));
    }
  };
  
  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "SAVE10") {
      const total = calculateGrandTotal();
      setDiscount(total * 0.10);
    } else {
      setDiscount(0);
    }
  };
  
  const calculateSellerSubtotal = (seller: string) => {
    return cartItems
      .filter(item => item.seller === seller)
      .reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateGrandTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };
  
  const groupedBySeller = cartItems.reduce((acc, item) => {
    (acc[item.seller] = acc[item.seller] || []).push(item);
    return acc;
  }, {} as Record<string, typeof cartItems>);

  const grandTotal = calculateGrandTotal();
  const finalTotal = grandTotal - discount;
  
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
        <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <Icons.ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground" />
            <h2 className="mt-4 text-2xl font-semibold">Your cart is empty</h2>
            <p className="text-muted-foreground mt-2">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild className="mt-6" variant="cta">
              <Link href="/buyer">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {Object.entries(groupedBySeller).map(([seller, items]) => (
                <Card key={seller}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-muted-foreground" /> 
                        {seller}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {items.map(item => (
                        <div key={item.productId} className="flex items-center gap-4">
                          <div className="flex-1">
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="icon" variant="ghost" onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}>
                                <MinusCircle className="h-5 w-5" />
                            </Button>
                            <span>{item.quantity}</span>
                            <Button size="icon" variant="ghost" onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}>
                                <PlusCircle className="h-5 w-5" />
                            </Button>
                          </div>
                          <p className="w-20 text-right font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                          <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleQuantityChange(item.productId, 0)}>
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                   <CardFooter className="bg-muted/50 p-4 justify-end">
                      <p className="font-semibold">Subtotal for {seller}: ₹{calculateSellerSubtotal(seller).toFixed(2)}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{grandTotal.toFixed(2)}</span>
                  </div>
                   <div className="flex justify-between">
                    <span>Discount</span>
                    <span className="text-green-500">- ₹{discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Calculated at next step</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Grand Total</span>
                    <span>₹{finalTotal.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <label htmlFor="coupon" className="text-sm font-medium">Coupon Code</label>
                    <div className="flex gap-2">
                      <Input 
                        id="coupon" 
                        placeholder="e.g. SAVE10"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button onClick={applyCoupon} variant="outline">Apply</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" size="lg" variant="cta">
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

    
