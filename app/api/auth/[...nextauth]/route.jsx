import nextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
// import EmailProvider from "next-auth/providers/email";
import mongoose from "@/lib/mongoose";

const authOptions = nextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    // }),
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if(account.provider=="github"){
        const client = await mongoose.connect();
      }
    }
  }
})
export {authOptions as GET, authOptions as POST}