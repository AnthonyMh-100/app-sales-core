import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { comparePassword } from "./utils/utils";
import { prisma } from "./lib/prisma";

interface Login {
  email?: string;
  password?: string;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.username = token.username as string;
      return session;
    },
  },
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        try {
          const { email, password }: Login = credentials;
          const company = await prisma.company.findFirst({
            where: { email },
          });

          if (!company) {
            throw new Error("Empresa no encontrada");
          }

          const isVerified = await comparePassword({
            password: password || "",
            hashedPassword: company.password || "",
          });

          if (!isVerified) {
            throw new Error("Contraseña incorrecta");
          }

          const { id, name, username, email: emailCompany } = company;

          return {
            id,
            name,
            username,
            email: emailCompany,
          };
        } catch (error) {
          console.error("Error en el login:", error);
          throw new Error("Error en el login");
        }
      },
    }),
  ],
});
