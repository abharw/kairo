"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, ArrowLeft, Zap } from "lucide-react"
import Link from "next/link"

export default function AuthPage() {
  const handleGitHubAuth = () => {
    // In a real app, this would redirect to GitHub OAuth
    // For demo purposes, we'll redirect to dashboard
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">Kairo</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-slate-600">Sign in to access your AI-powered dev tools</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Connect your GitHub account to begin analyzing your codebase and creating RFCs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleGitHubAuth} className="w-full text-lg py-6" size="lg">
              <Github className="mr-3 w-5 h-5" />
              Continue with GitHub
            </Button>

            <div className="text-center text-sm text-slate-500">
              <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
            </div>

            <div className="border-t pt-4">
              <div className="text-center text-sm text-slate-600">
                <p className="font-medium mb-2">What happens next:</p>
                <ul className="text-left space-y-1">
                  <li>• Connect your GitHub repositories</li>
                  <li>• AI analyzes your codebase structure</li>
                  <li>• Start creating intelligent RFCs</li>
                  <li>• Get contextual code insights</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-slate-500">
          <p>
            Need help?{" "}
            <Link href="#" className="text-blue-600 hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
