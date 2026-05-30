/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/db";
import User from "@/lib/db/models/user.model";
import { UserAddressSchema } from "@/lib/validator";
import { revalidatePath } from "next/cache";

export async function addNewAddressAction(rawValues: any) {
  try {
    // 1. Authenticate the session
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, message: "Unauthorized. Please sign in again." };
    }

    // 2. Validate input layout parameters with Zod
    const validatedData = UserAddressSchema.parse(rawValues);

    // 3. Connect to MongoDB ground truth database
    await connectToDatabase();

    // 4. Handle default address logic
    // If the user checked "Set as default", remove default status from all their existing addresses first
    if (validatedData.isDefault) {
      await User.updateOne(
        { _id: session.user.id, "addresses.isDefault": true },
        { $set: { "addresses.$[].isDefault": false } },
      );
    }

    // 5. Push the new address to the subdocument collection array
    const result = await User.findByIdAndUpdate(
      session.user.id,
      {
        $push: { addresses: validatedData },
      },
      { new: true, runValidators: true },
    );

    if (!result) {
      return { success: false, message: "User profile record not found." };
    }

    // 6. Purge layout cache loops for addresses routes instantly
    revalidatePath("/account/addresses");

    return { success: true, message: "Address saved successfully!" };
  } catch (error: any) {
    console.error("Address database save error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
}
