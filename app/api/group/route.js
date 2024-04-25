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
  // Parse the URL string to extract query parameters
  const url = new URL(request.url);
  const adminEmail = url.searchParams.get('admin_email');
  await connectMongoDB();
  
  try {
    // Find groups where the specified email is in the members array
    const userGroups = await Group.find({ admin_email: adminEmail });
    // Return the user groups as JSON response
    //console.log(userGroups);
    return NextResponse.json({ groups: userGroups }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user groups:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

