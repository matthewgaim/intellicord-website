import { getDiscordProfileInfo } from "@/app/actions/dashboard-info";
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
import {
  User,
  Mail,
  Shield,
  Calendar,
  CheckCircle,
} from "lucide-react";

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
  if (resp.error) {
    return <h1>Error </h1>;
  }
  const userData: UserData = resp.user;
  console.log(userData);

  // Function to get avatar URL
  const getAvatarUrl = (user: UserData) => {
    if (user.avatar) {
      return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
    }
    return "";
  };

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

  // Function to get membership tier
  const getMembershipTier = (type?: number) => {
    switch (type) {
      case 1:
        return "Basic Membership";
      case 2:
        return "Premium Membership";
      case 3:
        return "Standard Membership";
      default:
        return "Free Account";
    }
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl">
        <Card className="shadow-md bg-white">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border border-gray-200">
                  <AvatarImage
                    src={getAvatarUrl(userData)}
                    alt={userData.username}
                  />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-semibold">
                    {getUserInitials(userData)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                    {userData.global_name || userData.username}
                    {userData.verified && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    @{userData.username}
                  </CardDescription>

                  <div className="mt-2 flex gap-2">
                    {userData.premium_type ? (
                      <Badge className="bg-blue-500 hover:bg-blue-600">
                        {getMembershipTier(userData.premium_type)}
                      </Badge>
                    ) : null}

                    {userData.bot && (
                      <Badge
                        variant="outline"
                        className="border-gray-300 text-gray-600"
                      >
                        API Access
                      </Badge>
                    )}

                    {userData.mfa_enabled && (
                      <Badge
                        variant="outline"
                        className="border-green-300 text-green-600"
                      >
                        2FA Enabled
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
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
                  {userData.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Email
                        </p>
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
                        Account ID
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

export const runtime = "edge";
