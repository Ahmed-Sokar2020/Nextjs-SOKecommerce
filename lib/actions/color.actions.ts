// lib/actions/color.actions.ts
"use server";

import { cookies } from "next/headers";

export async function setColorCookie(color: string) {
  const cookieStore = await cookies();

  cookieStore.set("accent-color", color, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
}
