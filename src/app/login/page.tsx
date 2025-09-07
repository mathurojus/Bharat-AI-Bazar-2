
"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  
  const initialRole = searchParams.get("role") || "buyer";
  const [role, setRole] = React.useState(initialRole);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    setIsLoading(true);
    // Mock authentication
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful",
        description: `Redirecting to ${role} dashboard...`,
      });
      if (role === 'buyer') {
        router.push("/buyer");
      } else {
        router.push("/seller");
      }
    }, 1000);
  };
  
  const cardClassName = "bg-card/60 backdrop-blur-lg border-white/20";

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background p-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/50 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/50 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <Tabs value={role} onValueChange={setRole} className="w-full max-w-md z-10">
        <TabsList className="grid w-full grid-cols-2 bg-card/60 backdrop-blur-lg border-white/20">
          <TabsTrigger value="buyer">Buyer</TabsTrigger>
          <TabsTrigger value="seller">Seller</TabsTrigger>
        </TabsList>
        <TabsContent value="buyer">
          <Card className={cardClassName}>
            <CardHeader>
              <CardTitle>Buyer Login</CardTitle>
              <CardDescription>
                Access your dashboard to compare prices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-buyer">Email</Label>
                  <Input id="email-buyer" type="email" placeholder="buyer@example.com" {...register("email")} className="bg-transparent"/>
                  {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-buyer">Password</Label>
                  <Input id="password-buyer" type="password" {...register("password")} className="bg-transparent"/>
                   {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Icons.Loader className="animate-spin" />}
                  Login as Buyer
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="seller">
           <Card className={cardClassName}>
            <CardHeader>
              <CardTitle>Seller Login</CardTitle>
              <CardDescription>
                Access your dashboard to view sales analytics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-seller">Email</Label>
                  <Input id="email-seller" type="email" placeholder="seller@example.com" {...register("email")} className="bg-transparent"/>
                   {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-seller">Password</Label>
                  <Input id="password-seller" type="password" {...register("password")} className="bg-transparent"/>
                  {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Icons.Loader className="animate-spin" />}
                  Login as Seller
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
