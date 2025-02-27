"use client"
import Link from "next/link"
import { ArrowRight, Brain, FileText, Share2, Menu } from "lucide-react"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ReactNode } from "react"
import Image from "next/image"
import IntellicordLogo from "@/public/intellicord_logo.png"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image
              src={IntellicordLogo}
              alt="Intellicord Logo"
              className="w-8 h-8 text-primary"/>
            <span className="text-2xl font-bold">Intellicord</span>
          </div>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Dashboard</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#features" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Features</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#how-it-works" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>How It Works</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Intellicord</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-4">
                <Link href="/dashboard" className="text-lg font-medium">
                  Dashboard
                </Link>
                <Link href="#features" className="text-lg font-medium">
                  Features
                </Link>
                <Link href="#how-it-works" className="text-lg font-medium">
                  How It Works
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-5xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Unlock the Power of Your Discord Data
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Intellicord analyzes files uploaded to your server, providing instant insights and fostering meaningful
              discussions about your data.
            </p>
            <Button asChild size="lg">
              <Link href="/api/auth/login">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </section>

        <section id="features" className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FileText className="w-10 h-10 text-primary" />}
              title="Smart File Analysis"
              description="Instantly analyze various file types uploaded to your Discord server."
            />
            <FeatureCard
              icon={<Brain className="w-10 h-10 text-secondary" />}
              title="AI-Powered Insights"
              description="Get intelligent insights and summaries from your data using advanced AI."
            />
            <FeatureCard
              icon={<Share2 className="w-10 h-10 text-primary" />}
              title="Collaborative Understanding"
              description="Foster discussions and shared understanding of complex data within your community."
            />
          </div>
        </section>

        <section id="how-it-works" className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>1. Upload Your File</AccordionTrigger>
                  <AccordionContent>
                    Simply upload any supported file type to your Discord server. Intellicord will automatically detect
                    and process the file.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>2. AI Analysis</AccordionTrigger>
                  <AccordionContent>
                    Intellicord&apos;s advanced AI quickly analyzes the file, extracting key information and generating
                    valuable insights.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>3. Receive Insights</AccordionTrigger>
                  <AccordionContent>
                    Get a comprehensive summary and analysis directly in your Discord channel, presented in an
                    easy-to-understand format.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>4. Discuss and Collaborate</AccordionTrigger>
                  <AccordionContent>
                    Use the AI-generated insights to spark meaningful discussions and collaborate effectively with your
                    team or community.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="relative h-[400px] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg overflow-hidden">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Brain className="w-32 h-32 text-primary" />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Senarado Solutions LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: {icon: ReactNode, title: string, description: string}) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  )
}

