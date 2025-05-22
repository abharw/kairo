import { clerkClient } from "@clerk/clerk-sdk-node";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser } from "@/lib/actions/user.actions";

export async function POST(req: Request) {
    try {
        const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
        
        if (!WEBHOOK_SECRET) {
            throw new Error("Webhook secret missing from .env");
        }

        // Get headers (no await needed)
        const headerPayload = await headers();
        const svix_id = headerPayload.get("svix-id");
        const svix_timestamp = headerPayload.get("svix-timestamp"); 
        const svix_signature = headerPayload.get("svix-signature");

        // Check for required headers
        if (!svix_id || !svix_timestamp || !svix_signature) {
            console.error("Missing svix headers:", { svix_id, svix_timestamp, svix_signature });
            return new Response("Error occurred, missing svix headers", {
                status: 400
            });
        }

        // Get body 
        const payload = await req.json();
        const body = JSON.stringify(payload);

        const webhook = new Webhook(WEBHOOK_SECRET);

        let event: WebhookEvent;

        // Verify payload with headers
        try {
            event = webhook.verify(body, {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature,
            }) as WebhookEvent;
        } catch (error) {  
            console.error("Error verifying webhook signature:", error);
            return new Response("Error verifying webhook signature", {
                status: 400,
            });
        }

        const { id } = event.data;
        const eventType = event.type;

        console.log(`Webhook received: ${eventType} for user ${id}`);

        // Create user in mongodb
        if (eventType === "user.created") {
            const {
                id,
                email_addresses,
                image_url,
                first_name,
                last_name,
                username
            } = event.data;

            // Validate required fields
            if (!email_addresses || email_addresses.length === 0) {
                console.error("No email addresses found in user data");
                return new Response("Invalid user data", { status: 400 });
            }

            const user = {
                clerkId: id,
                email: email_addresses[0].email_address,
                username: username || "", // Handle potential null/undefined
                firstName: first_name || "",
                lastName: last_name || "",
                photo: image_url || "",
            };

            console.log("Creating user:", user);
            
            try {
                const newUser = await createUser(user);

                if (newUser) {
                    // Update user metadata with MongoDB ID
                    await clerkClient.users.updateUserMetadata(id, {
                        publicMetadata: {
                            userId: newUser._id
                        }
                    });

                    console.log("User created successfully:", newUser._id);
                }

                return NextResponse.json({
                    message: "New user created", 
                    user: newUser
                });
            } catch (dbError) {
                console.error("Database error:", dbError);
                return new Response("Database error", { status: 500 });
            }
        }

        console.log(`Unhandled event type: ${eventType}`);
        return new Response("", { status: 200 });

    } catch (err) {
        console.error('Webhook error:', err);
        return new Response('Internal server error', { status: 500 });
    }
}