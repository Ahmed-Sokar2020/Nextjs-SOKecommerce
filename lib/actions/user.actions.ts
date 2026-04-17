"use server";

// import bcrypt from 'bcryptjs'
// import { IUserName, IUserSignIn, IUserSignUp } from '@/types'
// import { UserSignUpSchema, UserUpdateSchema } from '../validator'
// import { connectToDatabase } from '../db'
// import User, { IUser } from '../db/models/user.model'
// import { formatError } from '../utils'
// import { revalidatePath } from 'next/cache'
// import { z } from 'zod'
// import { getSetting } from './setting.actions'

import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { IUserSignIn } from "@/types";

export async function signInWithCredentials(user: IUserSignIn) {
  return await signIn("credentials", { ...user, redirect: false });
}
// export const SignInWithGoogle = async () => {
//   await signIn('google')
// }
export const SignOut = async () => {
  const redirectTo = await signOut({ redirect: false });
  redirect(redirectTo.redirect);
};
