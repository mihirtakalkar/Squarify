import { connectMongoDB } from "@/lib/mongodb";
import Group from "@/models/group";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectMongoDB();

    try {
        const url = new URL(request.url);
        const userEmail = url.searchParams.get('email');
        if (!userEmail) {
            return new NextResponse(JSON.stringify({ error: 'Email parameter is required' }), { status: 400 });
        }

        const userGroups = await Group.find({
            $or: [
                { admin_email: userEmail },
                { members: userEmail }
            ]
        });

        return new NextResponse(JSON.stringify(userGroups), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error fetching user groups:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal server error', message: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}