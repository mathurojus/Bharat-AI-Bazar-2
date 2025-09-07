
"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { User, ChevronLeft, ShoppingBag, Bell, Shield, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


const user = {
    name: "Ravi Kumar",
    email: "ravi.kumar@example.com",
    avatar: "https://placehold.co/100x100/EBF5FF/3B82F6?text=RK",
    aiHint: "man portrait"
};

const orders = [
    { orderId: "#B0756D", date: "2023-10-26", total: "₹1,850.00", status: "Delivered", items: 3 },
    { orderId: "#A0645C", date: "2023-09-15", total: "₹780.00", status: "Delivered", items: 2 },
    { orderId: "#C0891B", date: "2023-08-02", total: "₹3,210.00", status: "Cancelled", items: 5 },
    { orderId: "#D0234A", date: "2023-07-11", total: "₹450.00", status: "Delivered", items: 1 },
];

const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
        case 'delivered':
            return 'default';
        case 'cancelled':
            return 'destructive';
        case 'processing':
            return 'secondary';
        default:
            return 'outline';
    }
};

export default function ProfilePage() {
    return (
        <div className="min-h-screen w-full bg-background">
            <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-2">
                         <Button variant="ghost" size="icon" asChild>
                            <Link href="/buyer">
                               <ChevronLeft className="h-5 w-5" />
                               <span className="sr-only">Back</span>
                            </Link>
                        </Button>
                        <h1 className="font-headline text-2xl font-bold text-primary">My Profile</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/login">Logout</Link>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto p-4 md:p-6">
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-1">
                        <Card>
                             <CardHeader className="items-center text-center">
                                 <Avatar className="h-24 w-24 mb-4">
                                     <AvatarImage src={user.avatar} alt={user.name} data-ai-hint={user.aiHint} />
                                     <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                 </Avatar>
                                 <CardTitle>{user.name}</CardTitle>
                                 <CardDescription>{user.email}</CardDescription>
                             </CardHeader>
                             <CardContent className="space-y-2">
                                <Separator />
                                <Button variant="ghost" className="w-full justify-start gap-2">
                                    <ShoppingBag className="h-4 w-4" /> My Orders
                                </Button>
                                <Button variant="ghost" className="w-full justify-start gap-2">
                                    <Bell className="h-4 w-4" /> Notifications
                                </Button>
                                <Button variant="ghost" className="w-full justify-start gap-2">
                                    <Shield className="h-4 w-4" /> Account Security
                                </Button>
                                 <Button variant="ghost" className="w-full justify-start gap-2 text-destructive hover:text-destructive">
                                    <LogOut className="h-4 w-4" /> Logout
                                </Button>
                             </CardContent>
                        </Card>
                    </div>
                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Order History</CardTitle>
                                <CardDescription>View and track your past orders.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Order ID</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Items</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Total</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {orders.map((order) => (
                                            <TableRow key={order.orderId}>
                                                <TableCell className="font-medium">{order.orderId}</TableCell>
                                                <TableCell>{order.date}</TableCell>
                                                <TableCell>{order.items}</TableCell>
                                                <TableCell>
                                                    <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                                                </TableCell>
                                                <TableCell className="text-right">{order.total}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
