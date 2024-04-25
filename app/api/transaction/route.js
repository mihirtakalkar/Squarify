import { connectMongoDB } from "@/lib/mongodb";
import Payment from "@/models/payment";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { group_name, payer, members, amount, description } = await request.json();
  await connectMongoDB();
  await Payment.create({ group_name, payer, members, amount, description });
  return NextResponse.json({ message: "Payment Registered" }, { status: 201 });
}
