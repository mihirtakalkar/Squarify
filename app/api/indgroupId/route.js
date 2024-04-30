import { connectToDatabase } from "@/lib/mongodb";
import Group from "@/models/group";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
    await connectToDatabase();

    // Extract groupId from the URL
    const url = new URL(request.url);
    const groupId = url.pathname.split('/').pop();

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return new NextResponse(JSON.stringify({ error: 'Group not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }
        return new NextResponse(JSON.stringify(group), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error fetching group:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal server error', message: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
