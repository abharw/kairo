import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Clock,
  User,
  MessageSquare,
  Zap,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function RFCsPage() {
  const rfcs = [
    {
      id: 1,
      title: "API Rate Limiting Implementation",
      description:
        "Implement comprehensive rate limiting across all API endpoints to prevent abuse and ensure fair usage.",
      status: "In Review",
      author: "Sarah Chen",
      date: "2024-01-15",
      comments: 8,
      tags: ["API", "Security", "Performance"],
    },
    {
      id: 2,
      title: "Database Migration Strategy",
      description:
        "Plan for migrating from PostgreSQL to a distributed database solution to handle increased load.",
      status: "Draft",
      author: "Mike Johnson",
      date: "2024-01-10",
      comments: 3,
      tags: ["Database", "Migration", "Scalability"],
    },
    {
      id: 3,
      title: "Frontend Component Library",
      description:
        "Create a unified component library to improve consistency and development velocity across teams.",
      status: "Approved",
      author: "Alex Kim",
      date: "2024-01-05",
      comments: 15,
      tags: ["Frontend", "Components", "DX"],
    },
    {
      id: 4,
      title: "Microservices Architecture Transition",
      description:
        "Break down the monolithic application into microservices for better scalability and team autonomy.",
      status: "In Review",
      author: "David Park",
      date: "2024-01-12",
      comments: 12,
      tags: ["Architecture", "Microservices", "Scalability"],
    },
    {
      id: 5,
      title: "Real-time Notification System",
      description:
        "Implement WebSocket-based real-time notifications for improved user engagement.",
      status: "Draft",
      author: "Emma Wilson",
      date: "2024-01-08",
      comments: 5,
      tags: ["Real-time", "WebSocket", "Notifications"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "default";
      case "In Review":
        return "secondary";
      case "Draft":
        return "outline";
      default:
        return "outline";
    }
  };

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
            <Link href="/rfcs/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New RFC
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">RFCs</h1>
            <p className="text-slate-600">
              Manage and track technical proposals across your team
            </p>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input placeholder="Search RFCs..." className="pl-10" />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Total RFCs
                    </p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      In Review
                    </p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                  <Clock className="w-8 h-8 text-amber-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Approved
                    </p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Drafts</p>
                    <p className="text-2xl font-bold">4</p>
                  </div>
                  <User className="w-8 h-8 text-slate-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RFCs List */}
          <div className="space-y-4">
            {rfcs.map((rfc) => (
              <Card key={rfc.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Link href={`/rfcs/${rfc.id}`}>
                          <h3 className="text-lg font-semibold hover:text-blue-600 cursor-pointer">
                            {rfc.title}
                          </h3>
                        </Link>
                        <Badge variant={getStatusColor(rfc.status)}>
                          {rfc.status}
                        </Badge>
                      </div>

                      <p className="text-slate-600 mb-3">{rfc.description}</p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {rfc.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{rfc.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(rfc.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{rfc.comments} comments</span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4">
                      <Link href={`/rfcs/${rfc.id}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
