"use client";
import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StripeCheckoutPopup from "./stripe-checkout";
import { useState } from "react";
export default function PricingPage() {
  const [priceId, setPriceId] = useState("");
  return priceId ? (
    <StripeCheckoutPopup price_id={priceId} />
  ) : (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan for your Discord community. Upgrade or
          downgrade anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Free Plan */}
        <Card className="flex flex-col border-2">
          <CardHeader className="flex flex-col space-y-1.5">
            <CardTitle className="text-2xl">Free</CardTitle>
            <CardDescription>Get started with basic features</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-muted-foreground ml-1">/month</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>10 files to analyze</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>100 AI responses</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Basic file types support</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Community support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/signup">Get Started</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Basic Plan */}
        <Card className="flex flex-col border-2 border-primary relative">
          <div className="absolute top-0 right-0 left-0 bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
            Most Popular
          </div>
          <CardHeader className="flex flex-col space-y-1.5 pt-8">
            <CardTitle className="text-2xl">Basic</CardTitle>
            <CardDescription>Perfect for growing communities</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$9.99</span>
              <span className="text-muted-foreground ml-1">/month</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>
                  <strong>50 files</strong> to analyze
                </span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>
                  <strong>500 AI responses</strong>
                </span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Advanced file types support</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Priority support</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Custom thread templates</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => setPriceId("price_1R1L3zGd3jbYC6UDzv5EZuAy")}
              className="w-full"
            >
              Choose Basic
            </Button>
          </CardFooter>
        </Card>

        {/* Ultimate Plan */}
        <Card className="flex flex-col border-2">
          <CardHeader className="flex flex-col space-y-1.5">
            <CardTitle className="text-2xl">Premium</CardTitle>
            <CardDescription>For active Discord communities</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$29.99</span>
              <span className="text-muted-foreground ml-1">/month</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>
                  <strong>500 files</strong> to analyze
                </span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>
                  <strong>5,000 AI responses</strong>
                </span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>All file types supported</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Dedicated support</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Custom AI fine-tuning</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => setPriceId("price_1R1L45Gd3jbYC6UDgjqdoGI1")}
            >
              Choose Ultimate
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Need a custom plan?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          For larger Discord communities or specialized use cases, we offer
          custom plans tailored to your needs.
        </p>
        <Button asChild variant="outline" size="lg">
          <Link href="/contact">Contact Sales</Link>
        </Button>
      </div>
    </div>
  );
}

export const runtime = 'edge';