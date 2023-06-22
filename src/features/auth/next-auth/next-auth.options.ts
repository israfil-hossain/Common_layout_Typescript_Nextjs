import { AxiosResponse } from "axios";
import { Api, ApiClient } from "features/api";
import { User } from "features/models";
import { pick } from "lodash";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { RefreshTokenError } from "./next-auth.constants";

export type LoginResponse = {
  success: boolean;
  user: User;
  access_token: string;
  refresh_token: string;
};

function isTokenExpired(token: string) {
  const expiry = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  ).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
}

async function refreshToken(jwt: JWT): Promise<JWT> {
  try {
    const res = await ApiClient.request({
      url: Api.RefreshToken,
      method: "POST",
      data: { refresh_token: jwt.refresh_token },
    });
    const data = res.data as LoginResponse;

    return {
      ...data.user,
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    };
  } catch (e) {
    return {
      ...jwt,
      error: RefreshTokenError,
    };
  }
}

export const AuthOptions: NextAuthOptions = {
  // Auth providers
  providers: [
    Credentials({
      credentials: {
        // requried for normal login
        username: { label: "Username/Email", type: "text" },
        password: { label: "Password", type: "text" },
      },

      // this function is called at server side only
      async authorize(credentials) {
        try {
          let res: AxiosResponse;

          res = await ApiClient.request({
            url: Api.Login,
            method: "POST",
            // send only login form
            data: {
              username: credentials?.username,
              password: credentials?.password,
            },
          });

          const data = res.data as LoginResponse;

          if (data.user) {
            return {
              id: data.user?.id || "",
              ...data.user,
              access_token: data.access_token,
              refresh_token: data.refresh_token,
            };
          }
        } catch (e) {
          console.log("from authorize", e);
        }
        return null;
      },
    }),
  ],

  // Custom auth pages
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
  },

  // Enable JWT session
  session: {
    strategy: "jwt",
  },

  // Provide user data in the session
  callbacks: {
    async jwt({ token, user }) {
      // initial sign in
      // add user data in the token
      if (user) {
        return {
          ...token,
          ...user,
        };
      }

      // check if access token is expired, if so
      // try refreshing the token
      if (isTokenExpired(token.access_token)) {
        return await refreshToken(token);
      }

      return token;
    },

    async session({ session, token }) {
      // if session and token data are available
      // add user data from token to session.user
      // object. TODO: this is a bit hardcoding
      if (token && session.user) {
        session.user = pick(token, [
          "id",
          "email",
          "name",
          "isActive",
          "avatar",
        ]) as User;
        session.access_token = token.access_token;
        session.refresh_token = token.refresh_token;
        session.error = token.error;
      }

      return session;
    },
  },
};
