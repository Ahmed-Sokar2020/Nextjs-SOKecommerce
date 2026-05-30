import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { connectToDatabase } from "./lib/db";
import client from "./lib/db/client";
import User from "./lib/db/models/user.model";

import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: MongoDBAdapter(client),
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();
        if (credentials == null) return null;

        const user = await User.findOne({ email: credentials.email });

        if (user && user.password) {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password,
          );
          if (isMatch) {
            return {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      // 1. Executed on initial sign in
      if (user) {
        if (!user.name) {
          await connectToDatabase();
          await User.findByIdAndUpdate(user.id, {
            name: user.name || user.email!.split("@")[0],
            role: "user",
          });
        }
        token.name = user.name || user.email!.split("@")[0];
        token.email = user.email; // Save initial email into JWT token
        token.role = (user as { role: string }).role;
      }

      // 2. 🎯 FIX: Listen to update triggers and pass BOTH name and email into JWT
      if (trigger === "update" && session?.user) {
        if (session.user.name) token.name = session.user.name;
        if (session.user.email) token.email = session.user.email;
      }

      return token;
    },
    session: async ({ session, token }) => {
      // 3. 🎯 FIX: Map the parameters straight from the updated JWT token to the UI session
      if (token && session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
        session.user.name = token.name;
        session.user.email = token.email as string; // Syncs up email values dynamically
      }
      return session;
    },
  },
});
