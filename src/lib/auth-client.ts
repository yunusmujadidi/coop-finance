import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, useSession, getSession, signOut } =
  createAuthClient();
