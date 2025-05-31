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
  GitPullRequest,
  GitCommit,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { fetchRepoData } from "@/lib/github";

export default async function DemoPage() {
  const repoData = await fetchRepoData("abharw", "taskflow-demo");

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Kairo</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  <Github className="w-4 h-4 mr-2" />
                  Connect GitHub
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Welcome to Kairo Demo!</CardTitle>
            <CardDescription>
              Experience Kairo with a sample repository. Try out our features
              before connecting your own repository.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Github className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <h3 className="font-medium">{repoData.name}</h3>
                  <p className="text-sm text-slate-600">
                    {repoData.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary">{repoData.language}</Badge>
                    {repoData.topics.slice(0, 2).map((topic: string) => (
                      <Badge key={topic} variant="outline">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <Link href="/dashboard">
                <Button className="w-full">
                  <Github className="w-4 h-4 mr-2" />
                  Connect Your GitHub Repository
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Try These Features</CardTitle>
              <CardDescription>
                Experience Kairo's capabilities with the sample repository
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Search className="w-4 h-4 mr-2" />
                  Ask Questions About the Code
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Documentation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Code Review Assistant
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest updates from the repository
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {repoData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    {activity.type === "commit" ? (
                      <GitCommit className="w-4 h-4 text-slate-600 mt-1" />
                    ) : activity.type === "pr" ? (
                      <GitPullRequest className="w-4 h-4 text-slate-600 mt-1" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-slate-600 mt-1" />
                    )}
                    <div>
                      <p className="text-sm font-medium">
                        {activity.type === "commit"
                          ? activity.message
                          : activity.title}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
                        <span>{activity.author}</span>
                        <span>•</span>
                        <span>
                          {new Date(activity.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Repository Stats</CardTitle>
              <CardDescription>Overview of the repository</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-sm text-slate-600">Stars</div>
                  <div className="text-2xl font-bold">
                    {repoData.stars.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-sm text-slate-600">Forks</div>
                  <div className="text-2xl font-bold">
                    {repoData.forks.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-sm text-slate-600">Contributors</div>
                  <div className="text-2xl font-bold">
                    {repoData.contributors}
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-sm text-slate-600">Open Issues</div>
                  <div className="text-2xl font-bold">
                    {repoData.stats.openIssues}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
