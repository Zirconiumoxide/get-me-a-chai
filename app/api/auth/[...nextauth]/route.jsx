import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

import connectDb from "@/app/db/connectDb";
import User from "@/app/models/Users";

const authOptions = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],

    callbacks: {

        async signIn({ user, account }) {

            if (account.provider === "github") {

                await connectDb();

                const currentUser = await User.findOne({
                    email: user.email
                });

                if (!currentUser) {

                    const newUser = await User.create({
                        username: user.email.split("@")[0],
                        email: user.email,
                    });

                    user.name = newUser.username;

                } else {

                    user.name = currentUser.username;

                }

                return true;
            }

            return true;
        },

        async session({ session }) {

            await connectDb();

            const dbUser = await User.findOne({
                email: session.user.email
            });

            if (dbUser) {
                session.user.name = dbUser.username;
            }

            return session;
        }
    }
});

export { authOptions as GET, authOptions as POST };