
"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell, Line, LineChart, LabelList } from "recharts";
import { Icons } from "@/components/icons";
import { getSalesAnalyticsAction } from "@/app/actions";
import { SalesAnalyticsInputSchema, type SalesAnalyticsInput, type SalesAnalyticsOutput } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { List, CheckCircle, TrendingUp as TrendingUpIcon, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { SellerRankList } from "@/components/seller-rank-list";
import { ThemeToggle } from "@/components/theme-toggle";


const salesData = [
    { date: "Jan", sales: 86000 },
    { date: "Feb", sales: 92000 },
    { date: "Mar", sales: 105000 },
    { date: "Apr", sales: 112000 },
    { date: "May", sales: 124000 },
    { date: "Jun", sales: 138000 },
]

const topProductsData = [
  { name: 'Kurtas', value: 400, fill: 'hsl(var(--chart-1))' },
  { name: 'Sarees', value: 300, fill: 'hsl(var(--chart-2))' },
  { name: 'Spices', value: 300, fill: 'hsl(var(--chart-3))' },
  { name: 'Handicrafts', value: 200, fill: 'hsl(var(--chart-4))' },
]

const customerData = [
    { name: 'New Customers', value: 2850 },
    { name: 'Returning Customers', value: 6200 },
]

const chartConfig = {
  userSales: {
    label: "Your Sales",
    color: "hsl(var(--primary))",
  },
  marketAverage: {
    label: "Market Average",
    color: "hsl(var(--chart-2))",
  },
  topCompetitor: {
    label: "Top Competitor",
    color: "hsl(var(--chart-3))",
  },
   sales: {
    label: "Sales",
    color: "hsl(var(--primary))",
  },
  kurtas: { label: "Kurtas", color: "hsl(var(--chart-1))" },
  sarees: { label: "Sarees", color: "hsl(var(--chart-2))" },
  spices: { label: "Spices", color: "hsl(var(--chart-3))" },
  handicrafts: { label: "Handicrafts", color: "hsl(var(--chart-4))" },
} satisfies React.ComponentProps<typeof ChartContainer>["config"];


function AiSalesAnalyst() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [analysisResult, setAnalysisResult] = React.useState<SalesAnalyticsOutput | null>(null);

  const form = useForm<SalesAnalyticsInput>({
    resolver: zodResolver(SalesAnalyticsInputSchema),
    defaultValues: {
      productCategory: "",
      userSalesUnits: 0,
    },
  });

  async function onSubmit(values: SalesAnalyticsInput) {
    setIsLoading(true);
    setAnalysisResult(null);
    const result = await getSalesAnalyticsAction(values);
    setIsLoading(false);

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: result.error,
      });
    } else {
      setAnalysisResult(result.data!);
    }
  }

  const salesComparisonData = React.useMemo(() => {
    if (!analysisResult) return [];
    return [
      { name: "Comparison", userSales: form.getValues("userSalesUnits"), marketAverage: analysisResult.marketAverageSales, topCompetitor: analysisResult.topCompetitorSales },
    ]
  }, [analysisResult, form]);


  return (
    <Card className="lg:col-span-3">
        <CardHeader>
            <CardTitle>AI Sales Analyst</CardTitle>
            <CardDescription>Enter your sales data to get competitive insights and growth suggestions.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="productCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Category</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Cotton Kurtas" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="userSalesUnits"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Units Sold (This Month)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g., 150" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isLoading} variant="cta">
                       {isLoading && <Icons.Loader className="animate-spin" />}
                      {isLoading ? "Analyzing..." : "Get Analysis"}
                    </Button>
                  </form>
                </Form>
              </div>

              <div className="space-y-4">
                  {isLoading && (
                    <div className="space-y-4">
                      <Skeleton className="h-24 w-full" />
                      <Skeleton className="h-32 w-full" />
                      <Skeleton className="h-40 w-full" />
                    </div>
                  )}

                  {analysisResult && (
                    <div className="space-y-4">
                      <Alert>
                        <TrendingUpIcon className="h-4 w-4" />
                        <AlertTitle>Market Trend</AlertTitle>
                        <AlertDescription>
                          {analysisResult.marketTrend}
                        </AlertDescription>
                      </Alert>

                      <div>
                          <h4 className="font-semibold text-sm mb-2">Sales Comparison (Units Sold)</h4>
                           <ChartContainer config={chartConfig} className="h-[200px] w-full">
                            <BarChart data={salesComparisonData} layout="vertical" margin={{ left: 10, right: 10, top: 20}}>
                              <CartesianGrid horizontal={false} />
                              <XAxis type="number" hide />
                              <YAxis type="category" dataKey="name" hide={true}/>
                              <ChartTooltip cursor={{ fill: 'hsl(var(--accent) / 0.2)' }} content={<ChartTooltipContent />} />
                               <ChartLegend content={<ChartLegendContent />} />
                              <Bar dataKey="userSales" stackId="a" fill="var(--color-userSales)" radius={[4, 0, 0, 4]} />
                              <Bar dataKey="marketAverage" stackId="a" fill="var(--color-marketAverage)" />
                              <Bar dataKey="topCompetitor" stackId="a" fill="var(--color-topCompetitor)" radius={[0, 4, 4, 0]} />
                            </BarChart>
                          </ChartContainer>
                          <p className="text-xs text-muted-foreground mt-1 text-center">{analysisResult.salesComparisonAnalysis}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Growth Suggestions</h4>
                        <ul className="space-y-2">
                          {analysisResult.growthSuggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                   {!isLoading && !analysisResult && (
                      <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-full rounded-lg border border-dashed p-8">
                         <Icons.Sparkles className="h-10 w-10 mb-2 text-primary/50"/>
                         <p className="text-sm">Your sales analysis will appear here.</p>
                      </div>
                   )}
              </div>
           </div>
        </CardContent>
    </Card>
  )
}


export default function AnalyticsPage() {
  return (
    <div className="min-h-screen w-full bg-background">
      <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
             <Icons.Logo className="h-8 w-8 text-primary" />
             <h1 className="font-headline text-2xl font-bold text-primary">BharatAI Bazaar</h1>
          </div>
          <nav className="flex items-center gap-4">
             <Button variant="ghost" size="icon" asChild>
                <Link href="/profile"><User className="h-5 w-5" /></Link>
             </Button>
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild>
                <Link href="/seller">Dashboard</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Logout</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="mb-6">
            <h1 className="text-3xl font-bold">Seller Analytics</h1>
            <p className="text-muted-foreground">Detailed insights into your sales performance.</p>
        </div>
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AiSalesAnalyst />

          <Card>
            <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Your sales performance over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <LineChart data={salesData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `₹${Number(value) / 1000}k`} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>A breakdown of your most popular product categories.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                        <Pie data={topProductsData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80} paddingAngle={5}>
                           {topProductsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
          </Card>
          <Card>
             <CardHeader>
                <CardTitle>Customer Insights</CardTitle>
                <CardDescription>A look at your customer demographics.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-[250px]">
                <div className="text-4xl font-bold">9,050</div>
                <p className="text-muted-foreground">Total Customers</p>
                <div className="mt-4 flex gap-4 text-center">
                    <div>
                        <div className="font-bold text-lg">{customerData[0].value}</div>
                        <div className="text-xs text-muted-foreground">{customerData[0].name}</div>
                    </div>
                    <div>
                        <div className="font-bold text-lg">{customerData[1].value}</div>
                        <div className="text-xs text-muted-foreground">{customerData[1].name}</div>
                    </div>
                </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-8">
            <SellerRankList />
        </section>
      </main>
    </div>
  )
}

    
