import { auth } from "@/auth";
import UserButtonClient from "./user-button-client";

export default async function UserButton() {
  const session = await auth();
  return <UserButtonClient session={session} />;
}
