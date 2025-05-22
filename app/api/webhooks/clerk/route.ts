import { clerkClient } from "@clerk/clerk-sdk-node";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser } from "@/lib/actions/user.actions";

export async function POST(req: Request) {
    try {
        const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
        if (!WEBHOOK_SECRET) {
            throw new Error(
                "Webhook missing from .env"
            );
        }

        // Get headers 
        const headerPayload = headers();
        const svix_id = (await headerPayload).get("svix-id");
        const svix_timestamp = (await headerPayload).get("svix_timestamp");
        const svix_signature = (await headerPayload).get("svix_signature");

        // Throw error if no errors
        if(!svix_id || !svix_timestamp || !svix_signature) {
            return new Response(
                "Error occured, no svix headers", {
                    status: 400
                }
            );
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
            console.error("Error verifying webhook: ", error);
            return new Response("Error occurred ", {
                status: 400,
            });
        }

        const { id } = event.data;
        const eventType = event.type;

        // Create user in mongodb

        if (eventType == "user.created") { // in clerk dashboard
            const {
                id,
                email_addresses,
                image_url,
                first_name,
                last_name,
                username
            } = event.data;

            const user = {
                clerkId: id,
                email_address: email_addresses[0].email_address,
                username: username!,
                firstName: first_name,
                lastName: last_name,
                photo: image_url,
            };

            console.log("User: ", user);
            const newUser = await createUser(user);

            if(newUser) {
                await clerkClient.users.updateUserMetadata(id, {
                    publicMetadata: {
                        userId: newUser._id
                    }
                });
            }

            return NextResponse.json({
                message: "New user created", user: newUser
            });
        }

        return new Response("", { status: 200 })

    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error verifying webhook', { status: 400 })
    }
}