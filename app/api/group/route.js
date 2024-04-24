import { connectMongoDB } from "@/lib/mongodb";
import Group from "@/models/group";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { admin_email, name, members } = await request.json();
  await connectMongoDB();
  await Group.create({ admin_email, name, members });
  return NextResponse.json({ message: "Group Registered" }, { status: 201 });
}

