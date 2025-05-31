import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Github, MessageSquare, FileText, Zap, Users, BarChart3 } from "lucide-react"
import Link from "next/link"
import { SignedIn, SignUpButton, UserButton } from "@clerk/nextjs"
import { SignInButton } from "@clerk/nextjs"
import { SignedOut } from "@clerk/nextjs"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Kairo</span>
          </div>
          <div className="flex items-center space-x-4">
              <SignedOut>
                  <SignInButton forceRedirectUrl="/dashboard" mode="modal">
                    <Button variant="outline">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton forceRedirectUrl="/dashboard" mode="modal">
                    <Button>
                      Sign Up
                    </Button>
                  </SignUpButton>
              </SignedOut>
              <SignedIn>
                  <UserButton/>
              </SignedIn>

          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            Built for Fast-Growing Startups
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent py-1">
            AI-Powered RFC & Codebase Intelligence
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Transform how your engineering team writes RFCs, explores codebases, and makes technical decisions.
            Context-aware AI that understands your code, discussions, and workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" className="text-lg px-8">
                Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8">
              <Github className="mr-2 w-5 h-5" />
              Connect GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Everything Your Team Needs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <FileText className="w-10 h-10 text-blue-600 mb-2" />
                <CardTitle>AI RFC Assistant</CardTitle>
                <CardDescription>
                  Draft, manage, and track RFCs with AI that pulls context from your codebase and team discussions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Auto-generate RFC templates</li>
                  <li>• Impact estimation & analysis</li>
                  <li>• Historical RFC lookup</li>
                  <li>• Test plan suggestions</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <MessageSquare className="w-10 h-10 text-green-600 mb-2" />
                <CardTitle>Codebase Explorer</CardTitle>
                <CardDescription>
                  Semantically index your repo to provide contextual insights and answer developer queries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• "Ask My Repo" functionality</li>
                  <li>• Module relationship mapping</li>
                  <li>• Code impact analysis</li>
                  <li>• Architecture insights</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <BarChart3 className="w-10 h-10 text-purple-600 mb-2" />
                <CardTitle>Workflow Integration</CardTitle>
                <CardDescription>
                  Connect with GitHub, Slack, and Linear for seamless team collaboration and insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• GitHub PR & commit context</li>
                  <li>• Slack discussion triggers</li>
                  <li>• Team velocity tracking</li>
                  <li>• Actionable insights</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">Trusted by Fast-Growing Teams</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-6 h-6 text-slate-400" />
              <span className="text-slate-600">5-50 Engineers</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Zap className="w-6 h-6 text-slate-400" />
              <span className="text-slate-600">YC Startups</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <BarChart3 className="w-6 h-6 text-slate-400" />
              <span className="text-slate-600">Tech Leaders</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Engineering Workflow?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join forward-thinking startups using AI to accelerate their technical decision-making
          </p>
          <Link href="/auth">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Start Your Free Trial <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-900 text-slate-300">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-white">Kairo</span>
              </div>
              <p className="text-sm">AI-powered development tools for modern startups</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>RFC Assistant</li>
                <li>Codebase Explorer</li>
                <li>Integrations</li>
                <li>Pricing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Support</li>
                <li>Status</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 Kairo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
