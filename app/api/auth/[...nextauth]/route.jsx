import nextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
// import EmailProvider from "next-auth/providers/email";
// import mongoose from "mongoose";
import connectDb from "@/app/db/connectDb";
import User from "@/app/models/Users";


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
        await connectDb();
        const currentUser = await User.findOne({ email: email });
        if(!currentUser){
          const newUser = await User.create({
            username: user.email.split('@')[0],
            email: user.email,
          })
          user.name = newUser.username;
        }
        return true;
      }
    },  
    async session({ session, token, user }) {
      const dbUser = await User.findOne({ email: session.user.email });
      console.log(dbUser);
      session.user.name = dbUser.username;
      return session;
    }
  }
})
export {authOptions as GET, authOptions as POST}