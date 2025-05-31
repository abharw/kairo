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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Save,
  Send,
  Zap,
  Lightbulb,
  FileText,
  Users,
  Target,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

export default function NewRFCPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [motivation, setMotivation] = useState("");
  const [proposal, setProposal] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIAssist = async (section: string) => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      if (section === "motivation") {
        setMotivation(
          "This RFC addresses the growing need for API rate limiting as our user base has increased by 300% in the last quarter. Without proper rate limiting, we risk service degradation and potential abuse of our endpoints. Implementing this will ensure fair usage and maintain service quality for all users."
        );
      } else if (section === "proposal") {
        setProposal(`## Implementation Strategy

### 1. Rate Limiting Algorithm
- Implement token bucket algorithm for smooth rate limiting
- Use Redis for distributed rate limiting across multiple instances
- Configure different limits for authenticated vs anonymous users

### 2. API Endpoints
- Apply rate limiting to all public API endpoints
- Implement tiered limits based on user subscription level
- Add bypass mechanism for internal services

### 3. Monitoring & Alerting
- Track rate limit violations and patterns
- Set up alerts for unusual traffic spikes
- Dashboard for real-time rate limiting metrics

### 4. Rollout Plan
- Phase 1: Implement on non-critical endpoints
- Phase 2: Gradual rollout to all endpoints
- Phase 3: Fine-tune limits based on usage patterns`);
      }
      setIsGenerating(false);
    }, 2000);
  };

  const aiSuggestions = [
    {
      icon: Target,
      title: "Impact Analysis",
      description:
        "Analyze potential impact on existing systems and user experience",
    },
    {
      icon: Users,
      title: "Stakeholder Review",
      description: "Identify key stakeholders who should review this RFC",
    },
    {
      icon: AlertTriangle,
      title: "Risk Assessment",
      description: "Identify potential risks and mitigation strategies",
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
                href="/rfcs"
                className="flex items-center text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to RFCs
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Kairo</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button>
                <Send className="w-4 h-4 mr-2" />
                Submit for Review
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Editor */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>New RFC</span>
                  </CardTitle>
                  <CardDescription>
                    Create a new Request for Comments with AI assistance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., API Rate Limiting Implementation"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="summary">Summary</Label>
                    <Textarea
                      id="summary"
                      placeholder="Brief overview of the proposal..."
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="motivation">Motivation</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAIAssist("motivation")}
                        disabled={isGenerating}
                      >
                        <Zap className="w-4 h-4 mr-1" />
                        AI Assist
                      </Button>
                    </div>
                    <Textarea
                      id="motivation"
                      placeholder="Why is this change needed? What problem does it solve?"
                      value={motivation}
                      onChange={(e) => setMotivation(e.target.value)}
                      className="mt-1"
                      rows={4}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="proposal">Detailed Proposal</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAIAssist("proposal")}
                        disabled={isGenerating}
                      >
                        <Zap className="w-4 h-4 mr-1" />
                        AI Assist
                      </Button>
                    </div>
                    <Textarea
                      id="proposal"
                      placeholder="Detailed description of the proposed solution..."
                      value={proposal}
                      onChange={(e) => setProposal(e.target.value)}
                      className="mt-1"
                      rows={12}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Assistant Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    <span>AI Suggestions</span>
                  </CardTitle>
                  <CardDescription>
                    Get intelligent recommendations for your RFC
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-lg hover:bg-slate-50 cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <suggestion.icon className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-sm">
                            {suggestion.title}
                          </h4>
                          <p className="text-xs text-slate-600 mt-1">
                            {suggestion.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Related Code</CardTitle>
                  <CardDescription>
                    Relevant files and modules from your codebase
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="font-medium text-sm">
                        src/middleware/auth.ts
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        Authentication middleware
                      </div>
                      <Badge variant="outline" className="mt-2 text-xs">
                        Related
                      </Badge>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="font-medium text-sm">
                        src/api/routes/index.ts
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        API route definitions
                      </div>
                      <Badge variant="outline" className="mt-2 text-xs">
                        High Impact
                      </Badge>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="font-medium text-sm">config/redis.ts</div>
                      <div className="text-xs text-slate-600 mt-1">
                        Redis configuration
                      </div>
                      <Badge variant="outline" className="mt-2 text-xs">
                        Dependency
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>RFC Template</CardTitle>
                  <CardDescription>
                    Standard sections for technical proposals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Summary</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Motivation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <span>Detailed Proposal</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                      <span>Implementation Plan</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                      <span>Testing Strategy</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                      <span>Alternatives Considered</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
