
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";

const sellers = [
  { rank: 1, name: "Mystic Weaves", revenue: "₹8,42,500", change: "+15.8%", avatar: "https://placehold.co/100x100/EBF5FF/3B82F6?text=MW" },
  { rank: 2, name: "Spice Route Goods", revenue: "₹7,98,200", change: "+12.2%", avatar: "https://placehold.co/100x100/EBF5FF/3B82F6?text=SR" },
  { rank: 3, name: "Jaipur Jewels Co.", revenue: "₹7,51,800", change: "+9.5%", avatar: "https://placehold.co/100x100/EBF5FF/3B82F6?text=JJ" },
  { rank: 4, name: "Himalayan Organics", revenue: "₹6,95,400", change: "+8.1%", avatar: "https://placehold.co/100x100/EBF5FF/3B82F6?text=HO" },
  { rank: 5, name: "Urban Dhaage", revenue: "₹6,50,100", change: "+5.7%", avatar: "https://placehold.co/100x100/EBF5FF/3B82F6?text=UD" },
  { rank: 6, name: "Your Store", revenue: "₹4,52,318", change: "+20.1%", avatar: "https://placehold.co/100x100/EBF5FF/3B82F6?text=YS", isCurrentUser: true },

];

const RankBadge = ({ rank }: { rank: number }) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-400" />;
    if (rank === 2) return <Crown className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Crown className="h-5 w-5 text-amber-600" />;
    return <span className="font-bold text-lg">{rank}</span>
}

export function SellerRankList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Sellers Leaderboard</CardTitle>
        <CardDescription>See how your sales compare to the top performers in the marketplace.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rank</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead className="text-right">Revenue (Monthly)</TableHead>
              <TableHead className="text-right">Growth</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sellers.map((seller) => (
              <TableRow key={seller.rank} className={seller.isCurrentUser ? "bg-primary/10" : ""}>
                <TableCell>
                  <div className="flex items-center justify-center h-full">
                    <RankBadge rank={seller.rank}/>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={seller.avatar} alt={seller.name} data-ai-hint="logo initial" />
                      <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{seller.name}</p>
                       {seller.isCurrentUser && <Badge variant="outline" className="text-primary border-primary">Your Store</Badge>}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono">{seller.revenue}</TableCell>
                <TableCell className="text-right">
                  <span className="text-green-600 font-semibold">{seller.change}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

    