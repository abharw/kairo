"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ArrowLeft,
  Zap,
  FileText,
  Folder,
  GitBranch,
  Code,
  MessageSquare,
  TrendingUp,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function CodebasePage() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsSearching(true);
    // Simulate AI search
    setTimeout(() => {
      setIsSearching(false);
    }, 2000);
  };

  const recentQueries = [
    "How does authentication work in our app?",
    "What are the main API endpoints?",
    "Show me the database schema",
    "Where is rate limiting implemented?",
  ];

  const codebaseStats = [
    { label: "Total Files", value: "2,847", icon: FileText },
    { label: "Lines of Code", value: "156K", icon: Code },
    { label: "Active Branches", value: "12", icon: GitBranch },
    { label: "Last Updated", value: "2 hours ago", icon: Clock },
  ];

  const insights = [
    {
      title: "High Complexity Modules",
      description:
        "Authentication service has grown complex and may benefit from refactoring",
      type: "warning",
      files: ["src/auth/AuthService.ts", "src/auth/middleware.ts"],
    },
    {
      title: "Unused Dependencies",
      description: "Found 8 npm packages that are no longer being used",
      type: "info",
      files: ["lodash", "moment", "axios"],
    },
    {
      title: "Test Coverage Gaps",
      description: "Payment processing module needs additional test coverage",
      type: "warning",
      files: ["src/payments/", "src/billing/"],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="flex items-center text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Kairo</span>
              </div>
            </div>
            <Badge variant="secondary">Repository: my-startup-app</Badge>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Codebase Explorer</h1>
            <p className="text-slate-600">
              Ask questions about your repository and get intelligent insights
            </p>
          </div>

          {/* Search Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Ask My Repo</span>
              </CardTitle>
              <CardDescription>
                Ask natural language questions about your codebase
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Input
                    placeholder="e.g., How does user authentication work? Where are the API routes defined?"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <Button onClick={handleSearch} disabled={isSearching}>
                  <Search className="w-4 h-4 mr-2" />
                  {isSearching ? "Searching..." : "Ask"}
                </Button>
              </div>

              {/* Recent Queries */}
              <div className="mt-4">
                <p className="text-sm font-medium text-slate-700 mb-2">
                  Recent questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {recentQueries.map((recentQuery, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setQuery(recentQuery)}
                      className="text-xs"
                    >
                      {recentQuery}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {codebaseStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Repository Structure */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Folder className="w-5 h-5" />
                  <span>Repository Structure</span>
                </CardTitle>
                <CardDescription>
                  Explore your codebase structure and key modules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
                    <Folder className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <div className="font-medium">src/</div>
                      <div className="text-sm text-slate-600">
                        Main source code
                      </div>
                    </div>
                    <Badge variant="outline">847 files</Badge>
                  </div>

                  <div className="ml-6 space-y-2">
                    <div className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded cursor-pointer">
                      <Folder className="w-4 h-4 text-slate-400" />
                      <span className="text-sm">components/</span>
                      <Badge variant="outline" className="text-xs">
                        156 files
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded cursor-pointer">
                      <Folder className="w-4 h-4 text-slate-400" />
                      <span className="text-sm">api/</span>
                      <Badge variant="outline" className="text-xs">
                        89 files
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded cursor-pointer">
                      <Folder className="w-4 h-4 text-slate-400" />
                      <span className="text-sm">auth/</span>
                      <Badge variant="outline" className="text-xs">
                        23 files
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded cursor-pointer">
                      <Folder className="w-4 h-4 text-slate-400" />
                      <span className="text-sm">utils/</span>
                      <Badge variant="outline" className="text-xs">
                        45 files
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
                    <Folder className="w-5 h-5 text-green-600" />
                    <div className="flex-1">
                      <div className="font-medium">tests/</div>
                      <div className="text-sm text-slate-600">Test files</div>
                    </div>
                    <Badge variant="outline">234 files</Badge>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <div className="flex-1">
                      <div className="font-medium">docs/</div>
                      <div className="text-sm text-slate-600">
                        Documentation
                      </div>
                    </div>
                    <Badge variant="outline">12 files</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>AI Insights</span>
                </CardTitle>
                <CardDescription>
                  Intelligent analysis of your codebase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {insights.map((insight, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        insight.type === "warning"
                          ? "bg-amber-50 border border-amber-200"
                          : "bg-blue-50 border border-blue-200"
                      }`}
                    >
                      <h4
                        className={`font-medium mb-2 ${
                          insight.type === "warning"
                            ? "text-amber-900"
                            : "text-blue-900"
                        }`}
                      >
                        {insight.title}
                      </h4>
                      <p
                        className={`text-sm mb-3 ${
                          insight.type === "warning"
                            ? "text-amber-700"
                            : "text-blue-700"
                        }`}
                      >
                        {insight.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {insight.files.map((file, fileIndex) => (
                          <Badge
                            key={fileIndex}
                            variant="outline"
                            className="text-xs"
                          >
                            {file}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
