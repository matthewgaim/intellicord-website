import LandingHeader from "@/components/landing/header";
import HowItWorks from "@/components/landing/how-it-works";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, Upload, ChevronRight } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { getAuthLink } from "@/app/actions/landing";
export default async function LandingPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const authLink = await getAuthLink();

  return (
    <div className="flex min-h-[100dvh] flex-col from-white to-purple-50 bg-gradient-to-b">
      <LandingHeader token={token} authLink={authLink} />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="relative px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-10">
              <div className="space-y-6 max-w-3xl">
                <div className="inline-flex items-center rounded-full border border-gray-700 bg-[#1A1D24] px-3 py-1 text-sm text-gray-300">
                  <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                  Now available for all Discord servers
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-gray-900">
                  Your Discord Server, <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                    Boosted with AI
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Upload, analyze, and discuss without leaving Discord.
                  Intellicord brings AI-powered file analysis straight to your
                  server.
                </p>
                <Button
                  size="lg"
                  className="md:hidden bg-blue-600 hover:bg-blue-700 text-white border-0 h-12 px-8"
                  asChild
                >
                  <Link href={token ? "/dashboard" : authLink}>{token ? "Dashboard" : "Add to your Server"}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0"></div>
          <div className="relative px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 mb-4">
                What can it do?
              </h2>
              <p className="max-w-[700px] mx-auto text-gray-600 md:text-lg">
                Intellicord brings the power of AI to your Discord server with
                these key features
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="relative group">
                <div className="relative bg-white p-6 rounded-lg border border-gray-200 h-full">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                    <Upload className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    File Upload & Context
                  </h3>
                  <p className="text-gray-600">
                    Upload PDFs, docs, or spreadsheets to your Discord server
                    and Intellicord will analyze them to provide context-aware
                    responses.
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center text-sm text-purple-600">
                      <span>Supports multiple file formats</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="relative group">
                <div className="relative bg-white p-6 rounded-lg border border-gray-200 h-full">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Thread-Based Responses
                  </h3>
                  <p className="text-gray-600">
                    Get AI-powered replies in threads based on the context of
                    your uploaded files and previous messages in the
                    conversation.
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center text-sm text-blue-600">
                      <span>Maintains conversation context</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="relative group">
                <div className="relative bg-white p-6 rounded-lg border border-gray-200 h-full">
                  <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-cyan-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No-Context LLM Chat
                  </h3>
                  <p className="text-gray-600">
                    If you need a quick answer for a question with no previous
                    context, you can just type <code>/ask</code>
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center text-sm text-cyan-600">
                      <span>Instant AI assistance</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 relative overflow-hidden">
          <div className="relative px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="max-w-[700px] mx-auto text-gray-600 md:text-lg">
                Get started with Intellicord in just a few steps
              </p>
            </div>

            <HowItWorks />
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 mb-4">
            See It In Action
          </h2>
          <div className="w-full max-w-4xl mx-auto aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/8qAV7Zcp2KY?controls=0&modestbranding=1&showinfo=0&rel=0&mute=1&vq=hd1080p"
              title="YouTube video player"
              allow="encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        {/* CTA Section */}
        <section id="invite" className="py-20 relative overflow-hidden">
          <div className="relative px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="relative bg-white rounded-xl overflow-hidden border border-gray-200 p-8 md:p-12 shadow-xl">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900 mb-4">
                      Ready to Get Started?
                    </h2>
                    <p className="text-gray-600 md:text-lg">
                      Add Intellicord to your Discord server today and
                      experience the power of AI-assisted conversations.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white border-0 h-12 px-8"
                      asChild
                    >
                      <Link href={authLink}>Add to Discord</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-gray-200 py-4 relative text-center">
        <p className="text-gray-600 text-sm px-4">
          © {new Date().getFullYear()} Senarado Solutions LLC. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export const runtime = "edge";
