import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },

      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
      
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
      
        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }
      
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin
        } as unknown as User; // Cast the return value to the User type
      }
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          isAdmin: token.isAdmin
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          isAdmin: u.isAdmin,
        };
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  }
};
