// configuration for.env.local file
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "SOKecommerce";

export const APP_SLOGAN =
  process.env.NEXT_PUBLIC_APP_SLOGAN || "Spend less, enjoy more";

export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "An Amazon clone built with Next.js and MongoDB";

export const APP_COPYRIGHT =
  process.env.NEXT_PUBLIC_APP_COPYRIGHT ||
  `Copyright © 2026 ${APP_NAME}. All rights reserved`;

export const SENDER_NAME = process.env.SENDER_NAME || "support";

export const SENDER_EMAIL = process.env.SENDER_EMAIL || "onboarding@resend.dev";

export const PAGE_SIZE = Number(process.env.PAGE_SIZE || 9);

export const FREE_SHIPPING_MIN_PRICE = Number(
  process.env.FREE_SHIPPING_MIN_PRICE || 35,
);

export const USER_ROLES = ["Admin", "User"];
export const COLORS = ["Gold", "Green", "Red"];
export const THEMES = ["Light", "Dark", "System"];

export const AVAILABLE_PAYMENT_METHODS = [
  {
    name: "Paypal",
    commission: 0,
    isDefault: true,
  },
  {
    name: "Stripe",
    commission: 0,
    isDefault: false,
  },
  {
    name: "Cash on delivery",
    commission: 0,
    isDefault: false,
  },
];

export const DEFAULT_PAYMENT_METHODS =
  process.env.DEFAULT_PAYMENT_METHODS || "Paypal";

export const AVAILABLE_DELIVERY_DATES = [
  {
    name: "Tomorrow",
    daysToDeliver: 1,
    shippingPrice: 12.9,
    freeShippingMinPrice: 0,
  },
  {
    name: "Next 3 Days",
    daysToDeliver: 3,
    shippingPrice: 6.9,
    freeShippingMinPrice: 0,
  },
  {
    name: "Next 5 Days",
    daysToDeliver: 5,
    shippingPrice: 4.9,
    freeShippingMinPrice: 35,
  },
];
