import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Plus,
  Github,
  MessageSquare,
  BarChart3,
  Clock,
  Users,
  Zap,
  Search,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  const recentRFCs = [
    {
      id: 1,
      title: "API Rate Limiting Implementation",
      status: "In Review",
      author: "Sarah Chen",
      date: "2 days ago",
    },
    {
      id: 2,
      title: "Database Migration Strategy",
      status: "Draft",
      author: "Mike Johnson",
      date: "1 week ago",
    },
    {
      id: 3,
      title: "Frontend Component Library",
      status: "Approved",
      author: "Alex Kim",
      date: "2 weeks ago",
    },
  ];

  const insights = [
    { metric: "Active RFCs", value: "12", change: "+3 this week" },
    { metric: "Code Coverage", value: "87%", change: "+2% this month" },
    { metric: "Team Velocity", value: "8.2", change: "↑ 15%" },
    { metric: "Blocked Issues", value: "3", change: "-2 resolved" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Kairo</span>
              </div>
              <Badge variant="secondary">Beta</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Ask My Repo
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                <UserButton />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen">
          <nav className="p-4 space-y-2">
            <Link href="/dashboard">
              <Button variant="secondary" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link href="/rfcs">
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                RFCs
              </Button>
            </Link>
            <Link href="/codebase">
              <Button variant="ghost" className="w-full justify-start">
                <Github className="w-4 h-4 mr-2" />
                Codebase
              </Button>
            </Link>
            <Link href="/integrations">
              <Button variant="ghost" className="w-full justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Integrations
              </Button>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome back, Arav!</h1>
              <p className="text-slate-600">
                Here's what's happening with your engineering team today.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Link href="/rfcs/new">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Plus className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Create RFC</h3>
                        <p className="text-sm text-slate-600">
                          Start a new technical proposal
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/codebase/explore">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Search className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Explore Code</h3>
                        <p className="text-sm text-slate-600">
                          Ask questions about your repo
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">View Insights</h3>
                      <p className="text-sm text-slate-600">
                        Team metrics and analytics
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Metrics Grid */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {insights.map((insight, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-600">
                        {insight.metric}
                      </span>
                    </div>
                    <div className="text-2xl font-bold mb-1">
                      {insight.value}
                    </div>
                    <div className="text-sm text-green-600">
                      {insight.change}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent RFCs */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent RFCs</CardTitle>
                    <Link href="/rfcs">
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </Link>
                  </div>
                  <CardDescription>
                    Latest technical proposals from your team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentRFCs.map((rfc) => (
                      <div
                        key={rfc.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium">{rfc.title}</h4>
                          <div className="flex items-center space-x-2 text-sm text-slate-600 mt-1">
                            <span>{rfc.author}</span>
                            <span>•</span>
                            <span>{rfc.date}</span>
                          </div>
                        </div>
                        <Badge
                          variant={
                            rfc.status === "Approved"
                              ? "default"
                              : rfc.status === "In Review"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {rfc.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>AI Insights</CardTitle>
                  <CardDescription>
                    Intelligent recommendations for your codebase
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900">
                            Refactoring Opportunity
                          </h4>
                          <p className="text-sm text-blue-700 mt-1">
                            The authentication module has grown complex.
                            Consider splitting into separate services.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Users className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-900">
                            Team Velocity
                          </h4>
                          <p className="text-sm text-green-700 mt-1">
                            Your team's velocity has increased 15% this sprint.
                            Great work on the new deployment pipeline!
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-amber-900">
                            Pending Reviews
                          </h4>
                          <p className="text-sm text-amber-700 mt-1">
                            3 RFCs are waiting for review. Consider scheduling a
                            design review meeting.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
