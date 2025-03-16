"use client";
import { getStripePortalLink } from "@/app/actions/dashboard-info";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Gem } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface UpgradeButtonProps {
  variant?: "default" | "premium" | "outline";
  size?: "sm" | "default" | "lg";
}

function UpgradeProfileButton({ size }: { size?: "sm" | "default" | "lg" }) {
  return (
    <Button
      variant="default"
      className={cn(
        "text-white inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800",
        "bg-[linear-gradient(110deg,#771a98,45%,#d2cece,55%,#771a98)] bg-[length:200%_100%] px-6 font-medium transition-colors"
      )}
      size={size}
    >
      <Link href="/dashboard/pricing" className="flex items-center">
        <Gem className="mr-2 h-4 w-4" />
        Upgrade Profile
      </Link>
    </Button>
  );
}

function ManageSubscriptionButton({ size }: { size?: "sm" | "default" | "lg" }) {
  const sendUserToPortal = async () => {
    const { url } = await getStripePortalLink();
    if (url) {
      redirect(url);
    }
  };
  return (
    <Button variant="outline" size={size} onClick={sendUserToPortal}>
      <Gem className="mr-2 h-4 w-4" />
      Manage Subscription
    </Button>
  );
}

export function UpgradeButton({
  variant = "premium",
  size = "default",
}: UpgradeButtonProps) {
  return variant === "premium" ? (
    <UpgradeProfileButton size={size} />
  ) : (
    <ManageSubscriptionButton size={size} />
  );
}

export const runtime = "edge";
