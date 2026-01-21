// app/api/joinWaitList/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase, type WaitlistEntry, type UserType } from "@/lib/supabase";
import { validateEmailForUserType } from "@/lib/utils";

// GET /api/joinWaitList  -> get the number of waitlist
export async function GET() {
  try {
    const { count, error } = await supabase
      .from("waitlist_entries")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to fetch count" }, { status: 500 });
    }

    return NextResponse.json({ item: count || 0 });
  } catch (err) {
    console.error("GET Database error:", err);
    // Log environment variable status safely
    console.log("Env check:", {
      url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    });
    return NextResponse.json({ error: "Internal server error", details: String(err) }, { status: 500 });
  }
}

// POST /api/joinWaitList -> create a waitlist entry
export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = body?.email?.trim().toLowerCase();
  const userType = body?.userType as UserType;
  const club = body?.club?.trim();
  const ventureName = body?.ventureName?.trim();
  const ventureCategories = body?.ventureCategories || [];
  const interest = body?.interest?.trim();
  const additionalQuestions = body?.additionalQuestions?.trim() || "";

  // Validate required fields
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  if (!userType) {
    return NextResponse.json({ error: "User type is required" }, { status: 400 });
  }

  // Validate email based on user type
  const emailValidation = validateEmailForUserType(email, userType);
  if (!emailValidation.isValid) {
    return NextResponse.json(
      { error: emailValidation.error || "Invalid email" },
      { status: 400 }
    );
  }

  // Validate user type specific fields
  if (userType === "club_owner" && !club) {
    return NextResponse.json(
      { error: "Club name is required for club owners" },
      { status: 400 }
    );
  }

  if (userType === "venture_owner") {
    if (!ventureName) {
      return NextResponse.json(
        { error: "Venture name is required for venture owners" },
        { status: 400 }
      );
    }
    if (!Array.isArray(ventureCategories) || ventureCategories.length === 0) {
      return NextResponse.json(
        { error: "At least one venture category is required" },
        { status: 400 }
      );
    }
  }

  if (!interest) {
    return NextResponse.json(
      { error: "Please tell us why you're interested" },
      { status: 400 }
    );
  }

  try {
    // Check for duplicate email
    const { data: existing } = await supabase
      .from("waitlist_entries")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "This email is already registered" },
        { status: 409 }
      );
    }

    // Insert new entry
    const entry: Omit<WaitlistEntry, "id" | "created_at"> = {
      email,
      user_type: userType,
      interest,
      additional_questions: additionalQuestions || undefined,
      ...(userType === "club_owner" && club ? { club } : {}),
      ...(userType === "venture_owner" && ventureName
        ? {
          venture_name: ventureName,
          venture_categories: ventureCategories,
        }
        : {}),
    };

    const { data, error } = await supabase
      .from("waitlist_entries")
      .insert(entry)
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      // Check for unique constraint violation
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email is already registered" },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }

    // Send email notification (Fail-safe: doesn't block response)
    try {
      if (process.env.RESEND_API_KEY) {
        const { Resend } = await import("resend");
        const React = await import("react");

        // Dynamic import based on component availability
        const { MivroWelcomeEmail } = await import("@/components/emails/mivro-welcome-email");

        const resend = new Resend(process.env.RESEND_API_KEY);

        // Map database user types to email content types if necessary
        // In our case they match keys in contentMap (regular, venture_owner, club_owner, journalist)

        await resend.emails.send({
          from: "Mivro Waitlist <hello@mivro.org>", // Updated to custom domain since verified
          to: email, // Send to the actual user!
          subject: "Welcome to Mivro!",
          react: React.createElement(MivroWelcomeEmail, {
            userType: userType as UserType
          }),
        });
      }
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error("Database error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
