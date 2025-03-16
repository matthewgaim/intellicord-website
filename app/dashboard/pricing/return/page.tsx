"use client";
import { getSessionStatus } from "@/app/actions/pricing";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

export default function Return() {
  const [status, setStatus] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getSesh = async () => {
      const sessionId = searchParams.get("session_id");
      const data = await getSessionStatus(sessionId);
      setStatus(data.status);
      setCustomerName(data.name);
      setCustomerEmail(data.email);
    };
    getSesh();
  }, [searchParams]);

  if (status === "open") {
    return router.replace("/dashboard/pricing");
  }

  if (status === "complete") {
    const currentDate = new Date().toLocaleDateString();
    return (
      <section id="success">
        <div className="flex justify-center items-center min-h-[500px] p-4">
          <Card className="w-full max-w-md border-0 shadow-lg">
            <CardHeader className="flex flex-col items-center space-y-2 pb-2">
              <div className="rounded-full bg-green-100 p-3 mb-2">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-center">
                Thank You for Your Business!
              </h1>
              <p className="text-muted-foreground text-center">
                Your payment was processed successfully
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted p-6 space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-medium">{customerName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{customerEmail}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{currentDate}</p>
                </div>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>A confirmation has been sent to your email address from Senarado Solutions LLC.</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button asChild className="w-full">
                <Link href="/dashboard/profile">Return to Profile</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    );
  }

  return null;
}

export const runtime = 'edge';