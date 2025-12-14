// app/api/joinWaitList/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { isValidEmail, isUTDEmail } from "@/lib/utils";

// GET /api/joinWaitList  -> get the number of waitlist
export async function GET() {
  const db = await getDb();
  const items = await db.collection("waitlistedUsers").find({}).toArray();
  return NextResponse.json({ item: items.length });
}

// POST /api/joinWaitList -> create a waitlist entry
export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = body?.email?.trim().toLowerCase();
  const club = body?.club?.trim();
  const interest = body?.interest?.trim();
  const additionalQuestions = body?.additionalQuestions?.trim() || "";

  // Validate required fields
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address" },
      { status: 400 }
    );
  }

  // Server-side UTD email validation
  if (!isUTDEmail(email)) {
    return NextResponse.json(
      { error: "Please use a UTD email address (@utdallas.edu)" },
      { status: 400 }
    );
  }

  if (!club) {
    return NextResponse.json(
      { error: "Club name is required" },
      { status: 400 }
    );
  }

  if (!interest) {
    return NextResponse.json(
      { error: "Please tell us why you're interested" },
      { status: 400 }
    );
  }

  const db = await getDb();

  try {
    const result = await db.collection("waitlistedUsers").insertOne({
      email: email,
      club: club,
      interest: interest,
      additionalQuestions: additionalQuestions,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        _id: result.insertedId,
        email: email,
        club: club,
        interest: interest,
        additionalQuestions: additionalQuestions,
      },
      { status: 201 }
    );
  } catch (err: any) {
    if (err.code === 11000) {
      console.error("Duplicate key error:", err.keyValue);
      return NextResponse.json(
        { error: "This email is already registered" },
        { status: 409 }
      );
    }

    console.error("Database error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
