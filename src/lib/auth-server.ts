import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const requireAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized - No session found");
  }

  if (session.user.role === "PENDING") {
    throw new Error("Account pending approval");
  }

  return session;
};
