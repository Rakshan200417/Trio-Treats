import { Resend } from "resend";
import { BookingFormData } from "./booking-schema";
import { site } from "@/data/site";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const bakerEmail = process.env.BOOKING_TO_EMAIL || "kukarakshan2004@gmail.com";

export async function sendBookingEmails(data: BookingFormData) {
  if (!resend) {
    console.log("Resend API key not configured. Mocking email delivery to baker:", bakerEmail);
    return { success: true, mocked: true };
  }

  const emailSubject = `🍰 New Booking Request: ${data.variety} from ${data.name}`;

  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #3A1F17; background-color: #FFF6F1; border-radius: 12px; border: 1px solid #FFE1E6;">
      <h2 style="color: #C4666F; margin-top: 0;">New Order Booking from Trio Treats Website</h2>
      <p>A customer has submitted a cake booking:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #ffffff; border-radius: 8px; overflow: hidden;">
        <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px; font-weight: bold; width: 40%;">Customer Name:</td><td style="padding: 10px;">${data.name}</td></tr>
        <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px; font-weight: bold;">WhatsApp Number:</td><td style="padding: 10px;"><a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}">${data.whatsapp}</a></td></tr>
        ${data.callNumber ? `<tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px; font-weight: bold;">Call Number:</td><td style="padding: 10px;">${data.callNumber}</td></tr>` : ''}
        <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px; font-weight: bold;">Email:</td><td style="padding: 10px;">${data.email}</td></tr>
        <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px; font-weight: bold;">Treat Variety:</td><td style="padding: 10px; font-weight: bold; color: #C4666F;">${data.variety}</td></tr>
        <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px; font-weight: bold;">Number of Items:</td><td style="padding: 10px;">${data.itemsCount || 1}</td></tr>
        ${data.customerBudget ? `<tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px; font-weight: bold; color: #8FA657;">Customer Budget:</td><td style="padding: 10px; font-weight: bold; color: #2B1610;">${data.customerBudget}</td></tr>` : ''}
        ${data.sizeWeight ? `<tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px; font-weight: bold;">Size / Weight:</td><td style="padding: 10px;">${data.sizeWeight}</td></tr>` : ''}
        <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px; font-weight: bold;">Pickup Date:</td><td style="padding: 10px; font-weight: bold;">${data.pickupDate}</td></tr>
        ${data.preferredTime ? `<tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px; font-weight: bold;">Preferred Time:</td><td style="padding: 10px;">${data.preferredTime}</td></tr>` : ''}
        <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px; font-weight: bold;">Eggless:</td><td style="padding: 10px;">${data.eggless ? "Yes (Eggless)" : "Standard recipe"}</td></tr>
        ${data.description ? `<tr><td style="padding: 10px; font-weight: bold;">Custom Notes / Theme:</td><td style="padding: 10px;">${data.description}</td></tr>` : ''}
      </table>

      <p style="font-size: 13px; color: #7A5A50;">
        <strong>Reminders:</strong><br/>
        • Orders above Rs. 1,000 need a 50% advance after you confirm.<br/>
        • Pickup only at 2nd Cross, Kannakipuram, Valaichenai (9 AM – 9 PM).
      </p>
    </div>
  `;

  // Send to the baker (sulakshayohenran@icloud.com)
  const bakerResult = await resend.emails.send({
    from: "Trio Treats <onboarding@resend.dev>",
    to: bakerEmail,
    replyTo: data.email,
    subject: emailSubject,
    html: htmlContent,
  });

  // Send confirmation to the customer
  try {
    await resend.emails.send({
      from: "Trio Treats <onboarding@resend.dev>",
      to: data.email,
      subject: "We received your booking request! — Trio Treats",
      html: `
        <div style="font-family: sans-serif; max-width: 550px; margin: 0 auto; padding: 20px; color: #3A1F17;">
          <h2 style="color: #C4666F;">Thank you, ${data.name}!</h2>
          <p>We received your booking request for <strong>${data.variety}</strong> on <strong>${data.pickupDate}</strong>.</p>
          <p>Please note: Your order is <em>pending confirmation</em>. We will message you on WhatsApp (${data.whatsapp}) or call you shortly to confirm the design, weight, and pickup time.</p>
          <p style="font-size: 13px; color: #7A5A50;">
            • Notice: Pickup only at 2nd Cross, Kannakipuram, Valaichenai.<br/>
            • 50% advance applies for orders above Rs. 1,000 after we confirm.<br/>
            • Cancellations are allowed within 12 hours of placing the order.
          </p>
          <p>Baked with love, served with joy,<br/><strong>Trio Treats Valaichenai</strong></p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Failed sending customer confirmation email:", err);
  }

  return bakerResult;
}

