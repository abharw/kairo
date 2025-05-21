"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, Video, Users, Settings, PlusCircle, Clock, Star, Tag } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "My Videos",
    href: "/dashboard/my-videos",
    icon: Video,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    title: "Recent",
    href: "/dashboard/recent",
    icon: Clock,
  },
  {
    title: "Favorites",
    href: "/dashboard/favorites",
    icon: Star,
  },
  {
    title: "Tags",
    href: "/dashboard/tags",
    icon: Tag,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <ScrollArea className="h-full py-6">
      <div className="px-3 py-2">
        <div className="mb-6">
          <Button asChild className="w-full justify-start gap-2" variant="secondary">
            <Link href="/dashboard/new">
              <PlusCircle className="h-4 w-4" />
              New Video Update
            </Link>
          </Button>
        </div>
        <div className="space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === item.href ? "bg-secondary" : "hover:bg-transparent hover:underline",
              )}
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}
