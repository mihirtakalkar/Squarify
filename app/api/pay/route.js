import { connectMongoDB } from "@/lib/mongodb";
import Group from "@/models/group";
import { NextResponse } from "next/server";
import { URL } from 'url';


export async function PUT(request) {
    await connectMongoDB();  // Ensures the DB connection is active
  
    const { id, mem_email } = await request.json();
  
  
    // try {
    //     const updatedGroup = await Group.findOneAndUpdate(
    //         { _id: id },
    //         { 
    //             $push: { members: { $each: newMembers } }, // Append new members to the array
    //             // admin_email // Optionally update admin_email
    //         },
    //         { new: true, runValidators: true }
    //     );
  
    //     if (!updatedGroup) {
    //         return NextResponse.json({ error: 'Group not found' }, { status: 404 });
    //     }
  
    //     return NextResponse.json({ message: "Group Updated", group: updatedGroup }, { status: 200 });
    // } catch (error) {
    //     console.error("Error updating group:", error);
    //     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    // }
  }