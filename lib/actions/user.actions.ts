"use server";

import { IUserSignIn, IUserSignUp } from "@/types";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "../db";
import User, { IUser } from "../db/models/user.model";
import { formatError } from "../utils";
import { UserSignUpSchema, UserUpdateSchema } from "../validator";
// import { revalidatePath } from 'next/cache'
// import { z } from 'zod'
// import { getSetting } from './setting.actions'

import { auth, signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import { PAGE_SIZE } from "../constants";

// CREATE
export async function registerUser(userSignUp: IUserSignUp) {
  try {
    const user = await UserSignUpSchema.parseAsync({
      name: userSignUp.name,
      email: userSignUp.email,
      password: userSignUp.password,
      confirmPassword: userSignUp.confirmPassword,
    });

    await connectToDatabase();
    await User.create({
      ...user,
      password: await bcrypt.hash(user.password, 5),
    });
    return { success: true, message: "User created successfully" };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}

// DELETE
export async function deleteUser(id: string) {
  try {
    await connectToDatabase();
    const res = await User.findByIdAndDelete(id);
    if (!res) throw new Error("Use not found");
    revalidatePath("/admin/users");
    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// UPDATE
export async function updateUser(user: z.infer<typeof UserUpdateSchema>) {
  try {
    await connectToDatabase();
    const dbUser = await User.findById(user._id);
    if (!dbUser) throw new Error("User not found");
    dbUser.name = user.name;
    dbUser.email = user.email;
    dbUser.role = user.role;
    const updatedUser = await dbUser.save();
    revalidatePath("/admin/users");
    return {
      success: true,
      message: "User updated successfully",
      data: JSON.parse(JSON.stringify(updatedUser)),
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// 1. UPDATE USER NAME ACTION
export async function updateUserName(values: { name: string }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, message: "Unauthorized" };
    }

    await connectToDatabase();

    // 🎯 CRITICAL: Find and update by MongoDB _id, NOT by email!
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      { name: values.name },
      { new: true }, // Returns the newly modified document
    );

    if (!updatedUser) return { success: false, message: "User not found" };

    // Clear Next.js server cache layout trees for this route
    revalidatePath("/[locale]/(locals)/(root)/account/manage", "page");

    return {
      success: true,
      message: "Name updated successfully",
      data: { name: updatedUser.name },
    };
  } catch (error) {
    return { success: false, message: "Failed to update name", error };
  }
}

// 1. Update User Email Action
export async function updateUserEmail(user: { email: string }) {
  try {
    await connectToDatabase();
    const session = await auth();

    // 1. Double check authentication safety
    if (!session?.user?.id) throw new Error("Unauthorized");

    // 2. Check if the new email is already taken by a DIFFERENT user
    const emailExists = await User.findOne({ email: user.email });
    if (emailExists && emailExists._id.toString() !== session.user.id) {
      return { success: false, message: "Email is already in use" };
    }

    const currentUser = await User.findById(session.user.id);
    if (!currentUser) throw new Error("User not found");

    // 3. Update the property and save
    currentUser.email = user.email;
    const updatedUser = await currentUser.save();

    // 4. Return the exact same response structure as the working name form
    return {
      success: true,
      message: "Email updated successfully",
      data: JSON.parse(JSON.stringify(updatedUser)),
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// 2. Update User Password Action
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateUserPassword(values: any) {
  try {
    const session = await auth();
    if (!session?.user) return { success: false, message: "Unauthorized" };

    await connectToDatabase();
    const user = await User.findById(session.user.id);
    if (!user) return { success: false, message: "User not found" };

    // Verify current password match
    const isMatch = await bcrypt.compare(values.currentPassword, user.password);
    if (!isMatch)
      return { success: false, message: "Incorrect current password" };

    // Hash and save new password
    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return { success: true, message: "Password updated successfully" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update password",
    };
  }
}

// signIn User With Credentials
export async function signInWithCredentials(user: IUserSignIn) {
  return await signIn("credentials", { ...user, redirect: false });
}

// SignIn User With Google
export const SignInWithGoogle = async () => {
  await signIn("google");
};

// SignOut User
export const SignOut = async () => {
  const redirectTo = await signOut({ redirect: false });
  redirect(redirectTo.redirect);
};

// GET
export async function getAllUsers({
  limit,
  page,
}: {
  limit?: number;
  page: number;
}) {
  const pageLimit = limit || PAGE_SIZE;
  await connectToDatabase();

  const skipAmount = (Number(page) - 1) * pageLimit;
  const users = await User.find()
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageLimit);
  const usersCount = await User.countDocuments();
  return {
    data: JSON.parse(JSON.stringify(users)) as IUser[],
    totalPages: Math.ceil(usersCount / pageLimit),
  };
}

export async function getUserById(userId: string) {
  await connectToDatabase();
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  return JSON.parse(JSON.stringify(user)) as IUser;
}
