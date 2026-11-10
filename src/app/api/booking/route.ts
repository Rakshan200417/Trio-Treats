import { NextRequest, NextResponse } from "next/server";
import { bookingSchema } from "@/lib/booking-schema";
import { sendBookingEmails } from "@/lib/email";
import { appendToSheet } from "@/lib/sheet";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot spam check
    if (body.honeypot && body.honeypot.length > 0) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    const validationResult = bookingSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid form input", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Send emails
    const emailRes = await sendBookingEmails(data);

    // Backup to Google Sheet if configured
    await appendToSheet(data);

    return NextResponse.json({
      success: true,
      message: "Booking request received! We will confirm on WhatsApp or call shortly.",
      data: {
        name: data.name,
        variety: data.variety,
        pickupDate: data.pickupDate,
      },
    });
  } catch (error: any) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      {
        error: "Failed to process booking. You can also message us directly on WhatsApp.",
        fallbackToWhatsApp: true,
      },
      { status: 500 }
    );
  }
}

