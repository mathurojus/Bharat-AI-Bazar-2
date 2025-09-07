
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell, Label, ResponsiveContainer } from "recharts";
import { DollarSign, Filter, Search, ShoppingBag, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { SellerRankList } from "@/components/seller-rank-list";
import { ThemeToggle } from "@/components/theme-toggle";


const salesData = [
  { month: "Jan", sales: 186000 },
  { month: "Feb", sales: 292000 },
  { month: "Mar", sales: 305000 },
  { month: "Apr", sales: 212000 },
  { month: "May", sales: 324000 },
  { month: "Jun", sales: 438000 },
]

const topProductsData = [
  { name: 'Kurtas', value: 400, fill: 'hsl(var(--chart-1))' },
  { name: 'Sarees', value: 300, fill: 'hsl(var(--chart-2))' },
  { name: 'Spices', value: 250, fill: 'hsl(var(--chart-3))' },
  { name: 'Handicrafts', value: 200, fill: 'hsl(var(--chart-4))' },
  { name: 'Jewelry', value: 150, fill: 'hsl(var(--chart-5))' },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--primary))",
  },
  kurtas: { label: "Kurtas", color: "hsl(var(--chart-1))" },
  sarees: { label: "Sarees", color: "hsl(var(--chart-2))" },
  spices: { label: "Spices", color: "hsl(var(--chart-3))" },
  handicrafts: { label: "Handicrafts", color: "hsl(var(--chart-4))" },
  jewelry: { label: "Jewelry", color: "hsl(var(--chart-5))" },
} satisfies React.ComponentProps<typeof ChartContainer>["config"];


export default function SellerDashboard() {
  const [timeRange, setTimeRange] = React.useState("6m");
  const [isClient, setIsClient] = React.useState(false);
  const cardClass = "bg-card rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/20 hover:border-primary/30 border border-transparent";
  
  React.useEffect(() => {
    setIsClient(true)
  }, [])


  return (
    <div className="min-h-screen w-full bg-background">
        <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2">
                    <Icons.Logo className="h-8 w-8 text-primary" />
                    <h1 className="font-headline text-xl font-bold text-primary hidden sm:block">BharatAI Bazaar</h1>
                </div>
                <div className="hidden md:block font-semibold text-foreground/80">
                  Seller Dashboard
                </div>
                 <div className="flex items-center gap-2 sm:gap-4">
                    <div className="relative hidden sm:block">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search products..." className="pl-8 sm:w-[200px] lg:w-[300px] rounded-full" />
                    </div>
                     <Button variant="ghost" size="icon" asChild>
                        <Link href="/profile"><User className="h-5 w-5" /></Link>
                     </Button>
                     {isClient && <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9 gap-1">
                          <Filter className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Filter
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by time</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={timeRange} onValueChange={setTimeRange}>
                          <DropdownMenuRadioItem value="6m">Last 6 Months</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="1y">Last 1 Year</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="all">All Time</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>}
                    <ThemeToggle />
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/login">Logout</Link>
                    </Button>
                </div>
            </div>
        </header>
        <main className="container mx-auto p-4 md:p-6 lg:p-8">
             <div className="grid gap-4 md:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-4">
                 <Card className={cardClass}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-5 w-5 text-accent" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-accent">₹8,52,318</div>
                        <p className="text-xs text-green-500">+25.1% from last month</p>
                    </CardContent>
                </Card>
                 <Card className={cardClass}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Products Sold</CardTitle>
                        <ShoppingBag className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-primary">+2850</div>
                        <p className="text-xs text-green-500">+192.1% from last month</p>
                    </CardContent>
                </Card>
                 <Card className={cn(cardClass, "flex flex-col")}>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Profit Calculator</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-end">
                        <p className="text-xs text-muted-foreground mb-4">Analyze your profit margins with advanced tools.</p>
                        <Button asChild size="sm" variant="cta" className="w-full text-white transition-shadow duration-300 hover:shadow-lg hover:hover-glow">
                            <Link href="/seller/calculator">
                                Launch Calculator
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card className={cn(cardClass, "flex flex-col")}>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Sales Analytics</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-end">
                        <p className="text-xs text-muted-foreground mb-4">Get AI-powered sales insights to boost growth.</p>
                         <Button asChild size="sm" variant="cta" className="w-full text-white transition-shadow duration-300 hover:shadow-lg hover:hover-glow">
                            <Link href="/seller/analytics">
                                View Analytics
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
             <div className="mt-6 grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-5">
                <Card className={`lg:col-span-3 ${cardClass}`}>
                    <CardHeader>
                        <CardTitle>Sales Overview</CardTitle>
                        <CardDescription>Your sales over the last 6 months.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <ChartContainer config={chartConfig} className="h-[300px] w-full">
                          <BarChart data={salesData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                              <defs>
                                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.5}/>
                                  </linearGradient>
                              </defs>
                              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)"/>
                              <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                              <YAxis tickFormatter={(value) => `₹${Number(value) / 1000}k`} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12}/>
                              <ChartTooltip 
                                cursor={{fill: 'hsl(var(--accent) / 0.2)', radius: 8}}
                                content={<ChartTooltipContent formatter={(value) => `₹${Number(value).toLocaleString()}`} />} 
                              />
                              <Bar dataKey="sales" fill="url(#salesGradient)" radius={[8, 8, 0, 0]} />
                          </BarChart>
                      </ChartContainer>
                    </CardContent>
                </Card>
                <Card className={`lg:col-span-2 ${cardClass}`}>
                     <CardHeader>
                        <CardTitle>Top Products</CardTitle>
                        <CardDescription>Your best selling product categories.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig} className="h-[300px] w-full">
                           <PieChart>
                              <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                              <Pie 
                                  data={topProductsData} 
                                  dataKey="value" 
                                  nameKey="name" 
                                  cx="50%" 
                                  cy="50%" 
                                  innerRadius="60%" 
                                  outerRadius="80%" 
                                  strokeWidth={2}
                                  stroke="hsl(var(--background))"
                              >
                              {topProductsData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                               <Label
                                  content={({ viewBox }) => {
                                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                      return (
                                      <text
                                          x={viewBox.cx}
                                          y={viewBox.cy}
                                          textAnchor="middle"
                                          dominantBaseline="middle"
                                          className="fill-foreground text-center"
                                      >
                                          <tspan
                                              x={viewBox.cx}
                                              y={viewBox.cy}
                                              className="text-2xl font-bold"
                                          >
                                          {topProductsData.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()}
                                          </tspan>
                                          <tspan
                                              x={viewBox.cx}
                                              y={(viewBox.cy || 0) + 18}
                                              className="text-xs text-muted-foreground"
                                          >
                                          Total Units
                                          </tspan>
                                      </text>
                                      )
                                  }
                                  }}
                              />
                              </Pie>
                          </PieChart>
                      </ChartContainer>
                    </CardContent>
                </Card>
             </div>
             <section className="mt-8">
                <SellerRankList />
             </section>
        </main>
    </div>
  );
}

    
