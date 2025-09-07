
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LandingPage() {
  const testimonials = [
    {
      name: "Ravi Kumar",
      role: "Electronics Seller, Delhi",
      avatar: "https://placehold.co/100x100/EBF5FF/3B82F6?text=RK",
      testimonial: "BharatAI Bazaar's analytics helped me triple my sales in just one quarter. The insights on what to stock and how to price my products are invaluable!",
      aiHint: "man portrait"
    },
    {
      name: "Priya Sharma",
      role: "Boutique Owner, Mumbai",
      avatar: "https://placehold.co/100x100/EBF5FF/3B82F6?text=PS",
      testimonial: "As a small business owner, the price comparison tool is a lifesaver. I've cut my sourcing costs by 20% by finding the best wholesale deals.",
       aiHint: "woman portrait"
    },
    {
      name: "Amit Patel",
      role: "Handicrafts Exporter, Jaipur",
      avatar: "https://placehold.co/100x100/EBF5FF/3B82F6?text=AP",
      testimonial: "The chatbot assistant makes managing my listings so much easier. It's like having an extra pair of hands working for me 24/7. Highly recommended!",
      aiHint: "person portrait"
    },
  ];

  return (
    <div className="min-h-screen w-full bg-background">
      <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Icons.Logo className="h-8 w-8 text-primary" />
            <h1 className="font-headline text-2xl font-bold text-primary">BharatAI Bazaar</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild>
              <Link href="/login">Login / Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-6">
          <div className="flex flex-col items-center justify-center text-center py-12 md:py-24">
            <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Welcome to BharatAI Bazaar
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
              India's AI Marketplace Copilot. We help buyers find the best deals and sellers grow smarter.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/login?role=buyer">Shop for Best Deals</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/login?role=seller">Sell and Grow</Link>
              </Button>
            </div>
          </div>

          <div className="my-12 flex justify-center">
            <div className="rounded-full bg-primary/10 p-8 shadow-xl">
               <Icons.Logo className="h-48 w-48 text-primary" />
            </div>
          </div>
          
          <div className="py-12 text-center">
            <h3 className="text-lg font-semibold uppercase text-muted-foreground tracking-wider">Trusted by India's Top Sellers & Businesses</h3>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              <div className="flex justify-center items-center gap-2">
                <Icons.Sparkles className="h-6 w-6 text-muted-foreground"/>
                <span className="font-bold text-xl text-muted-foreground">InnovateCorp</span>
              </div>
               <div className="flex justify-center items-center gap-2">
                <Icons.TrendingUp className="h-6 w-6 text-muted-foreground"/>
                <span className="font-bold text-xl text-muted-foreground">MarketMovers</span>
              </div>
               <div className="flex justify-center items-center gap-2">
                <Icons.Package className="h-6 w-6 text-muted-foreground"/>
                <span className="font-bold text-xl text-muted-foreground">BharatGoods</span>
              </div>
               <div className="flex justify-center items-center gap-2">
                <Icons.Calculator className="h-6 w-6 text-muted-foreground"/>
                <span className="font-bold text-xl text-muted-foreground">SellSmart</span>
              </div>
            </div>
          </div>

          <div className="py-12 md:py-24">
            <h2 className="font-headline text-3xl font-bold tracking-tighter text-center sm:text-4xl">Hear from Our Successful Users</h2>
             <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center gap-4">
                       <Avatar>
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                       </Avatar>
                       <div>
                         <h4 className="font-bold">{testimonial.name}</h4>
                         <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                       </div>
                    </CardHeader>
                    <CardContent>
                       <p className="text-muted-foreground italic">&quot;{testimonial.testimonial}&quot;</p>
                    </CardContent>
                  </Card>
                ))}
             </div>
          </div>
      </main>
      <footer className="container mx-auto py-6 px-4 text-center text-sm text-muted-foreground md:px-6">
        <p>&copy; {new Date().getFullYear()} BharatAI Bazaar. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
