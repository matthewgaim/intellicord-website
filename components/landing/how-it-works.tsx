"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, LogIn, Server, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import IntellicordLogoWhiteBG from "@/public/intellicord_whitebg_logo.png";
import MatthewProfilePic from "@/public/matthew_profilepic.webp";

export default function HowItWorks() {
  return (
    <div className="mx-auto px-4">
      {/* Desktop version with connection line */}
      <div className="hidden md:block relative max-w-4xl mx-auto">
        {/* Center connection line */}
        <div className="absolute left-1/2 top-10 bottom-10 w-1 bg-primary -translate-x-1/2 z-0"></div>

        {/* Step 1 - Left*/}
        <div className="flex items-center mb-16 relative z-10">
          <div className="w-1/2 pr-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Invite Intellicord to Your Server
                  </h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <ul className="space-y-4 text-black">
                    <li className="flex items-center gap-3">
                      <LogIn className="w-5 h-5 text-gray-700" />
                      <span>Sign in using your Discord account.</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Server className="w-5 h-5 text-gray-700" />
                      <span>
                        Go to the{" "}
                        <Link
                          className="font-bold text-purple-500"
                          href="/dashboard/servers"
                        >
                          Servers
                        </Link>{" "}
                        tab and invite the bot to your server.
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Settings className="w-5 h-5 text-gray-700" />
                      <span>
                        Choose which channels users can access Intellicord in,
                        with the <strong>Manage</strong> button.
                      </span>
                    </li>
                  </ul>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold">
            1
          </div>
          <div className="w-1/2"></div>
        </div>

        {/* Step 2 - Right */}
        <div className="flex items-center mb-16 relative z-10">
          <div className="w-1/2"></div>
          <div className="absolute left-1/2 -translate-x-1/2 bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold">
            2
          </div>
          <div className="w-1/2 pl-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Upload Files on Your Server
                  </h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {/** Discord example */}
                  <div className="bg-[#424549] p-4 rounded-lg border border-gray-200 shadow-lg relative">
                    <div className="rounded-lg p-4 text-white">
                      <div className="font-mono text-sm font-semibold text-white mb-2 flex items-center gap-2">
                        <Image
                          src={MatthewProfilePic}
                          alt="User Avatar"
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        User
                      </div>
                      <div className="items-center gap-2 bg-[#282b30] rounded-sm p-4">
                        <div className="flex">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span>&nbsp;quarterly_report.pdf</span>
                        </div>
                        <span className="text-xs">120kB</span>
                      </div>
                      <div className="mt-4 font-mono text-sm font-semibold text-white mb-2 flex items-center gap-2">
                        <Image
                          src={IntellicordLogoWhiteBG}
                          alt="Intellicord Avatar"
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        Intellicord
                      </div>
                      <div className="text-white">
                        File uploaded and processed successfully!
                      </div>
                    </div>
                  </div>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Step 3 - Left */}
        <div className="flex items-center mb-16 relative z-10">
          <div className="w-1/2 pr-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Ask Questions
                  </h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <p className="text-gray-600 md:ml-auto md:max-w-md pb-4">
                    Intellicord uses your files and thread messages to generate
                    AI-powered responses.
                  </p>
                  {/** Discord example */}
                  <div className="bg-[#424549] p-4 rounded-lg border border-gray-200 shadow-lg relative">
                    <div className="rounded-lg p-4 text-white">
                      <div className="font-mono text-sm font-semibold text-white mb-2 flex items-center gap-2">
                        <Image
                          src={MatthewProfilePic}
                          alt="User Avatar"
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        User
                      </div>
                      <div className="text-white">
                        What were the key findings in the Q3 section?
                      </div>
                      <div className="mt-4 font-mono text-sm font-semibold text-white mb-2 flex items-center gap-2">
                        <Image
                          src={IntellicordLogoWhiteBG}
                          alt="Intellicord Avatar"
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        Intellicord
                      </div>
                      <div className="text-white">
                        <div>
                          <p>
                            Based on the Q3 section of the report, the key
                            findings are:
                          </p>
                          <ul className="mt-2 space-y-1 list-disc list-inside">
                            <li>Market share increased by 3.5%</li>
                            <li>Exceeded expectations by 28%</li>
                            <li>Customer retention improved to 94%</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold">
            3
          </div>
          <div className="w-1/2"></div>
        </div>
      </div>

      {/* Mobile version without connection line */}
      <MobileHowItWorks />
    </div>
  );
}

function MobileHowItWorks() {
  return (
    <div className="md:hidden space-y-6 max-w-md mx-auto">
      {/* Step 1 */}
      <div className="relative">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <CardTitle className="flex items-center gap-2">
                Invite Intellicord to Your Server
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <ul className="space-y-4 text-black">
                <li className="flex items-center gap-3">
                  <LogIn className="w-5 h-5 text-gray-700" />
                  <span>Sign in using your Discord account.</span>
                </li>
                <li className="flex items-center gap-3">
                  <Server className="w-5 h-5 text-gray-700" />
                  <span>
                    Go to the{" "}
                    <Link
                      className="font-bold text-purple-500"
                      href="/dashboard/servers"
                    >
                      Servers
                    </Link>{" "}
                    tab and invite the bot to your server.
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gray-700" />
                  <span>
                    Choose which channels users can access Intellicord in, with
                    the <strong>Manage</strong> button.
                  </span>
                </li>
              </ul>
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Step 2 */}
      <div className="relative">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <CardTitle className="flex items-center gap-2">
                Upload Files On Your Server
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <div className="bg-[#424549] p-4 rounded-lg border border-gray-200 shadow-lg relative">
                <div className="rounded-lg p-4 text-white">
                  <div className="font-mono text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Image
                      src={MatthewProfilePic}
                      alt="User Avatar"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    User
                  </div>
                  <div className="items-center gap-2 bg-[#282b30] rounded-sm p-4">
                    <div className="flex">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span>&nbsp;quarterly_report.pdf</span>
                    </div>
                    <span className="text-xs">120kB</span>
                  </div>
                  <div className="mt-4 font-mono text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Image
                      src={IntellicordLogoWhiteBG}
                      alt="Intellicord Avatar"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    Intellicord
                  </div>
                  <div className="text-white">
                    File uploaded and processed successfully!
                  </div>
                </div>
              </div>
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Step 3 */}
      <div>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <CardTitle className="flex items-center gap-2">
                Ask Questions
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <p className="text-gray-600 md:ml-auto md:max-w-md pb-4">
                Intellicord uses your files and thread messages to generate
                AI-powered responses.
              </p>
              {/** Discord example */}
              <div className="bg-[#424549] p-4 rounded-lg border border-gray-200 shadow-lg relative">
                <div className="rounded-lg p-4 text-white">
                  <div className="font-mono text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Image
                      src={MatthewProfilePic}
                      alt="User Avatar"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    User
                  </div>
                  <div className="text-white">
                    What were the key findings in the Q3 section?
                  </div>
                  <div className="mt-4 font-mono text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Image
                      src={IntellicordLogoWhiteBG}
                      alt="Intellicord Avatar"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    Intellicord
                  </div>
                  <div className="text-white">
                    <div>
                      <p>
                        Based on the Q3 section of the report, the key findings
                        are:
                      </p>
                      <ul className="mt-2 space-y-1 list-disc list-inside">
                        <li>Market share increased by 3.5%</li>
                        <li>Exceeded expectations by 28%</li>
                        <li>Customer retention improved to 94%</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
