// app/api/joinWaitList/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

// GET /api/joinWaitList  -> get the number of waitlist
export async function GET() {
  const db = await getDb();
  const items = await db.collection("waitlistedUsers").find({}).toArray();
  return NextResponse.json({ item: items.length });
}

// POST /api/joinWaitList -> create an waitlist
export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = body?.Email?.trim().toLowerCase();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const db = await getDb();

  try {
    const result = await db.collection("waitlistedUsers").insertOne({
      Email: email,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { _id: result.insertedId, Email: email },
      { status: 201 }
    );
  } catch (err: any) {
    if (err.code === 11000) {
      return NextResponse.json(
        { error: "Email already on waitlist" },
        { status: 409 }
      );
    }

    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
