import {
  getDBUserInfo,
  getDiscordProfileInfo,
} from "@/app/actions/dashboard-info";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Shield, Calendar, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface UserData {
  id: string;
  username: string;
  discriminator: string;
  global_name?: string;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string;
  accent_color?: number;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
}

export default async function ProfilePage() {
  const resp = await getDiscordProfileInfo();
  const db_resp = await getDBUserInfo();
  if (resp.error || db_resp.error) {
    return <h1>Error </h1>;
  }
  const userData: UserData = resp.user;
  const dbUserInfo = db_resp.user;

  const getAvatarUrl = (user: UserData) => {
    if (user.avatar) {
      const isAnimated = user.avatar?.startsWith("a_");
      const extension = isAnimated ? "gif" : "png";
      return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${extension}`;
    }
    return "";
  };

  const getBannerUrl = (user: UserData) => {
    if (user.banner) {
      const isAnimated = user.banner?.startsWith("a_");
      const extension = isAnimated ? "gif" : "png";
      return `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.${extension}?size=1024`
    }
    return null
  }

  // Function to get user's initials for avatar fallback
  const getUserInitials = (user: UserData) => {
    if (user.global_name) {
      return user.global_name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    }
    return user.username.substring(0, 2).toUpperCase();
  };
  const isPremium = dbUserInfo?.plan !== "free";
  const bannerUrl = getBannerUrl(userData);
  const bannerStyle = bannerUrl
    ? { backgroundImage: `url(${bannerUrl})` }
    : userData.accent_color
      ? { backgroundColor: `#${userData.accent_color.toString(16)}` }
      : { backgroundColor: "#5865F2" } // Discord default blue as fallback

  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl">
        <Card className="shadow-md bg-white overflow-hidden">
          <div className="h-32 w-full bg-cover bg-center" style={bannerStyle} />
          <CardHeader className="pb-2 relative">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-4 border-white shadow-md absolute -top-10">
                  <AvatarImage src={getAvatarUrl(userData)} alt={userData.username} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-semibold">
                    {getUserInitials(userData)}
                  </AvatarFallback>
                </Avatar>

                <div className="mt-10">
                  <CardTitle className="text-xl text-gray-800">{userData.global_name || userData.username}</CardTitle>
                  <CardDescription className="text-gray-500">@{userData.username}</CardDescription>
                </div>
              </div>

              <UpgradeButton variant={isPremium ? "outline" : "premium"} />
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <Separator className="my-4" />

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-800 mb-4">
                  Account Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Gem className={cn("h-5 w-5", dbUserInfo?.plan === 'free' ? ' text-gray-400' : 'text-purple-700')}/>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Account Type
                      </p>
                      <p className="text-sm capitalize text-gray-500">
                        {dbUserInfo?.plan}
                      </p>
                    </div>
                  </div>

                  {userData.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">
                          Email
                          {userData.verified && (
                            <Badge
                              variant="outline"
                              className="ml-2 border-green-300 text-green-600"
                            >
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {userData.email}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Discord Account ID
                      </p>
                      <p className="text-sm text-gray-500">{userData.id}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-4">
                  Security & Preferences
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Two-Factor Authentication
                      </p>
                      <p className="text-sm text-gray-500">
                        {userData.mfa_enabled ? "Enabled" : "Disabled"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Preferred Language
                      </p>
                      <p className="text-sm text-gray-500">
                        {userData.locale || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface UpgradeButtonProps {
  variant?: "default" | "premium" | "outline";
  size?: "sm" | "default" | "lg";
}
function UpgradeButton({
  variant = "premium",
  size = "default",
}: UpgradeButtonProps) {
  return (
    <Button
      variant={variant === "premium" ? "default" : variant}
      className={cn(
        "font-medium relative overflow-hidden",
        variant === "premium" && 
          "text-white inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#771a98,45%,#d2cece,55%,#771a98)] bg-[length:200%_100%] px-6 font-medium  transition-colors"
      )}
      size={size}
      asChild
    >
      <Link href="/dashboard/pricing">
        <Gem className="mr-2 h-4 w-4" />
        Upgrade Profile
      </Link>
    </Button>
  );
}

export const runtime = "edge";
