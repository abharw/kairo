import { NextResponse } from "next/server";
import { connect } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
    const user = await auth();

    // If the user is not authenticated, return an error
    if(!user.userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connect();
}

