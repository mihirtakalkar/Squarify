// import { connectMongoDB } from "@/lib/mongodb";
// import Group from "@/models/group";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   const { admin_email, name, members } = await request.json();
//   await connectMongoDB();
//   await Group.create({ admin_email, name, members });
//   return NextResponse.json({ message: "Group Registered" }, { status: 201 });
// }

// pages/api/groups/route.js
import dbConnect from '../../../lib/mongodb'; // Your DB connect function
import Group from '../../../models/group'; // Your Group model

export default async function handler(req, res) {
    if (req.method === 'POST') {
        await dbConnect();

        const { groupName, members } = req.body;
        try {
            const group = new Group({ name: groupName, members });
            await group.save();
            res.status(201).json({ success: true, group });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
