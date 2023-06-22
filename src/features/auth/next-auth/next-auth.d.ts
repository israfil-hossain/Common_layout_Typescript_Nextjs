import { User as IUser } from "features/models";
import NextAuth, { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User extends IUser {}

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user?: IUser;
    access_token?: string;
    refresh_token?: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {
    access_token: string;
    refresh_token: string;
    error?: string;
  }
}
