"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import IntellicordLogo from "@/public/intellicord_logo.png";
import { Button } from "@/components/ui/button";

export default function LandingHeader({token, authLink}: {token?: string, authLink: string}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
        className={`fixed top-0 z-40 w-full px-4 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-gray-200"
            : "bg-transparent"
        }`}
      >
        <div className="flex h-16 items-center justify-between">
          <div className="flex gap-2 items-center">
            <Image
              src={IntellicordLogo}
              width={32}
              height={32}
              alt="Intellicord Logo"
            />
            <span className="text-xl font-bold text-gray-900">Intellicord</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="#features"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
            >
              How It Works
            </Link>
            <Link
              href="#community"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
            >
              Community
            </Link>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white border-0"
              asChild
            >
              <Link href={token ? "/dashboard" : authLink}>{token ? "Dashboard" : "Login"}</Link>
            </Button>
          </div>
        </div>
      </header>
  );
}
