
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";


export default function CalculatorPage() {
  const [productName, setProductName] = useState("")
  const [wholesalePrice, setWholesalePrice] = useState("")
  const [retailPrice, setRetailPrice] = useState("")
  const [wholesaleSource, setWholesaleSource] = useState("Local Market")
  const [onlineRetailer, setOnlineRetailer] = useState("Amazon")

  const [commission, setCommission] = useState("")
  const [fixedPlatformFee, setFixedPlatformFee] = useState("")
  const [shippingCost, setShippingCost] = useState("")
  const [packagingCost, setPackagingCost] = useState("")
  const [tax, setTax] = useState("")

  const [showAdvanced, setShowAdvanced] = useState(false)
  const [discount, setDiscount] = useState("")
  const [returnRate, setReturnRate] = useState("")
  const [fixedCost, setFixedCost] = useState("")

  const [result, setResult] = useState<null | {
    profit: number
    margin: number
    breakdown: {
      wholesale: number
      fee: number
      shipping: number
      packaging: number
      tax: number
      discount: number
      returnLoss: number
      fixedCost: number
      totalCost: number
    }
  }>(null)

  const handleCalculate = () => {
    const wp = parseFloat(wholesalePrice) || 0
    const rp = parseFloat(retailPrice) || 0

    if (rp <= 0) {
      setResult(null);
      return;
    }
    
    const commissionAmount = (rp * (parseFloat(commission) || 0)) / 100
    const fixedFeeAmount = parseFloat(fixedPlatformFee) || 0
    const fee = commissionAmount + fixedFeeAmount

    const shipping = parseFloat(shippingCost) || 0
    const pack = parseFloat(packagingCost) || 0
    const gst = (rp * (parseFloat(tax) || 0)) / 100
    
    const disc = ((parseFloat(discount) || 0) / 100) * rp
    const ret = ((parseFloat(returnRate) || 0) / 100) * rp
    const fixed = parseFloat(fixedCost) || 0

    const totalCost = wp + fee + shipping + pack + gst + disc + ret + fixed
    const profit = rp - totalCost
    const margin = (profit / rp) * 100

    setResult({
      profit,
      margin,
      breakdown: { wholesale: wp, fee, shipping, packaging: pack, tax: gst, discount: disc, returnLoss: ret, fixedCost: fixed, totalCost }
    })
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
                    <ThemeToggle />
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/seller">Back to Dashboard</Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/login">Logout</Link>
                    </Button>
                </div>
            </div>
        </header>
      <main className="container mx-auto flex-1 p-4 md:p-6 flex items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Advanced Profit Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="Product Name"
                value={productName}
                onChange={e => setProductName(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Wholesale Price (₹)"
                  type="number"
                  min="0"
                  value={wholesalePrice}
                  onChange={e => setWholesalePrice(e.target.value)}
                />
                <Input
                  placeholder="Online Retail Price (₹)"
                  type="number"
                  min="0"
                  value={retailPrice}
                  onChange={e => setRetailPrice(e.target.value)}
                />
              </div>
               <div className="grid grid-cols-2 gap-4">
                 <Select value={wholesaleSource} onValueChange={setWholesaleSource}>
                    <SelectTrigger>
                        <SelectValue placeholder="Wholesale Source" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Local Market">Local Market</SelectItem>
                        <SelectItem value="Wholesale Distributor">Wholesale Distributor</SelectItem>
                        <SelectItem value="Direct from Manufacturer">Direct from Manufacturer</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                 </Select>
                 <Select value={onlineRetailer} onValueChange={setOnlineRetailer}>
                    <SelectTrigger>
                        <SelectValue placeholder="Online Retailer" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Amazon">Amazon</SelectItem>
                        <SelectItem value="Flipkart">Flipkart</SelectItem>
                        <SelectItem value="Meesho">Meesho</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                 </Select>
              </div>
              
              <Separator className="my-4" />
              
              <h3 className="text-sm font-medium text-muted-foreground">Standard Costs</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input
                    placeholder="Commission (%)"
                    type="number"
                    min="0"
                    value={commission}
                    onChange={e => setCommission(e.target.value)}
                    />
                 <Input
                    placeholder="Fixed Fee (₹)"
                    type="number"
                    min="0"
                    value={fixedPlatformFee}
                    onChange={e => setFixedPlatformFee(e.target.value)}
                    />
                <Input
                    placeholder="Shipping Cost (₹)"
                    type="number"
                    min="0"
                    value={shippingCost}
                    onChange={e => setShippingCost(e.target.value)}
                    />
                <Input
                    placeholder="Packaging Cost (₹)"
                    type="number"
                    min="0"
                    value={packagingCost}
                    onChange={e => setPackagingCost(e.target.value)}
                    />
                <Input
                    placeholder="Tax / GST (%)"
                    type="number"
                    min="0"
                    value={tax}
                    onChange={e => setTax(e.target.value)}
                    />
              </div>

               <Button variant="link" className="p-0 h-auto" onClick={() => setShowAdvanced(!showAdvanced)}>
                 {showAdvanced ? "Hide Advanced Options" : "Show Advanced Options"}
               </Button>
              
               {showAdvanced && (
                <div className="space-y-4 rounded-md border bg-muted/50 p-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Advanced Costs</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="Discount (% of retail)" type="number" min="0" value={discount} onChange={e => setDiscount(e.target.value)} />
                        <Input placeholder="Return Rate (% of retail)" type="number" min="0" value={returnRate} onChange={e => setReturnRate(e.target.value)} />
                    </div>
                    <Input placeholder="Fixed Cost Allocation (₹ per unit)" min="0" type="number" value={fixedCost} onChange={e => setFixedCost(e.target.value)} />
                </div>
               )}


              <Button
                className="w-full"
                onClick={handleCalculate}
                variant="cta"
              >
                <Icons.Calculator className="mr-2"/>
                Analyze Profit
              </Button>
            </div>

            {result && (
              <div className={cn("mt-6 p-4 rounded-lg border bg-background transition-shadow duration-300 hover:shadow-lg hover:hover-glow")}>
                <h3 className="font-semibold mb-2 text-lg">Profitability Analysis</h3>
                <div className="space-y-2 text-sm">
                    <p><strong>Product:</strong> {productName || "N/A"}</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <p><strong>Retail Price:</strong> ₹{parseFloat(retailPrice).toFixed(2)}</p>
                        <p><strong>Total Cost:</strong> <span className="text-destructive">₹{result.breakdown.totalCost.toFixed(2)}</span></p>
                        <p><strong>Profit Amount:</strong> <span className={result.profit > 0 ? 'text-green-600' : 'text-destructive'}>₹{result.profit.toFixed(2)}</span></p>
                        <p><strong>Profit Margin:</strong> <span className={result.margin > 0 ? 'text-green-600' : 'text-destructive'}>{result.margin.toFixed(2)}%</span></p>
                    </div>

                    <Separator className="my-3"/>
                    
                    <h4 className="font-semibold">Cost Breakdown:</h4>
                    <ul className="text-xs space-y-1 text-muted-foreground list-disc list-inside">
                        <li>Wholesale: ₹{result.breakdown.wholesale.toFixed(2)}</li>
                        <li>Platform Fee: ₹{result.breakdown.fee.toFixed(2)}</li>
                        <li>Shipping: ₹{result.breakdown.shipping.toFixed(2)}</li>
                        <li>Packaging: ₹{result.breakdown.packaging.toFixed(2)}</li>
                        <li>Tax / GST: ₹{result.breakdown.tax.toFixed(2)}</li>
                         {showAdvanced && (
                          <>
                            <li>Discount Loss: ₹{result.breakdown.discount.toFixed(2)}</li>
                            <li>Return Loss: ₹{result.breakdown.returnLoss.toFixed(2)}</li>
                            <li>Fixed Cost Allocation: ₹{result.breakdown.fixedCost.toFixed(2)}</li>
                          </>
                        )}
                    </ul>
                    
                    <p className="text-xs text-muted-foreground pt-2">
                        Source: {wholesaleSource || "N/A"} → Retailer: {onlineRetailer || "N/A"}
                    </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

    
