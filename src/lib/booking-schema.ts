import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  whatsapp: z
    .string()
    .min(9, "Please enter a valid phone or WhatsApp number")
    .regex(/^[0-9+\s()-]+$/, "Invalid phone format"),
  callNumber: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  variety: z.string().min(1, "Please select a treat variety"),
  itemsCount: z.number().min(1, "Must be at least 1").optional(),
  customerBudget: z.string().optional(),
  sizeWeight: z.string().optional(),
  pickupDate: z.string().min(1, "Please select a pickup date"),
  preferredTime: z.string().optional(),
  eggless: z.boolean().optional(),
  description: z.string().optional(),
  honeypot: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
