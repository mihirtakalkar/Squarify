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

export async function GET(request) {
  await connectMongoDB();

  try {
    const url = new URL(request.url);
    const adminEmail = url.searchParams.get('admin_email');

    if (!adminEmail) {
      return NextResponse.json({ error: 'Admin email is required' }, { status: 400 });
    }

    const userGroups = await Group.find({ admin_email: adminEmail });
    return NextResponse.json({ groups: userGroups }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user groups:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request) {
  const { name, admin_email, newMembers } = await request.json();

  try {
      const updatedGroup = await Group.findOneAndUpdate(
          { name }, 
          { 
              $push: { members: { newMembers } }, // Append newMembers to the members array
          },
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
