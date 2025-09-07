
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { CheckCircle, Package, User } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const cartItems = [
  { productId: '1', title: 'Aashirvaad Select Sharbati Atta, 5kg', price: 270, seller: 'Local Wholesale', quantity: 2 },
  { productId: '2', title: 'Aashirvaad Select Sharbati Atta, 5kg', price: 285, seller: 'Amazon', quantity: 1 },
  { productId: '3', title: 'Fortune Sun Lite Refined Sunflower Oil, 5L', price: 750, seller: 'Flipkart', quantity: 1 },
  { productId: '4', title: 'Tata Salt, 1kg', price: 25, seller: 'Amazon', quantity: 3 },
];

const walletBalance = 100.00;
const couponDetails = { code: 'SAVE10', discount: 165.50, cashback: 50.00 };

export default function CheckoutPage() {
    const groupedBySeller = cartItems.reduce((acc, item) => {
        (acc[item.seller] = acc[item.seller] || []).push(item);
        return acc;
    }, {} as Record<string, typeof cartItems>);

    const grandTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const finalTotal = grandTotal - couponDetails.discount;

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
                            <Link href="/cart">Back to Cart</Link>
                        </Button>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <main className="container mx-auto p-4 md:p-6">
                <h1 className="text-3xl font-bold mb-6">Checkout</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Shipping Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Shipping Address</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" placeholder="Enter your full name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" placeholder="Enter your phone number" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" placeholder="Enter your address" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" placeholder="Enter your city" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="pincode">Pincode</Label>
                                    <Input id="pincode" placeholder="Enter your pincode" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Method */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Method</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RadioGroup defaultValue="upi" className="space-y-4">
                                    <Label className="flex items-center gap-4 rounded-md border p-4 cursor-pointer hover:bg-muted/50">
                                        <RadioGroupItem value="upi" id="upi" />
                                        <span>UPI (Google Pay, PhonePe, Paytm)</span>
                                    </Label>
                                    <Label className="flex items-center gap-4 rounded-md border p-4 cursor-pointer hover:bg-muted/50">
                                        <RadioGroupItem value="card" id="card" />
                                        <span>Credit/Debit Card</span>
                                    </Label>
                                    <Label className="flex items-center gap-4 rounded-md border p-4 cursor-pointer hover:bg-muted/50">
                                        <RadioGroupItem value="netbanking" id="netbanking" />
                                        <span>Net Banking</span>
                                    </Label>
                                    <Label className="flex items-center gap-4 rounded-md border p-4 cursor-pointer hover:bg-muted/50">
                                        <RadioGroupItem value="cod" id="cod" />
                                        <span>Cash on Delivery (COD)</span>
                                    </Label>
                                    <Label className="flex items-center gap-4 rounded-md border p-4 cursor-pointer hover:bg-muted/50">
                                        <RadioGroupItem value="wallet" id="wallet" />
                                        <div className="flex justify-between w-full">
                                            <span>Wallet Balance</span>
                                            <span className="font-semibold">₹{walletBalance.toFixed(2)}</span>
                                        </div>
                                    </Label>
                                </RadioGroup>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                 {Object.entries(groupedBySeller).map(([seller, items]) => (
                                    <div key={seller}>
                                        <h3 className="font-semibold text-sm flex items-center gap-2"><Package className="h-4 w-4 text-muted-foreground" /> {seller}</h3>
                                        <ul className="text-sm space-y-1 text-muted-foreground ml-6">
                                           {items.map(item => (
                                                <li key={item.productId} className="flex justify-between">
                                                    <span>{item.title} (x{item.quantity})</span>
                                                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                                </li>
                                           ))}
                                        </ul>
                                    </div>
                                 ))}
                                <Separator />
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>₹{grandTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-green-600">
                                        <span>Coupon Discount ({couponDetails.code})</span>
                                        <span>- ₹{couponDetails.discount.toFixed(2)}</span>
                                    </div>
                                     <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className="font-semibold">FREE</span>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-bold text-lg">
                                    <span>To Pay</span>
                                    <span>₹{finalTotal.toFixed(2)}</span>
                                </div>
                                 <div className="text-center text-sm text-green-600 font-medium p-2 bg-green-500/10 rounded-md">
                                    Estimated Cashback: ₹{couponDetails.cashback.toFixed(2)}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" size="lg" variant="cta">
                                    Place Order
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}

    
