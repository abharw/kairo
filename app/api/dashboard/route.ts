import { NextResponse } from "next/server";
import { connect } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Dashboard from "@/lib/model/dashboard.model";
import User from "@/lib/model/user.model";

export async function GET() {
    const { userId: clerkId } = await auth();

    // If the user is not authenticated, return an error
    if(!clerkId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connect();

    let dashboard = await Dashboard.findOne({ clerkId }).populate('userId');
    if(!dashboard) {
        const user = await User.findOne({ clerkId });
        if(!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Create a new dashboard for the user
        dashboard = await Dashboard.create({ 
            userId: user._id,
            clerkId: clerkId,
            theme: 'dark',
            layout: 'grid',
            favoriteVideos: [],
            uploadedVideos: [],
            stats: {
                totalVideos: 0,
                totalViews: 0,
                totalStorageUsed: 0,
                lastActive: new Date(),
            }
        });

        dashboard = await Dashboard.findById(dashboard._id).populate('userId')
        console.log(`Auto-created dashboard for user: ${user.email}`);

    }

    return NextResponse.json(dashboard);
}

