import nextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
// import EmailProvider from "next-auth/providers/email";
import mongoose from "mongoose";

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
        const client = await mongoose.connect("mongodb://localhost:27017/chai");
        const currentUser = User.findOne({ email: email });
        if(!currentUser){
          const newUser = new User({
            username: user.email.split('@')[0],
            email: user.email,
          })
          await newUser.save();
        }
        return true;
      }
    },  
    async session({ session, token, user }) {
      const dbUser = await User.find({ email: session.user.email });
      session.user.username = dbUser.username;
      return session;
    }
  }
})
export {authOptions as GET, authOptions as POST}