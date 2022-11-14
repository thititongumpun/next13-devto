import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "admin@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          "https://api.thiti.live/api/v1/Accounts/authenticate",
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const user = await res.json();
        if (res.status === 200 && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  //   signOut: "/auth/signout",
  //   error: "/auth/error",
  //   verifyRequest: "/auth/verify-request",
  //   newUser: "/auth/new-user",
  },
};

export default NextAuth(authOptions);
