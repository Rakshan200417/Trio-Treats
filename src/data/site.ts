// Single source of truth for business facts. The baker's email is NOT here
// on purpose: it is read on the server from BOOKING_TO_EMAIL.
export const site = {
  name: "Trio Treats",
  tagline: "Baked with love, Served with Joy",
  address: "2nd Cross, Kannakipuram, Valaichenai",
  mapUrl: "https://maps.app.goo.gl/kqCmpLgwWLjBRY1c9",
  phoneDisplay: "+94 75 892 4614",
  phoneTel: "+94758924614",
  whatsapp: "94758924614",
  timezone: "Asia/Colombo",
  hours: { open: "09:00", close: "21:00", label: "9 AM – 9 PM" },
  rules: {
    noticeDays: 2,
    advancePercent: 50,
    advanceAboveRs: 1000,
    cancelWithinHours: 12,
    pickupOnly: true,
    eggless: true,
  },
} as const;
