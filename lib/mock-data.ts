export const mockVideos = [
  {
    id: "video-1",
    title: "Weekly Sprint Update",
    description: "Updates on the current sprint progress, blockers, and next steps for the team.",
    thumbnailUrl: "/placeholder.svg?height=200&width=400",
    videoUrl: "https://example.com/video1.mp4", // This would be a real video URL in production
    duration: "1:45",
    createdAt: "2 hours ago",
    author: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["Sprint", "Update", "Development"],
    likes: 12,
    comments: [
      {
        id: "comment-1",
        author: {
          name: "Jane Smith",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Great update! Looking forward to the demo on Friday.",
        createdAt: "1 hour ago",
      },
      {
        id: "comment-2",
        author: {
          name: "Mike Johnson",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Can you clarify the timeline for the API integration?",
        createdAt: "30 minutes ago",
      },
    ],
    viewed: true,
    isOwner: true,
    transcript: [
      {
        id: "transcript-1",
        start: 0,
        end: 5,
        text: "Hey team, just wanted to give a quick update on our sprint progress.",
      },
      {
        id: "transcript-2",
        start: 5,
        end: 10,
        text: "We've completed the user authentication flow and are now working on the dashboard components.",
      },
      {
        id: "transcript-3",
        start: 10,
        end: 15,
        text: "There's a blocker with the API integration that I'm working through with the backend team.",
      },
      {
        id: "transcript-4",
        start: 15,
        end: 20,
        text: "We should still be on track to finish by Friday, but I'll keep everyone updated if anything changes.",
      },
      {
        id: "transcript-5",
        start: 20,
        end: 25,
        text: "Let me know if you have any questions or concerns. Thanks!",
      },
    ],
    aiSummary:
      "John provided a sprint update, noting completion of user authentication and ongoing work on dashboard components. There's a blocker with API integration being addressed with the backend team. The team is still on track to finish by Friday, barring any changes.",
  },
  {
    id: "video-2",
    title: "New Feature Demo",
    description: "Demonstrating the new analytics dashboard features we just shipped.",
    thumbnailUrl: "/placeholder.svg?height=200&width=400",
    videoUrl: "https://example.com/video2.mp4",
    duration: "2:10",
    createdAt: "Yesterday",
    author: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["Demo", "Analytics", "Feature"],
    likes: 24,
    comments: [
      {
        id: "comment-3",
        author: {
          name: "Alex Chen",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "This looks amazing! Great work on the visualization.",
        createdAt: "10 hours ago",
      },
    ],
    viewed: false,
    isOwner: false,
    transcript: [
      {
        id: "transcript-6",
        start: 0,
        end: 5,
        text: "Hi everyone, I'm excited to show you the new analytics dashboard we just shipped.",
      },
      {
        id: "transcript-7",
        start: 5,
        end: 10,
        text: "As you can see, we've completely redesigned the UI to make it more intuitive and user-friendly.",
      },
      {
        id: "transcript-8",
        start: 10,
        end: 15,
        text: "The new charts are interactive, allowing users to drill down into specific data points.",
      },
      {
        id: "transcript-9",
        start: 15,
        end: 20,
        text: "We've also added the ability to export reports in multiple formats, including PDF and CSV.",
      },
      {
        id: "transcript-10",
        start: 20,
        end: 25,
        text: "The feedback from beta testers has been overwhelmingly positive, and we're excited to roll this out to all users next week.",
      },
    ],
    aiSummary:
      "Sarah demonstrated the newly shipped analytics dashboard featuring a redesigned UI, interactive charts for data exploration, and multi-format export capabilities. Beta tester feedback has been very positive, with full rollout planned for next week.",
  },
  {
    id: "video-3",
    title: "Project Kickoff",
    description: "Introducing our new project goals, timeline, and team structure.",
    thumbnailUrl: "/placeholder.svg?height=200&width=400",
    videoUrl: "https://example.com/video3.mp4",
    duration: "1:30",
    createdAt: "2 days ago",
    author: {
      name: "David Lee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["Kickoff", "Project", "Planning"],
    likes: 18,
    comments: [
      {
        id: "comment-4",
        author: {
          name: "Rachel Kim",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Looking forward to working on this project!",
        createdAt: "1 day ago",
      },
      {
        id: "comment-5",
        author: {
          name: "Tom Wilson",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Can we schedule a follow-up meeting to discuss the technical requirements in more detail?",
        createdAt: "1 day ago",
      },
    ],
    viewed: true,
    isOwner: false,
    transcript: [
      {
        id: "transcript-11",
        start: 0,
        end: 5,
        text: "Hello team, I'm excited to kick off our new project today.",
      },
      {
        id: "transcript-12",
        start: 5,
        end: 10,
        text: "Our main goal is to build a scalable solution that addresses the client's needs for improved customer engagement.",
      },
      {
        id: "transcript-13",
        start: 10,
        end: 15,
        text: "We'll be working on a 12-week timeline, with the first milestone due in 3 weeks.",
      },
      {
        id: "transcript-14",
        start: 15,
        end: 20,
        text: "I've divided the team into three groups: frontend, backend, and design. Each group will have specific responsibilities.",
      },
      {
        id: "transcript-15",
        start: 20,
        end: 25,
        text: "Let's make this project a success together. I'm looking forward to our collaboration.",
      },
    ],
    aiSummary:
      "David introduced a new project focused on building a scalable customer engagement solution. The project will run for 12 weeks with the first milestone due in 3 weeks. The team has been organized into three functional groups (frontend, backend, and design) with specific responsibilities assigned to each.",
  },
  {
    id: "video-4",
    title: "Bug Fix Explanation",
    description: "Explaining the critical bug we found and how we fixed it.",
    thumbnailUrl: "/placeholder.svg?height=200&width=400",
    videoUrl: "https://example.com/video4.mp4",
    duration: "1:15",
    createdAt: "3 days ago",
    author: {
      name: "Emily Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["Bug", "Fix", "Technical"],
    likes: 9,
    comments: [],
    viewed: false,
    isOwner: false,
    transcript: [
      {
        id: "transcript-16",
        start: 0,
        end: 5,
        text: "Hi team, I wanted to explain the critical bug we discovered yesterday and how we fixed it.",
      },
      {
        id: "transcript-17",
        start: 5,
        end: 10,
        text: "The issue was in our authentication service where tokens weren't being properly validated after a certain period.",
      },
      {
        id: "transcript-18",
        start: 10,
        end: 15,
        text: "This could have potentially allowed unauthorized access to user accounts.",
      },
      {
        id: "transcript-19",
        start: 15,
        end: 20,
        text: "We fixed it by implementing a more robust token validation system and adding additional security checks.",
      },
      {
        id: "transcript-20",
        start: 20,
        end: 25,
        text: "The fix has been deployed to production and we've added tests to ensure this doesn't happen again.",
      },
    ],
    aiSummary:
      "Emily explained a critical authentication bug where tokens weren't being properly validated, potentially allowing unauthorized account access. The team implemented a more robust token validation system with additional security checks, deployed the fix to production, and added tests to prevent recurrence.",
  },
  {
    id: "video-5",
    title: "Customer Feedback Summary",
    description: "Summarizing the key points from our recent customer feedback sessions.",
    thumbnailUrl: "/placeholder.svg?height=200&width=400",
    videoUrl: "https://example.com/video5.mp4",
    duration: "1:50",
    createdAt: "4 days ago",
    author: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["Feedback", "Customer", "Research"],
    likes: 15,
    comments: [
      {
        id: "comment-6",
        author: {
          name: "Lisa Park",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "This is really helpful. We should prioritize the UI improvements in our next sprint.",
        createdAt: "3 days ago",
      },
    ],
    viewed: true,
    isOwner: false,
    transcript: [
      {
        id: "transcript-21",
        start: 0,
        end: 5,
        text: "Hello everyone, I wanted to share a summary of the feedback we received from our customer interviews last week.",
      },
      {
        id: "transcript-22",
        start: 5,
        end: 10,
        text: "We spoke with 12 customers across different segments, and there were some consistent themes that emerged.",
      },
      {
        id: "transcript-23",
        start: 10,
        end: 15,
        text: "First, users love the simplicity of our interface, but they want more customization options.",
      },
      {
        id: "transcript-24",
        start: 15,
        end: 20,
        text: "Second, the reporting features are highly valued, but several users mentioned they would like more export options.",
      },
      {
        id: "transcript-25",
        start: 20,
        end: 25,
        text: "Finally, there were some performance issues noted with the mobile app that we should address in our next release.",
      },
    ],
    aiSummary:
      "Michael summarized feedback from 12 customer interviews across different segments. Key findings: users appreciate the interface simplicity but want more customization options; reporting features are valued but need additional export capabilities; and performance issues with the mobile app need to be addressed in the next release.",
  },
  {
    id: "video-6",
    title: "Quick Design Review",
    description: "Reviewing the latest design mockups for the mobile app redesign.",
    thumbnailUrl: "/placeholder.svg?height=200&width=400",
    videoUrl: "https://example.com/video6.mp4",
    duration: "1:20",
    createdAt: "5 days ago",
    author: {
      name: "Jessica Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["Design", "Review", "Mobile"],
    likes: 21,
    comments: [
      {
        id: "comment-7",
        author: {
          name: "Ryan Garcia",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "The new design looks fantastic! I especially like the improved navigation.",
        createdAt: "4 days ago",
      },
    ],
    viewed: true,
    isOwner: true,
    transcript: [
      {
        id: "transcript-26",
        start: 0,
        end: 5,
        text: "Hi team, I wanted to walk through the latest design mockups for our mobile app redesign.",
      },
      {
        id: "transcript-27",
        start: 5,
        end: 10,
        text: "As you can see, we've simplified the navigation and made it more intuitive.",
      },
      {
        id: "transcript-28",
        start: 10,
        end: 15,
        text: "The color scheme has been updated to align with our new brand guidelines.",
      },
      {
        id: "transcript-29",
        start: 15,
        end: 20,
        text: "We've also improved the accessibility by increasing contrast and adding support for screen readers.",
      },
      {
        id: "transcript-30",
        start: 20,
        end: 25,
        text: "I'd love to get your feedback on these changes before we finalize the design.",
      },
    ],
    aiSummary:
      "Jessica reviewed the latest mobile app redesign mockups featuring simplified navigation, updated color scheme aligned with new brand guidelines, and improved accessibility through increased contrast and screen reader support. She requested team feedback before finalizing the design.",
  },
]
