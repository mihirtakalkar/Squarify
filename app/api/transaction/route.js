import { connectMongoDB } from "@/lib/mongodb";
import Payment from "@/models/payment";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { group_name, payer, members, amount, description } = await request.json();
  await connectMongoDB();
  await Payment.create({ group_name, payer, members, amount, description });
  return NextResponse.json({ message: "Payment Registered" }, { status: 201 });
}

export async function GET(request) {
  await connectMongoDB();
  try {
    // Create a URL object from the request URL
    const url = new URL(request.url);
    
    // Get 'groupId' from the query string
    const groupId = url.searchParams.get('groupId');

    if (!groupId) {
        return new NextResponse(JSON.stringify({ error: 'Group ID is required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Fetch all transactions where 'group_name' matches 'groupId'
    const transactions = await Payment.find({ group_name: groupId });

    if (transactions.length === 0) {
        return new NextResponse(JSON.stringify({ error: 'No transactions found for this group' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    return new NextResponse(JSON.stringify(transactions), { status: 200, headers: { 'Content-Type': 'application/json' } });
} catch (error) {
    console.error('Error fetching transactions:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal server error', message: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
}
}
