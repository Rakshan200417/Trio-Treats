import { BookingFormData } from "./booking-schema";

export async function appendToSheet(data: BookingFormData) {
  const webhookUrl = process.env.SHEET_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        ...data,
      }),
    });
  } catch (error) {
    console.warn("Failed to append to Google Sheet webhook:", error);
  }
}

