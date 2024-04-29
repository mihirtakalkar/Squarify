import { connectMongoDB } from "@/lib/mongodb";
import Group from "@/models/group";
import { NextResponse } from "next/server";
import { URL } from 'url';

export async function POST(request) {
  const { admin_email, name, members } = await request.json();
  await connectMongoDB();
  await Group.create({ admin_email, name, members });
  return NextResponse.json({ message: "Group Registered" }, { status: 201 });
}

export async function PUT(request) {
  await connectMongoDB();  // This ensures the DB connection is active

  const { name, admin_email, newMembers } = await request.json();
  try {
      const updatedGroup = await Group.findOneAndUpdate(
          { name },
          { $push: { members: { $each: newMembers } }, admin_email },
          { new: true, runValidators: true }
      );

      if (!updatedGroup) {
          return NextResponse.json({ error: 'Group not found' }, { status: 404 });
      }

      return NextResponse.json({ message: "Group Updated", group: updatedGroup }, { status: 200 });
  } catch (error) {
      console.error("Error updating group:", error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
